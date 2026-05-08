export const API_BASE_URL = import.meta.env.VITE_BASE_URL ?? "";

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export const getApiAssetUrl = (assetUrl?: string) => {
  if (!assetUrl) {
    return undefined;
  }

  if (/^https?:\/\//.test(assetUrl)) {
    return assetUrl;
  }

  return assetUrl.startsWith("/") ? `${API_ORIGIN}${assetUrl}` : assetUrl;
};
