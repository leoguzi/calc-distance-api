import joi from 'joi';

const address = joi.object().keys({
  street: joi.string().required(),
  number: joi.number().required(),
  neighborhood: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().min(2).max(2).required(),
  zipCode: joi.number().integer().required(),
});

export default joi.array().min(2).items(address);
