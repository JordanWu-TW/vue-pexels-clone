export default class StringUtils {
  static truncate(str, n) {
    return str.substring(0, n) + " ...";
  }
}
