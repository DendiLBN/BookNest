import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { profileFormSchema } from "@/features/profile-page/consts/profile-form-schema";
import {
  getProfileFormErrors,
  type TProfileFormErrors,
} from "@/features/profile-page/utils/get-profile-form-errors";
import type { TUser } from "@/features/users/types";
import { useUpdateProfileMutation } from "@/store/api/users";
import { setIsLoggedIn } from "@/store/reducers/auth";

type TProfileFormValues = Pick<TUser, "email" | "firstName" | "lastName">;

type TUseProfileFormParams = {
  user: TUser | null;
};

const emptyProfileFormValues: TProfileFormValues = {
  email: "",
  firstName: "",
  lastName: "",
};

const getProfileFormValues = (user: TUser | null): TProfileFormValues =>
  user
    ? {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    : emptyProfileFormValues;

export const useProfileForm = ({ user }: TUseProfileFormParams) => {
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [values, setValues] = useState<TProfileFormValues>(() => getProfileFormValues(user));
  const [errors, setErrors] = useState<TProfileFormErrors>({});

  useEffect(() => {
    setValues(getProfileFormValues(user));
  }, [user]);

  const handleFieldChange = (field: keyof TProfileFormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      return;
    }

    try {
      await profileFormSchema.validate(values, { abortEarly: false });
    } catch (error) {
      setErrors(getProfileFormErrors(error));
      return;
    }

    try {
      const updatedUser = await updateProfile(values).unwrap();

      dispatch(setIsLoggedIn({ isLoggedIn: true, user: updatedUser }));
      openNotification("topRight", "success", "Profile updated.", false);
    } catch {
      openNotification("topRight", "error", "Could not update profile.", false);
    }
  };

  return {
    errors,
    isUpdatingProfile,
    values,
    handleFieldChange,
    handleSubmit,
  };
};
