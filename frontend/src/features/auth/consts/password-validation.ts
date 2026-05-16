import type { Rule } from "antd/es/form";

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 32;

export const createPasswordRules = (requiredMessage: string): Rule[] => [
  {
    required: true,
    message: requiredMessage,
    min: MIN_PASSWORD_LENGTH,
    max: MAX_PASSWORD_LENGTH,
  },
];

export const createConfirmPasswordRules = ({
  fieldName,
  requiredMessage,
  mismatchMessage,
}: {
  fieldName: string;
  requiredMessage: string;
  mismatchMessage: string;
}): Rule[] => [
  {
    required: true,
    message: requiredMessage,
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue(fieldName) === value) {
        return Promise.resolve();
      }

      return Promise.reject(new Error(mismatchMessage));
    },
  }),
];
