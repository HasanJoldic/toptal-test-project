import Joi from "joi";

export const uidv4 = Joi.string().guid().label("uidv4")
  .example("0102cad9-f620-4fd0-bb05-0e1a91784213");
export const iso8601Datestring = Joi.date().iso().label("iso8601Datestring")
  .description("iso8601Datestring (type)").example("2015-11-29T08:00:00.000Z");
export const role = Joi.string().label("role")
  .description("one of 'user', 'manager', or 'admin' roles").valid("user", "manager", "admin");

export const username = Joi.string().lowercase().regex(/^[0-9a-z_.\-\+@]+$/).trim()
  .options({convert: false}).example("testuser1");
export const password = Joi.string().trim().min(6).options({convert: false})
  .example("testpassword1");