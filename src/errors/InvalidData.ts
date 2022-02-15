export default class InvalidDataError extends Error {
  details: string[];

  constructor(name: string) {
    super(`${name} inválido`);
    this.name = 'InvalidDataError';
  }
}
