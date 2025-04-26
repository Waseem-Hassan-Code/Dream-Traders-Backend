import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
  isActive: Joi.boolean().default(false),
});

export default userSchema;
