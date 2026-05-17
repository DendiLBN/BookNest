type TDashboardFeedbackProps = {
  isError: boolean;
  isLoading: boolean;
};

export const DashboardFeedback = ({ isError, isLoading }: TDashboardFeedbackProps) => {
  if (isLoading) {
    return (
      <section className="rounded-l border border-app-border bg-app-surface p-s text-app-text-muted shadow-app-s">
        Loading dashboard data...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-l border border-app-border bg-app-surface p-s text-app-danger shadow-app-s">
        Dashboard data could not be loaded. Try again in a moment.
      </section>
    );
  }

  return null;
};
