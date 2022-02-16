import Location from './Location';

export default interface Address {
  [key: string]: string | object;
  street: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  location?: Location;
  formattedAddress?: string;
}
