/**
 * Takes a timestamp, and parses it into the YYYY-MM-DD format.
 *
 * @param {string} timestamp A timestamp that can be used by the `Date constructor`.
 * @return {string} A YYYY-MM-DD formatted string.
 */
function parseTimestamp(timestamp) {
  var date = new Date(timestamp);

  var year = date.getUTCFullYear();

  var month = date.getUTCMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  var day = date.getUTCDate();
  if (day < 10) {
    day = '0' + day;
  }

  return '' + year + month + day;
}