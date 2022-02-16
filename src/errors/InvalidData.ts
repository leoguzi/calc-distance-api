export default class InvalidDataError extends Error {
  details: string[];

  constructor(name: string) {
    super(`Invalid ${name}`);
    this.name = 'InvalidDataError';
  }
}
