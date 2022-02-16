import joi from 'joi';

const address = joi.object().keys({
  street: joi.string().required(),
  number: joi.number(),
  neighborhood: joi.string(),
  city: joi.string(),
  state: joi.string().min(2).max(2),
  zipCode: joi.number().integer(),
});

export default joi.array().min(2).items(address);
