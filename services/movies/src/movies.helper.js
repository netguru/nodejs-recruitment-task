class MoviesHelper {
  static getOMDBLink(title, apiKey) {
    return `http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
  }
  static validateTitle(title) {
    if (typeof title !== "string") {
      throw new Error("title should be string");
    }
  }
  static subtractMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);

    return date;
  }
}

module.exports = MoviesHelper;
