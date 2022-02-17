const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const API_KEY = process.env.GEOCODING_API_KEY;

import axios from 'axios';
import AddressNotFoundError from '../errors/AddressNotFound';

import Address from '../interfaces/Address';

async function getAddressCoordinates(address: Address) {
  const querryString = buildQuery(address);

  const response = await axios.get(`${API_URL}${querryString}&key=${API_KEY}`);

  const foundedAddress = response.data.results[0];

  if (!foundedAddress) {
    throw new AddressNotFoundError();
  }

  return {
    ...address,
    formattedAddress: foundedAddress.formatted_address,
    location: foundedAddress.geometry.location,
  };
}

function buildQuery(address: Address): string {
  let addressString: string = '';

  for (let property in address) {
    addressString += `,+${address[property]}`;
  }

  const cleanString = addressString
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(',+', '')
    .replace(/ /g, '+');

  return cleanString;
}

export { getAddressCoordinates };
