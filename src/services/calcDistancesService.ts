import Address from '../interfaces/Address';
import AddressDistance from '../interfaces/AddressDistance';
import Location from '../interfaces/Location';
import * as geocodingService from './geocodingService';

async function getDistances(addresses: Address[]) {
  let response = addresses.map(
    async (address) => await geocodingService.getAddressCoordinates(address)
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
