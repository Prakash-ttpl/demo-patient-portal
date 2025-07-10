export const PAGE_STATE = {
  PRE_LOADING: "preloading",
  LOADING: "loading",
  PAGE_READY: "ready",
};

export const MAIN_PATHS = {
  DASHBOARD: "/dashboard/*",
  SETTINGS: "/settings",
  ROOT: "/",
  REDIRECT_TO_DASHBOARD: "/dashboard",
};

export const PATIENTS_ROUTES = {
  ADD: "/add",
  DASHBOARD: "/dashboard/:patientId",
  ROOT: "/:patientId/*",
};

export const SETTINGS_PATHS = {};

export const SOZEN_COLORS = {
  PRIMARY: "#E8E8E8",
  SECONDARY: "#ccecff80",
  DARK_GRAY: "#4c4c4c99",
  GRAY: "#E7E7E7",
};

export const SCREEN_SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
};

export const VALIDATION_REGEX = {
  NAME_REGEX: /^[a-zA-Z]*$/,
  AADHAR_REGEX: /^\d{4}-\d{4}-\d{4}$/,
  MOBILE_NUM_REGEX: /^[6789]\d{9}$/,
  ZIP_CODE_REGEX: /^\d{6}$/,
  PASSWORD_REGEX:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  AGE_REGEX: /^(0?[1-9]|[1-9][0-9]|[1][0-2][0-9]|130)$/,
  NUMBER_REGEX: /^[0-9]+$/,
  NUMBER_WITH_DECIMAL_REGEX: /^[0-9]+(?:\.[0-9]+)?$/,
  WEBSITE_REGEX:
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+([a-zA-Z]){2,}(\/[a-zA-Z0-9#]+\/?)*$/,
  GST_NUMBER_REGEX:
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
  CITY_REGEX: /^[a-zA-Z\s]*$/,
};

export const NO_LOADER_FOR_API_ENDPOINT = [];
