import Joi from "joi";

const userSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export default userSchema;
