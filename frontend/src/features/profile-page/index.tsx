import ChangePasswordForm from "@/features/login-page/components/forms/change-password-form";
import { DangerZone } from "@/features/profile-page/components/danger-zone";
import { ProfileDetailsForm } from "@/features/profile-page/components/profile-details-form";
import { ProfileHeader } from "@/features/profile-page/components/profile-header";
import { ProfileStats } from "@/features/profile-page/components/profile-stats";

import { useProfileDashboard } from "@/features/profile-page/hooks/useProfileDashboard";

export const ProfileView = () => {
  const profileDashboard = useProfileDashboard();

  if (!profileDashboard) {
    return null;
  }

  const { dangerZoneProps, detailsFormProps, headerProps, statsProps } = profileDashboard;

  return (
    <div className="flex flex-col gap-l">
      <ProfileHeader {...headerProps} />
      <ProfileStats {...statsProps} />

      <section className="grid gap-s lg:grid-cols-2">
        <ProfileDetailsForm {...detailsFormProps} />
        <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
          <ChangePasswordForm embedded />
        </article>
      </section>

      <DangerZone {...dangerZoneProps} />
    </div>
  );
};
