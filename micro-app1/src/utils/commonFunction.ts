import { lang } from "json/lang";
import Api from "redux/services";
import { getUrlForApiService } from "utils/urlHandler";
import { ApiService, EMPTY, getTimeFromEpoch } from "types/enums";
import { type TimeSegment } from "types/interfaces/PropsInterfaces/common";
import dayjs from "dayjs";
import { chartRangeType } from "types/enums/kpiEnum";
import { type RangesData } from "types/interfaces/PropsInterfaces/charts";
import { useCallback } from "react";
import { message } from "antd";
import CustomerLogo from "assets/images/customerLogo.png";
import { millisecondsInDay } from "./constants";
import utc from "dayjs/plugin/utc";
// Function will restrict user to not enter blank space in first place
export const handleKeyPress = (e: any): any => {
  if (e.which === 32 && e.target.value.length === 0) {
    e.preventDefault();
  }
};

// Function to get random backgroup colour in avatar
export const randomBackgroundColou = (): string => {
  return "#" + Math.floor(Math.random() * 16777216).toString(16);
};

// sort Array of object with String datatype (ascending)
export const ascendingSort = (sortColumn: string, tableBody: any[]): any => {
  return tableBody.sort((a, b) => {
    const nameA = a[sortColumn]?.toLowerCase();
    const nameB = b[sortColumn]?.toLowerCase();
    if (nameA < nameB) return -1;
    else if (nameA > nameB) return 1;
    return 0;
  });
};

// sort Array of object with String datatype (decending)
export const decendingSort = (sortColumn: string, tableBody: any[]): any => {
  return tableBody.sort((a, b) => {
    const nameA = a[sortColumn]?.toLowerCase();
    const nameB = b[sortColumn]?.toLowerCase();
    if (nameA > nameB) return -1;
    else if (nameA < nameB) return 1;
    return 0;
  });
};

// sort Array of object with Number datatype (ascending)
export const ascendingNumberSort = (
  sortColumn: string,
  tableBody: any[]
): any => {
  return tableBody.sort((a, b) => {
    const nameA = a[sortColumn];
    const nameB = b[sortColumn];
    if (nameA < nameB) return -1;
    else if (nameA > nameB) return 1;
    return 0;
  });
};

// Function to get initials of character in avatar
export const getIntials = (name: string): string => {
  const words = name?.split(" ");
  const initials = words?.map((word) => word[0]?.toUpperCase());
  return initials?.join("");
};

// Function to get random backgroup colour in avatar
export const randomBackgroundColour = (): string => {
  let color;
  do {
    color = "#" + Math.floor(Math.random() * 16777216).toString(16);
  } while (color === "#000000"); // Continue generating until color is not black
  return color;
};
export const generateUniqueRandomColors = (count: number): string[] => {
  const uniqueColors: string[] = [];

  while (uniqueColors.length < count) {
    const color = randomBackgroundColour();
    if (!uniqueColors.includes(color)) {
      uniqueColors.push(color);
    }
  }

  return uniqueColors;
};
export const languageChangeHandler = (
  language: string,
  stringToReplace: string
): string => {
  // Note here string to replace is a unique id with first letters before first `-` refers to screen name and after that refers to string to replace
  language = "en_IN";
  return lang?.[language]?.[stringToReplace];
};

// export const baseUrlSetter = (screen: string): any => {
//     switch (screen) {
//         case 'userManagement':
//             Api.defaults.baseURL =
//             getUrlForApiService(
//                 ApiService.USER_MANAGEMENT
//             );
//             return Api.defaults.baseURL;
//         case 'userManagementGroups':
//             Api.defaults.baseURL = getUrlForApiService(
//                 ApiService.USER_MANAGEMENT
//             );
//             return Api.defaults.baseURL;
//         case 'deviceManagement':
//             Api.defaults.baseURL = getUrlForApiService(
//                 ApiService.AMP_CONFIGURATOR
//             );
//             return Api.defaults.baseURL;
//         case 'kpi':
//             Api.defaults.baseURL = getUrlForApiService(ApiService.KPI_ENGINE);
//             return Api.defaults.baseURL;
//         case 'asset':
//             Api.defaults.baseURL = getUrlForApiService(ApiService.ASSET_API);
//             return Api.defaults.baseURL;
//         case 'deviceManagementTags':
//             Api.defaults.baseURL = getUrlForApiService(
//                 ApiService.AMP_CONFIGURATOR
//             );
//             return Api.defaults.baseURL;
//         case 'calendarConfigurator':
//             Api.defaults.baseURL = getUrlForApiService(
//                 ApiService.CALENDAR_CONFIGURATOR
//             );
//             return Api.defaults.baseURL;
//         case 'reportConfigurator':
//             Api.defaults.baseURL =
//                 Api.defaults.baseURL = getUrlForApiService(
//                     ApiService.REPORT_CONFIGURATOR
//                 );
//             return Api.defaults.baseURL;
//         case 'configure':
//             Api.defaults.baseURL = getUrlForApiService(ApiService.CONFIGURE);

//             return Api.defaults.baseURL;
//         default:
//             break;
//     }
// };

// To do: need this locally

export const baseUrlSetter = (screen: string): any => {
  switch (screen) {
    case "userManagement" || "userManagementGroups":
      Api.defaults.baseURL = "https://user-mgmt.rest.api.dev.solulever.com/v1";
      // getUrlForApiService(
      //     ApiService.USER_MANAGEMENT
      // );
      return Api.defaults.baseURL;
    case "deviceManagement":
      Api.defaults.baseURL = getUrlForApiService(ApiService.AMP_CONFIGURATOR);
      return Api.defaults.baseURL;
    case "kpi":
      Api.defaults.baseURL = "https://kpi.rest.api.dev.solulever.com/v1";
      return Api.defaults.baseURL;
    case "asset":
      Api.defaults.baseURL = "https://asset.rest.api.dev.solulever.com/v1";
      return Api.defaults.baseURL;
    case "calendarConfigurator":
      Api.defaults.baseURL =
        "https://calendar-config.rest.api.dev.solulever.com/v1";
      return Api.defaults.baseURL;
    case "reportConfigurator":
      Api.defaults.baseURL = "https://dashboard-builder.devtest.solulever.com";
      return Api.defaults.baseURL;
    case "configure":
      Api.defaults.baseURL =
        "https://attrib-config.rest.api.dev.solulever.com/v1";
      return Api.defaults.baseURL;
    default:
      break;
  }
};

export const filter = (inputValue: string, path: any): any =>
  path?.some((option: any): any =>
    (option?.label as string)
      ?.toLowerCase()
      ?.includes(inputValue?.toLowerCase())
  );

export const nullValidator: any = (arrayOfValidations: any) => {
  return arrayOfValidations.some(
    (item: any) => item === "" || item === undefined || item === null
  );
};

export function isValidUUID(uuid: any): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export const searchFilterAssumptionsAndFormulae = (
  data: string[],
  searchValue: string,
  setTableData: Function
): any => {
  if (data && searchValue !== "") {
    const tempData = [...data];
    const filteredData = tempData.filter((item: any): any => {
      // Customize the fields you want to search based on your data structure
      const assumptionsMatch = item?.kpiName
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());

      return assumptionsMatch;
    });
    setTableData(filteredData);
  } else {
    setTableData(data);
  }
};

export const searchFilter = (
  data: string[],
  searchValue: string,
  setData: Function
): any => {
  if (data && searchValue !== EMPTY.string) {
    const tempCategories = [...data];
    const filterData = tempCategories?.filter((value: any) => {
      const searchText = searchValue?.toLowerCase();
      if (
        value?.deviceName?.toLowerCase().includes(searchText?.toLowerCase())
      ) {
        return value;
      }
    });
    setData(filterData);
  } else {
    setData(data);
  }
};

export const searchTagFilter = (
  data: string[],
  searchValue: string,
  setData: Function
): any => {
  if (data && searchValue !== EMPTY.string) {
    const tempCategories = [...data];
    const filterData = tempCategories?.filter((value: any) => {
      const searchText = searchValue?.toLowerCase();
      if (value?.tagName?.toLowerCase().includes(searchText?.toLowerCase())) {
        return value;
      }
    });
    setData(filterData);
  } else {
    setData(data);
  }
};

export const capitalizeSubstring = (str: string, substring: string): any => {
  const index = str.toLowerCase().indexOf(substring.toLowerCase());

  if (index === -1) {
    return str; // Substring not found, return the original string
  }

  const capitalizedSubstring = str
    .slice(index, index + substring.length)
    .toUpperCase();
  return (
    str.slice(0, index) +
    capitalizedSubstring +
    str.slice(index + substring.length)
  );
};
export const capitalizeWords = (str: string): string => {
  if (str === "blas") {
    return "BLAs";
  } else if (str.includes("nocil")) {
    const updatedString = capitalizeSubstring(str, "nocil");
    return updatedString
      .split("-")
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");
  } else {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");
  }
};

export const handleKeyInput = (event: any, name: any): any => {
  const allowedChars = /^[a-zA-Z0-9]*$/;
  const allAllowedChars = /^[a-zA-Z0-9// //-]*$/;
  if (name?.length > 0) {
    if (!allAllowedChars.test(event.key)) {
      event.preventDefault();
    }
  } else {
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }
};

export const debounceError = (
  func: (...args: any[]) => any,
  timeout: number = 100
): any => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const mapTree = (treeObject: any): any => {
  const result: any = {
    title: "",

    key: "",

    value: 0,

    children: [],

    list: [],
  };

  if (treeObject?.childNodes?.length) {
    result.children = treeObject?.childNodes?.map((item: any) => {
      return mapTree(item);
    });
  }

  result.title = treeObject?.name;

  result.key = treeObject?.id;

  result.value = treeObject?.id;

  const attributes = treeObject?.nodeAttributeList;

  const tempAttribute: any = [];

  attributes?.map((item: any) => {
    tempAttribute.push({
      title: item?.name,

      value: item?.id,
    });
  });

  result.list = tempAttribute;
  return result;
};

export const hasTabPermission = (array: any[], idToFind: any): any => {
  return array.filter((item: any) => idToFind?.includes(item?.permissionKey));
};

// convert milliseconds to timesegments object
export const convertMillisecondsToTimeSegments = (
  milliseconds: number
): TimeSegment[] => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let remainingDays = days;
  const years = Math.floor(remainingDays / 365);
  remainingDays %= 365;

  const monthsInYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthsLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let months = 0;
  let monthIndex = 0;
  while (
    remainingDays >=
    (isLeapYear(years) ? monthsLeapYear[monthIndex] : monthsInYear[monthIndex])
  ) {
    remainingDays -= isLeapYear(years)
      ? monthsLeapYear[monthIndex]
      : monthsInYear[monthIndex];
    months++;
    monthIndex++;
  }

  const timeSegments: any[] = [
    { label: "Yrs", value: years ?? "-" },
    { label: "Months", value: months ?? "-" },
    { label: "Days", value: remainingDays ?? "-" },
    { label: "Hrs", value: hours ? hours % 24 : "-" },
    { label: "Mins", value: minutes ? minutes % 60 : "-" },
    { label: "Secs", value: seconds ? seconds % 60 : "-" },
  ];

  return timeSegments.filter((obj) => obj.value !== 0);
};

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
export const findValueByKey = (arrayOfObjects: any, keyToFind: any): any => {
  const foundObject = arrayOfObjects.find((obj: any) =>
    // eslint-disable-next-line no-prototype-builtins
    obj.hasOwnProperty(keyToFind)
  );

  if (foundObject) {
    return foundObject[keyToFind];
  }

  return null; // Return null if the key is not found in any object
};

export const checkTimeBeforeShiftC = (): any => {
  const sevenAM = dayjs()
    .add(1, "day")
    .set("hour", 7)
    .set("minute", 0)
    .set("second", 0);

  // Compare the current time to 7 AM

  if (dayjs().isBefore(sevenAM)) {
    return true;
  } else if (dayjs().isAfter(sevenAM)) {
    return false;
  } else {
    return false;
  }
};
export const checkTimeBeforeShiftEndTime = (endTime: any): any => {
  const sevenAM = dayjs()
    .set("hour", endTime)
    .set("minute", 0)
    .set("second", 0);

  // Compare the current time to 7 AM

  if (dayjs().isBefore(sevenAM)) {
    return true;
  } else if (dayjs().isAfter(sevenAM)) {
    return false;
  } else {
    return false;
  }
};

export const isEmptyObject = (obj: {}): any => {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
};

export const getMinMaxFromBadRanges = (
  data: RangesData
): {
  min: number;
  max: number;
  transformedData: Range[];
} => {
  if (data !== undefined || null) {
    const rangesMapper = data?.ranges[0];

    const min = Math.min(
      ...Object.values(rangesMapper).flatMap((category: any[]) =>
        category.map((item: any) => item.from)
      )
    );
    const max = Math.max(
      ...Object.values(rangesMapper).flatMap((category: any[]) =>
        category.map((item: any) => item.to)
      )
    );

    const transformedData = transformRangesData(data);
    return { min, max, transformedData };
  }
  return { min: 0, max: 0, transformedData: [] };
};
export const getColor = (type: string, index: number): any => {
  if (type === chartRangeType?.good) {
    return "#4ED964";
  } else if (type === chartRangeType?.bad) {
    return "#F5E342";
  } else if (type === chartRangeType?.worst) {
    return "#FB554C";
  } else {
    return "#616161"; // Default color
  }
};
export const transformRangesData: any = (data: RangesData): any => {
  const allRanges: any = data.ranges;
  const convertedData = [];
  for (const type in allRanges[0]) {
    const ranges = allRanges[0][type];
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      const convertedRange = {
        to: range.to,
        from: range.from,
        color: getColor(type, i),
      };
      convertedData.push(convertedRange);
    }
  }
  return convertedData;
};

export const convertToChartAreaData = (values: any): any => {
  const chartData = values?.map(({ timestamp, value }: any) => [
    timestamp,
    value,
  ]);
  return chartData;
};

export const areAllValuesDefined = (obj: any): any => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      return false;
    }
  }
  return true;
};

export const fetchValueFromKPI = (idKey: any, kpiMetaRedux: any): any => {
  const foundObject = kpiMetaRedux?.find((obj: any) => obj?.id === idKey);
  if (foundObject) {
    const {
      name,
      unit: { name: unitName },
    } = foundObject;
    return { name: name, dataType: unitName };
  }
};
export function handleKeyPressForNumberInput(
  event: React.KeyboardEvent<HTMLInputElement>
): any {
  // Get the key code of the pressed key
  const keyCode = event.keyCode || event.which;

  // Allow numeric keys, backspace, delete, and the decimal point
  if (
    (keyCode >= 48 && keyCode <= 57) || // Numeric keys
    keyCode === 8 || // Backspace
    keyCode === 46 || // Delete
    (keyCode === 190 && !event.currentTarget.value.includes(".")) // Decimal point (allow only one)
  ) {
    return;
  }

  // Prevent the input of non-numeric characters
  event.preventDefault();
}

const timezoneOffset = new Date().getTimezoneOffset();
export const convertToBrowserTimezone = (timestamp: any): any => {
  const date = new Date(timestamp);
  const offsetMilliseconds = timezoneOffset * 60 * 1000;
  return date.getTime() - offsetMilliseconds;
};

export const useCharacterLimit = (): any => {
  const showInputError = useCallback(
    debounceError((maxLength: Number) => {
      message.error(`Maximum ${maxLength} characters are allowed`);
    }, 100),
    []
  );
  return { showInputError };
};

export const getApiServiceName = (
  url: string,
  serviceNameLogoData: any
): any => {
  const splittedUrl = url?.split(".");
  const serviceName = splittedUrl[1];
  // eslint-disable-next-line no-prototype-builtins
  if (serviceNameLogoData?.hasOwnProperty(serviceName)) {
    return serviceNameLogoData[serviceName];
  }
  return CustomerLogo;
};

export const xAxisLabelFormatHandler = (dateRange: string): any => {
  let format = "%d-%m %H:%S"; // default format

  switch (dateRange) {
    case "Today":
    case "Yesterday":
    case "Shift A":
    case "Shift B":
    case "Shift C":
      format = "%H:%M:%S";
      break;
    case "This Week":
    case "Last Week":
    case "MTD":
    case "WEEK":
    case "MONTH":
      format = "%d-%m %H:%M";
      break;
    case "YTD":
      format = "%m-%d %H:%M";
      break;
  }

  return format;
};
export const isDateToday = (dateString: any): any => {
  const today = new Date();
  const inputDate = new Date(dateString);

  // Set hours, minutes, seconds, and milliseconds to 0 for precise comparison
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return today.getTime() === inputDate.getTime();
};
export const addDaysToDate = (dateString: any, days: any): any => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getTimeValueInHoursMinsSec = (event: any): any => {
  const dayjsObject: any = event;
  const hours = dayjsObject?.hour();
  const minutes = dayjsObject?.minute();
  const seconds = dayjsObject?.second();
  return hours * 3600000 + minutes * 60000 + seconds * 1000;
};

export const validateShiftData = (tableData: any): any => {
  const arr = tableData;
  const result: any = {
    sameName: [],
    overlapKeys: [],
  };
  const nameMap: any = {};
  for (let i = 0; i < arr.length; i++) {
    if (nameMap[arr[i].name] !== undefined) {
      if (!result.sameName.includes(i)) {
        result.sameName.push(i);
      }
      result.sameName.push(nameMap[arr[i].name]);
    } else {
      nameMap[arr[i].name] = i;
    }
    for (let j = 0; j < arr.length; j++) {
      if (
        i !== j &&
        j > i &&
        arr[i].validTill !== undefined &&
        arr[i].validTill !== ""
      ) {
        if (
          (arr[i].validFrom >= arr[j].validFrom &&
            arr[i].validFrom <= arr[j].validTill) ||
          (arr[i].validTill >= arr[j].validFrom &&
            arr[i].validTill <= arr[j].validTill) ||
          (arr[i].validFrom <= arr[j].validFrom &&
            arr[i].validTill >= arr[j].validTill)
        ) {
          if (arr[j].validTill !== "") {
            if (!result.overlapKeys.includes(i)) {
              result.overlapKeys.push(i);
            }
            if (!result.overlapKeys.includes(j)) {
              result.overlapKeys.push(j);
            }
          }
        }
      }
    }
  }
  return {
    sameName: [],
    overlapKeys: [],
  };
};

function getCyclicMillisecondsGap(startTime: any, endTime: any): number {
  const gap = Math.abs(
    (endTime - startTime + millisecondsInDay) % millisecondsInDay
  );
  return gap;
}

function containsTodayDate(timestamp1: any, timestamp2: any): any {
  const today = new Date().getTime();

  if (
    timestamp2 === null ||
    isNaN(timestamp2) ||
    timestamp2 === undefined ||
    timestamp2 === ""
  ) {
    timestamp2 = Infinity;
  }

  if (today >= timestamp1 && today <= timestamp2) {
    return true;
  } else {
    return false;
  }
}
export function calculateTimeDifferenceInHrs(data: any): any {
  let totalDifference = 0;

  for (let i = 0; i < data.length; i++) {
    const startTime = data[i].startTime;
    const endTime = data[i].endTime;
    let difference = 0;
    if (
      !data[i].expired &&
      containsTodayDate(data[i].validFrom, data[i].validTill)
    ) {
      if (endTime < startTime) {
        difference = getCyclicMillisecondsGap(startTime, endTime) / 3600000;
      } else difference = (endTime - startTime) / 3600000;
      totalDifference += difference;
    }
  }
  return Math.round(totalDifference);
}

export function getLocalTimeZone(): any {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  const dateTimeString = new Date()?.toLocaleDateString(undefined, {
    timeZoneName: "short",
  });

  const timeZonePart = dateTimeString?.match(
    /\b([A-Z]+[+-]\d{1,2}:\d{2})\b/
  )?.[0];

  const resultTime = timeZone + " " + timeZonePart;

  return resultTime;
}
export function findOverlappingNames(shiftDetails: any): any {
  const nameMap = new Map();
  const overlappingIndices = [];

  for (let i = 0; i < shiftDetails.length; i++) {
    if (nameMap.has(shiftDetails[i].name)) {
      overlappingIndices.push(i);
      const existingIndex = nameMap.get(shiftDetails[i].name);
      overlappingIndices.push(existingIndex);
    } else {
      nameMap.set(shiftDetails[i].name, i);
    }
  }

  return [];
}

export function findTimeOverlapIndices(shiftDetails: any): any {
  const overlappingIndices = [];

  for (let i = 0; i < shiftDetails.length; i++) {
    for (let j = i + 1; j < shiftDetails.length; j++) {
      if (
        (shiftDetails[i].startTime >= shiftDetails[j].startTime &&
          shiftDetails[i].startTime < shiftDetails[j].endTime) ||
        (shiftDetails[j].startTime >= shiftDetails[i].startTime &&
          shiftDetails[j].startTime < shiftDetails[i].endTime)
      ) {
        overlappingIndices.push(i);
        overlappingIndices.push(j);
      }
    }
  }

  return [];
}

function getExpiredValue(data: any, name: any): boolean {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === name) {
      return (
        !data[i].expired &&
        containsTodayDate(data[i].validFrom, data[i].validTill)
      );
    }
  }
  return false;
}

export function calculateTotalTimeDifference(
  shiftDetails: any,
  dayConfigData: any
): any {
  let totalDifference = 0;
  if (shiftDetails) {
    for (const config of shiftDetails) {
      const iterableObj =
        config?.shiftDetailsList ||
        config?.shiftDetailsList ||
        config.shiftResponseList ||
        config?.shiftDetailList;
      if (getExpiredValue(dayConfigData, config.dayName)) {
        for (const shift of iterableObj) {
          totalDifference += shift.duration;
        }
      }
    }

    return Math.round(totalDifference / getTimeFromEpoch?.hours);
  } else {
    return 0;
  }
}

export function getTimeFromEpochValue(epochValue: number, format: string): any {
  dayjs.extend(utc);
  const dateObject: any = dayjs(epochValue);
  const hour = dateObject.$H;
  const minute = dateObject.$m;
  const second = dateObject.$s;
  const initialTime = new Date();
  initialTime.setHours(hour, minute, second);
  const localDateTime = dayjs(initialTime);
  const utcDateTime = localDateTime.utc();
  const utcTimeString = utcDateTime.format(format);
  return utcTimeString;
}
export function checkIfTimeIsUnderShift(date: any, shiftVal: any): any {
  if (isDateToday(date)) {
    let timeFlag = true;
    switch (shiftVal) {
      case "Shift A":
        // Here 7 denotes the shift A end time
        timeFlag = !checkTimeBeforeShiftEndTime(7);

        break;
      case "Shift B":
        // Here 15 denotes the shift B end time
        timeFlag = !checkTimeBeforeShiftEndTime(15);

        break;
      case "Shift C":
        // Here 23 denotes the shift C end time
        timeFlag = !checkTimeBeforeShiftEndTime(23);

        break;

      default:
        break;
    }
    return timeFlag;
  } else {
    return true;
  }
}
