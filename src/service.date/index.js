import I18nServiceDefault from "vueless/service.i18n";
import { enGB, ru, uk } from "date-fns/locale";
import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  endOfTomorrow,
  format,
  getUnixTime,
  isToday,
  isTomorrow,
  isYesterday,
  minutesToSeconds,
  startOfDay,
  subMonths,
  startOfYear,
  endOfYear,
  startOfMonth,
  subDays,
  secondsToMilliseconds,
  getDaysInMonth,
} from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { format as TimeagoFormat, register as TimeagoRegister } from "timeago.js";
import { uk as locale_UA, ru as locale_RU } from "timeago.js/lib/lang";

const { getActiveLanguage } = new I18nServiceDefault();

export default class DateServiceDefault {
  #languages = {
    en: enGB,
    ru: ru,
    ua: uk,
  };

  #settings = {
    yearFormat: "y",
    monthFormat: "MMMM",
    dayFormat: "EEEE",
    dateNumberFormat: "dd",
    hourFormat: "HH",
    minuteFormat: "mm",
    secondFormat: "ss",
  };

  TOMORROW_TIMESTAMP = getUnixTime(endOfTomorrow());

  constructor(languages = null) {
    this.#languages = languages || this.#languages;
  }

  getDifferenceBetweenTimeZone(date) {
    const diffInMinutesFrom = Math.abs(startOfDay(Number(date?.from)).getTimezoneOffset());
    const diffInMinutesTo = Math.abs(endOfDay(Number(date?.to)).getTimezoneOffset());

    return {
      from: minutesToSeconds(diffInMinutesFrom),
      to: minutesToSeconds(diffInMinutesTo),
    };
  }

  formatDate(date, settings) {
    const mergedSettings = {
      ...this.#settings,
      ...settings,
    };
    const {
      dayFormat,
      monthFormat,
      yearFormat,
      dateNumberFormat,
      hourFormat,
      minuteFormat,
      i18n,
      withTime,
    } = mergedSettings;
    const locale = this.#languages[getActiveLanguage()];

    const day = format(date, dayFormat, { locale });
    const month = format(date, monthFormat, { locale }).split(".").join(""); //Removes dot from Ukr and Rus localization;
    const year = format(date, yearFormat);
    const dateNumber = format(date, dateNumberFormat);
    const hours = format(date, hourFormat);
    const minutes = format(date, minuteFormat);

    let formattedDate = `${day}, ${dateNumber} ${month} ${year}`;

    if (isYesterday(date)) {
      formattedDate = `${i18n.yesterday}, ${dateNumber} ${month} ${year}`;
    }

    if (isToday(date)) {
      formattedDate = `${i18n.today}, ${dateNumber} ${month} ${year}`;
    }

    if (isTomorrow(date)) {
      formattedDate = `${i18n.tomorrow}, ${dateNumber} ${month} ${year}`;
    }

    if (withTime) {
      formattedDate = `${formattedDate} – ${hours}:${minutes}`;
    }

    return formattedDate;
  }

  dateConverter(timestamp, type = "date") {
    const locale = this.#languages[getActiveLanguage()];
    const date = new Date(timestamp * 1000);
    let options = "";

    if (type.includes("date")) {
      options = "dd.MM.yyyy";
    }

    if (type.includes("time")) {
      options = "HH:mm:ss";
    }

    if (type.includes("datetime")) {
      options = "HH:mm dd.MM.yyyy";
    }

    if (type.includes("dateWithFullMonth")) {
      options = "dd MMMM yyyy";
    }

    if (type.includes("dateWithFullMonthAndTime")) {
      options = "dd MMMM yyyy HH:mm";
    }

    return format(date, options, { locale });
  }

  thirtyDaysAgo() {
    const date = new Date();
    const thirtyDaysAgo = subDays(date, getDaysInMonth(date));
    const diffInSeconds = this.getDifferenceBetweenTimeZone({ from: startOfDay(thirtyDaysAgo) });

    return getUnixTime(startOfDay(thirtyDaysAgo)) + diffInSeconds.from;
  }

  nextTwoWeek() {
    const date = new Date();
    const nextTwoWeek = addDays(date, 14);
    const diffInSeconds = this.getDifferenceBetweenTimeZone({ to: nextTwoWeek });

    return getUnixTime(endOfDay(nextTwoWeek)) + diffInSeconds.to;
  }

  sixMonthsAgo() {
    const currentDate = new Date();
    const startOfFiveMonthsAgoInSeconds = getUnixTime(startOfMonth(subMonths(currentDate, 5)));
    const endOfCurrentMonthInSeconds = getUnixTime(endOfMonth(currentDate));
    const diffInSeconds = this.getDifferenceBetweenTimeZone({
      from: startOfMonth(subMonths(currentDate, 5)),
      to: endOfMonth(currentDate),
    });

    return {
      from: startOfFiveMonthsAgoInSeconds + diffInSeconds.from,
      to: endOfCurrentMonthInSeconds + diffInSeconds.to,
    };
  }

  currentMonth() {
    const currentDate = new Date();
    const startOfMonthInSeconds = getUnixTime(startOfMonth(currentDate));
    const endOfMonthInSeconds = getUnixTime(endOfMonth(currentDate));
    const diffInSeconds = this.getDifferenceBetweenTimeZone({
      from: startOfMonth(currentDate),
      to: endOfMonth(currentDate),
    });

    return {
      from: startOfMonthInSeconds + diffInSeconds.from,
      to: endOfMonthInSeconds + diffInSeconds.to,
    };
  }

  currentYear() {
    const currentDate = new Date();
    const startOfYearInSeconds = getUnixTime(startOfYear(currentDate));
    const endOfYearInSeconds = getUnixTime(endOfYear(currentDate));
    const diffInSeconds = this.getDifferenceBetweenTimeZone({
      from: startOfYear(currentDate),
      to: endOfYear(currentDate),
    });

    return {
      from: startOfYearInSeconds + diffInSeconds.from,
      to: endOfYearInSeconds + diffInSeconds.to,
    };
  }

  nextMonth() {
    const nextMonth = addMonths(new Date(), 1);

    const firstDayOfMonth = getUnixTime(startOfMonth(nextMonth));
    const lastDayOfMonth = getUnixTime(endOfMonth(nextMonth));

    return { firstDayOfMonth, lastDayOfMonth };
  }

  startOfSelectedDay(timestamp) {
    const localTimeZone = "Etc/GMT";

    const localStartOfDay = zonedTimeToUtc(startOfDay(timestamp), localTimeZone);

    return getUnixTime(localStartOfDay);
  }

  getTimeAgo(date) {
    TimeagoRegister("ua", locale_UA);
    TimeagoRegister("ru", locale_RU);

    const activeLanguage = getActiveLanguage();

    return TimeagoFormat(secondsToMilliseconds(date), activeLanguage);
  }
}
