import { Button } from "antd";

type TDangerZoneProps = {
  handleDeleteAccount: () => void;
  isDeletingAccount: boolean;
};

export const DangerZone = ({ handleDeleteAccount, isDeletingAccount }: TDangerZoneProps) => (
  <section className="rounded-l border border-app-danger/30 bg-app-surface p-s shadow-app-s">
    <h2 className="mt-0 mb-xs text-lg font-bold text-app-text">Danger zone</h2>
    <p className="mt-0 text-app-text-muted">
      Permanently remove your account and saved profile data.
    </p>
    <Button danger loading={isDeletingAccount} onClick={handleDeleteAccount}>
      Delete account
    </Button>
  </section>
);
