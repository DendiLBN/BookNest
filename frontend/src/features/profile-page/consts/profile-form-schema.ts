import { object, type ObjectSchema, string } from "yup";

import { profileFormLimits } from "@/features/profile-page/consts/profile-form";
import type { TUpdateProfilePayload } from "@/features/users/types";

export const profileFormSchema: ObjectSchema<TUpdateProfilePayload> = object({
  email: string().email("Enter a valid email address.").required("Email is required."),
  firstName: string()
    .trim()
    .required("First name is required.")
    .max(
      profileFormLimits.nameMaxLength,
      `First name must be ${profileFormLimits.nameMaxLength} characters or fewer.`,
    ),
  lastName: string()
    .trim()
    .required("Last name is required.")
    .max(
      profileFormLimits.nameMaxLength,
      `Last name must be ${profileFormLimits.nameMaxLength} characters or fewer.`,
    ),
});
