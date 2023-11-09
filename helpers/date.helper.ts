import moment from "moment";

export class DateHelper {
  static getYear(date: string) {
    return this.convertStringToDate(date).getFullYear();
  }

  static getMonth(date: string) {
    const months = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    return months[this.convertStringToDate(date).getMonth()];
  }

  static getDay(date: string) {
    return this.convertStringToDate(date).getDate();
  }

  static convertStringToDate(date: string) {
    return new Date(date);
  }
}
