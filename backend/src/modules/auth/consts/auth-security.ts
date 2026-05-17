export const RESET_TOKEN_LENGTH = 64;
export const RESET_TOKEN_EXPIRY_MINUTES = 30;

export const AUTH_RATE_LIMITS = {
  forgotPassword: {
    limit: 3,
    ttl: 10 * 60 * 1000,
  },
  login: {
    limit: 5,
    ttl: 60 * 1000,
  },
  register: {
    limit: 3,
    ttl: 10 * 60 * 1000,
  },
  resetPassword: {
    limit: 5,
    ttl: 10 * 60 * 1000,
  },
} as const;
