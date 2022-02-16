const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const API_KEY = process.env.GEOCODING_API_KEY;

import Address from '../interfaces/Address';
import AddressesDistance from '../interfaces/AddressesDistance';
import Location from '../interfaces/Location';

import axios from 'axios';
import AddressNotFoundError from '../errors/AddressNotFound';

async function getDistances(adresses: Address[]) {
  let result = adresses.map(
    async (address) => await getAddressCoordinates(address)
  );

  const addressesWithCoordinates = await Promise.all(result);

  const allDistances = getAllDistances(addressesWithCoordinates);

  console.log(allDistances);
}

async function getAddressCoordinates(address: Address) {
  const querryString = buildQuery(address);

  const response = await axios.get(API_URL + querryString + '&key=' + API_KEY);

  if (!response.data.results[0]) {
    throw new AddressNotFoundError();
  }

  const addressWithCoordinates = {
    ...address,
    formattedAddress: response.data.results[0].formatted_address,
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

function getAllDistances(addresses: Address[]) {
  const allDistances: AddressesDistance[] = [];

  for (let i = 0; i < addresses.length; i++) {
    for (let j = i + 1; j < addresses.length; j++) {
      allDistances.push({
        address1: addresses[i].formattedAddress,
        address2: addresses[j].formattedAddress,
        distance: calcDistance(addresses[i].location, addresses[j].location),
      });
    }
  }
  return allDistances;
}

function calcDistance(address1: Location, address2: Location): number {
  const dlat = address1.lat - address2.lat;
  const dlng = address1.lng - address2.lng;
  const distanceInDegrees = Math.sqrt(Math.pow(dlat, 2) + Math.pow(dlng, 2));
  const distanceInKm = distanceInDegrees * 111.12;

  return distanceInKm;
}

export { getDistances };
