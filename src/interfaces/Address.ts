export default interface Address {
  [key: string]: string;
  street: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}
