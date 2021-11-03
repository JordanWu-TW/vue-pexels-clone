export default class DateUtils {
  static getDate(long) {
    return new Date(long).toDateString();
  }
}
