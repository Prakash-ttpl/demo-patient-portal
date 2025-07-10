import axios from "axios";
axios.defaults.withCredentials = false;

const BASE_URL = import.meta.env.VITE_API_URL;

class DataService {
  static token = null;

  constructor() {
    this._baseUrl = BASE_URL;
  }

  static getToken = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      DataService.token = storedToken;
      return true;
    }
  };

  get(relativeUrl, config = {}) {
    try {
      return axios.get(this._generateUrl(relativeUrl), this._config(config));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  post(relativeUrl, data = null, config = {}) {
    try {
      return axios.post(
        this._generateUrl(relativeUrl),
        data,
        this._config(config)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  put(relativeUrl, data = null, config = {}) {
    try {
      const fullUrl = relativeUrl.startsWith("http")
        ? relativeUrl
        : this._generateUrl(relativeUrl);
      return axios.put(fullUrl, data, this._config(config));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  patch(relativeUrl, data = null, config = {}) {
    try {
      return axios.patch(
        this._generateUrl(relativeUrl),
        data,
        this._config(config)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  delete(relativeUrl, data = null, config = {}) {
    try {
      const fullUrl = this._generateUrl(relativeUrl);

      if (data) {
        return axios.delete(fullUrl, {
          ...this._config(config),
          data: data,
        });
      } else {
        return axios.delete(fullUrl, this._config(config));
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  setCommonHeader(key, value) {
    axios.defaults.headers.common[key] = value;
  }

  setBaseUrl(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _generateUrl(relativeUrl) {
    return `${this._baseUrl}/${relativeUrl}`;
  }

  _config(config = {}) {
    const isFormData = config?.isFormData;

    return {
      headers: {
        ...(isFormData
          ? { Authorization: `Bearer ${DataService?.token}` }
          : {
              "Content-Type": "application/json",
              Authorization: `Bearer ${DataService?.token}`,
            }),
      },
      ...config,
    };
  }
}

export default DataService;
