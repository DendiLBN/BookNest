import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

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

  useEffect(() => {
    setValues(getProfileFormValues(user));
  }, [user]);

  const handleFieldChange = (field: keyof TProfileFormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
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
    isUpdatingProfile,
    values,
    handleFieldChange,
    handleSubmit,
  };
};
