import { Button, Input } from "antd";

import { profileFormLimits } from "@/features/profile-page/consts/profile-form";
import type { TProfileFormErrors } from "@/features/profile-page/utils/get-profile-form-errors";
import type { TUpdateProfilePayload } from "@/features/users/types";

type TProfileDetailsFormProps = {
  errors: TProfileFormErrors;
  isUpdatingProfile: boolean;
  values: TUpdateProfilePayload;
  handleFieldChange: (field: keyof TUpdateProfilePayload, value: string) => void;
  handleSubmit: () => void;
};

export const ProfileDetailsForm = ({
  errors,
  handleFieldChange,
  handleSubmit,
  isUpdatingProfile,
  values,
}: TProfileDetailsFormProps) => (
  <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
    <h2 className="mt-0 mb-xs text-lg font-bold text-app-text">Account details</h2>
    <div className="grid gap-xs sm:grid-cols-2">
      <label className="flex flex-col gap-1 text-sm font-semibold text-app-text">
        First name
        <Input
          maxLength={profileFormLimits.nameMaxLength}
          onChange={(event) => handleFieldChange("firstName", event.target.value)}
          status={errors.firstName ? "error" : undefined}
          value={values.firstName}
        />
        {errors.firstName && <span className="text-xs text-app-danger">{errors.firstName}</span>}
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold text-app-text">
        Last name
        <Input
          maxLength={profileFormLimits.nameMaxLength}
          onChange={(event) => handleFieldChange("lastName", event.target.value)}
          status={errors.lastName ? "error" : undefined}
          value={values.lastName}
        />
        {errors.lastName && <span className="text-xs text-app-danger">{errors.lastName}</span>}
      </label>
    </div>
    <label className="mt-xs flex flex-col gap-1 text-sm font-semibold text-app-text">
      Email
      <Input
        onChange={(event) => handleFieldChange("email", event.target.value)}
        status={errors.email ? "error" : undefined}
        type="email"
        value={values.email}
      />
      {errors.email && <span className="text-xs text-app-danger">{errors.email}</span>}
    </label>
    <Button className="mt-s" loading={isUpdatingProfile} onClick={handleSubmit} type="primary">
      Save profile
    </Button>
  </article>
);
