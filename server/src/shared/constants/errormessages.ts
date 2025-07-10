import { INVALID } from "zod";

export enum ErrorMessages {
  ALL_FIELDS_REQUIRED = 'All fields are required',
  EMAIL_IN_USE = 'Email already in use',
  VERIFY_SUCCESS = 'Email verified succesfully',
  INVALID_TOKEN = "Invalid or expired token",
  USER_NOT_FOUND = 'This user does not exist '
}
