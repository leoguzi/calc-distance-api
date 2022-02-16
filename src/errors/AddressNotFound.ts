export default class AdressNotFoundError extends Error {
  constructor() {
    super('One of the addresses was not found.');
    this.name = 'AddressNotFound';
  }
}
