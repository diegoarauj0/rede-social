import Joi, { type Root, type StringSchema } from "joi"
import { minCharacters, type IMinCharacters } from "./minCharacters"

export interface IExtendedStringSchema extends StringSchema, IMinCharacters {}

export interface IExtendedRoot extends Omit<Root, "string"> {
  string(): IExtendedStringSchema
}

export default Joi.extend(minCharacters) as IExtendedRoot
