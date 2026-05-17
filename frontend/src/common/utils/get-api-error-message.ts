type TApiError = {
  data?: {
    message?: string | string[];
  };
};

export const getApiErrorMessage = (error: unknown, fallbackMessage: string) => {
  const message = (error as TApiError)?.data?.message;

  if (Array.isArray(message)) {
    return message[0] ?? fallbackMessage;
  }

  return message ?? fallbackMessage;
};
