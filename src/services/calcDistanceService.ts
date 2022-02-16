const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const API_KEY = process.env.GEOCODING_API_KEY;

import Address from '../interfaces/Address';
import AddressDistance from '../interfaces/AddressDistance';
import Location from '../interfaces/Location';

import axios from 'axios';
import AddressNotFoundError from '../errors/AddressNotFound';

async function getDistances(adresses: Address[]) {
  let response = adresses.map(
    async (address) => await getAddressCoordinates(address)
  );

  const addressesWithCoordinates = await Promise.all(response);

  const allDistances = getAllDistances(addressesWithCoordinates);

  const interestDistances = findClosestAndFarthestAddress(allDistances);

  const finalResult = {
    closestAddresses: interestDistances.closest,
    farthestAddresses: interestDistances.farthest,
    otherDistances: allDistances.filter(
      (distance) =>
        distance !== interestDistances.closest &&
        distance !== interestDistances.farthest
    ),
  };

  return finalResult;
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
  const allDistances: AddressDistance[] = [];

  for (let i = 0; i < addresses.length; i++) {
    for (let j = i + 1; j < addresses.length; j++) {
      allDistances.push({
        address1: addresses[i].formattedAddress,
        address2: addresses[j].formattedAddress,
        distance: Number(
          calcDistance(addresses[i].location, addresses[j].location).toFixed(2)
        ),
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

function findClosestAndFarthestAddress(allDistances: AddressDistance[]): {
  closest: AddressDistance;
  farthest: AddressDistance;
} {
  let closest = allDistances[0];
  let farthest = allDistances[0];
  for (let i = 1; i < allDistances.length; i++) {
    if (allDistances[i].distance < closest.distance) {
      closest = allDistances[i];
    }
    if (allDistances[i].distance > farthest.distance) {
      farthest = allDistances[i];
    }
  }
  return {
    closest,
    farthest,
  };
}

export { getDistances };
