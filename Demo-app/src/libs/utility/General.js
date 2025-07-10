import moment from "moment";
import { NO_LOADER_FOR_API_ENDPOINT } from "../constant";
export class General {
  static convertStringToURLPath = (string = "") => {
    const path = string.split(" ").join("-").toLowerCase();
    return `/${path}`;
  };

  static toggleObjectInArray = (array = [], object = {}, property = "") => {
    const arrayClone = [...array];
    const index = arrayClone.findIndex(
      (item) => item[property] === object[property]
    );

    if (index !== -1) {
      arrayClone.splice(index, 1);
    } else {
      arrayClone.push(object);
    }

    return arrayClone;
  };

  static updateObjectInArray = (
    array = [],
    object = {},
    property = "",
    updatedObject = {}
  ) => {
    const arrayClone = [...array];
    const index = arrayClone.findIndex(
      (item) => item[property] === object[property]
    );

    if (index !== -1) {
      arrayClone.splice(index, 1, updatedObject);
    } else {
      arrayClone.push(object);
    }

    return arrayClone;
  };

  static camelToPascalWithSpaces(camelCaseString = "") {
    if (!camelCaseString) return "";
    let pascalCaseString =
      camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);
    pascalCaseString = pascalCaseString.replace(/([A-Z])/g, " $1");
    return pascalCaseString;
  }

  static addLableValuePair = (
    array = [],
    labelKey = "",
    valueKey = "",
    label2 = ""
  ) => {
    return array.map((object) => {
      const label = object[labelKey] + " " + `${object[label2] ?? ""}`;
      return { ...object, label: label, value: object[valueKey] };
    });
  };
  static addLableValuePairWithoutSpace = (
    array = [],
    labelKey = "",
    valueKey = "",
    label2 = ""
  ) => {
    return array.map((object) => {
      const label = object[labelKey] + `${object[label2] ?? ""}`;
      return { ...object, label: label, value: object[valueKey] };
    });
  };

  static fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = function () {
        const base64String = fileReader.result.split(",")[1];
        resolve(base64String);
      };

      fileReader.onerror = function (error) {
        reject(error);
      };

      fileReader.readAsDataURL(file);
    });
  };

  static bufferToBlob = (buffer, mimeType = "application/octet-stream") => {
    if (!Array.isArray(buffer)) {
      throw new Error("Invalid buffer: Expected an array of numbers.");
    }

    const uint8Array = new Uint8Array(buffer);
    return new Blob([uint8Array], { type: mimeType });
  };

  static base64ToBlob(base64Data, contentType = "application/octet-stream") {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  static downloadFile(data, fileName, mimeType) {
    const blob = General.bufferToBlob(data, mimeType);
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  }

  static openBase64FileInNewTab(base64, isBase64 = false) {
    const base64String = isBase64 ? base64 : base64.split(",")[1];
    const extension = base64.split(";")[0].split("/").pop();
    let mimeType = "";

    switch (extension?.toLowerCase()) {
      case "txt":
        mimeType = "text/plain";
        break;
      case "pdf":
        mimeType = "application/pdf";
        break;
      case "png":
        mimeType = "image/png";
        break;
      case "jpg":
        mimeType = "image/jpg";
        break;
      case "jpeg":
        mimeType = "image/jpeg";
        break;
      case "docx":
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
      case "xlsx":
        mimeType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      case "csv":
        mimeType = "data:text/csv";
        break;
      case "zip":
        mimeType = "application/zip";
        break;

      default:
        mimeType = "application/octet-stream";
        break;
    }

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    const objectURL = URL.createObjectURL(blob);

    window.open(objectURL, "_blank");

    URL.revokeObjectURL(objectURL);
  }

  static getformattedDate(date) {
    return moment(date).format("DD-MM-YYYY");
  }

  static isValidDate(dateString, format = "DD/MM/YYYY") {
    return moment(dateString, format, true).isValid();
  }

  static sanitizeNumbers = (string = "") => {
    if (/^\d+$/.test(string)) {
      return Number(string);
    } else {
      return string;
    }
  };

  static getLabelValue = (valueStr = "") => {
    return {
      label: this?.camelToPascalWithSpaces(valueStr) || "",
      value: valueStr || "",
    };
  };

  static formateAadhar(value) {
    const formattedValue = value
      .replace(/\D/g, "")
      .match(new RegExp(".{1,4}", "g"))
      ?.join("-")
      .slice(0, 14);
    return formattedValue;
  }
  static formatABHANumber = (value) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue.replace(
      /^(\d{2})(\d{4})(\d{4})(\d{4})$/,
      "$1-$2-$3-$4"
    );
    return formattedValue;
  };

  static getAllSum(arr = [], key = "") {
    if (!arr?.length) return 0;
    return arr?.reduce((acc, curr) => {
      const value = isNaN(curr[key]) ? 0 : curr[key];
      return acc + value;
    }, 0);
  }

  static tokenDecode = (token) => {
    if (token) {
      const decoded = "";
      return decoded;
    }
  };

  static isMETBase64 = (str) => {
    const desiredMimeTypes = [
      "pdf",
      "png",
      "jpeg",
      "jpg",
      "doc",
      "excel",
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "zip",
      "mp3",
      "csv",
      "mpeg",
      "msword",
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/msword",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/zip",
      "audio/mpeg",
      "text/csv",
    ];

    const regexPattern = new RegExp(
      `^data:(${desiredMimeTypes.join("|")});base64,`
    );
    return regexPattern.test(str);
  };

  static convertObjToQueryString = (data) => {
    return Object.entries(data)
      .filter(([key, val]) => val !== undefined && val !== null)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  };
  static extractDigits = (str) => {
    return str?.replace(/\D/g, "");
  };

  static calculateNetTotal(finalTotal, gstRate) {
    const netTotal = finalTotal / (1 + gstRate / 100);
    return netTotal?.toFixed(2);
  }
  static calculateGst = (amount, gstRate) => {
    return (amount * (gstRate / 100))?.toFixed(2);
  };

  static convertToUppercaseAMPM = (timeString) => {
    try {
      let [time, period] = timeString?.split(" ") || [];
      period = period?.toUpperCase();
      return `${time} ${period}`;
    } catch (err) {
      console.error(err);
    }
  };

  static isWhitelisted = (url) => {
    return NO_LOADER_FOR_API_ENDPOINT.some((whitelistedUrl) =>
      url.includes(whitelistedUrl)
    );
  };

  static stringToUpperCaseWithSpaces(lowerCaseString = "") {
    if (!lowerCaseString) return "";
    let spacedString = lowerCaseString.replace(/([A-Z])/g, " $1").trim();
    let upperCaseString = spacedString.toUpperCase();
    return upperCaseString;
  }
  static numberWithoutHyphens(numberWithHyphens = "") {
    if (!numberWithHyphens) return "";
    let numberWithoutHyphens = numberWithHyphens.replace(/-/g, "");
    return numberWithoutHyphens;
  }
  static capitalizeFirstLetter = (str) => {
    try {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    } catch (error) {
      return str;
    }
  };
  static toPascalCaseWithSpaces = (text = "") => {
    if (!text) return "";
    return text
      .toLowerCase()
      .split(/[\s_-]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
}

export default General;
