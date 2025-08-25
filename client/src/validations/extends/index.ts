import Joi, { type Root, type StringSchema } from "joi"
import { minCharacters, type IMinCharacters } from "./minCharacters"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExtendedStringSchema extends StringSchema, IMinCharacters {}

export interface ExtendedRoot extends Omit<Root, "string"> {
  string(): ExtendedStringSchema
}

export default Joi.extend(minCharacters) as ExtendedRoot
