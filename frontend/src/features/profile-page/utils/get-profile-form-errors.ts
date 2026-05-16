import { ValidationError } from "yup";

import type { TUpdateProfilePayload } from "@/features/users/types";

export type TProfileFormErrors = Partial<Record<keyof TUpdateProfilePayload, string>>;

export const getProfileFormErrors = (error: unknown): TProfileFormErrors => {
  if (!(error instanceof ValidationError)) {
    return {};
  }

  return error.inner.reduce<TProfileFormErrors>((errors, currentError) => {
    const fieldName = currentError.path as keyof TUpdateProfilePayload | undefined;

    if (!fieldName || errors[fieldName]) {
      return errors;
    }

    return {
      ...errors,
      [fieldName]: currentError.message,
    };
  }, {});
};
