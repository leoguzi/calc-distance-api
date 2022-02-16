const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const API_KEY = process.env.GEOCODING_API_KEY;

import Address from '../interfaces/Address';
import axios from 'axios';
import AddressNotFoundError from '../errors/AddressNotFound';

async function getAddresses(adresses: Address[]) {
  let result = adresses.map(
    async (address) => await getAddressCoordinates(address)
  );

  const addressesWithCoordinates = await Promise.all(result);
  console.log(addressesWithCoordinates);
}

async function getAddressCoordinates(address: Address) {
  const querryString = buildQuery(address);

  const response = await axios.get(API_URL + querryString + '&key=' + API_KEY);

  if (!response.data.results[0]) {
    throw new AddressNotFoundError();
  }

  const addressWithCoordinates = {
    ...address,
    location: response.data.results[0]?.geometry.location,
  };

  return addressWithCoordinates;
}

function buildQuery(address: Address): string {
  let addressString: string = '';

  for (let property in address) {
    addressString += `,+${address[property]}`;
  }

  addressString = addressString.replace(',+', '');
  addressString = addressString.replace(/ /g, '+');

  addressString = addressString
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return addressString;
}

export { getAddresses };
