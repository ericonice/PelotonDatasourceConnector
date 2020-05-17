/**
 * Takes a timestamp, and parses it into the YYYY-MM-DD format.
 *
 * @param {string} timestamp A timestamp that can be used by the `Date constructor`.
 * @return {string} A YYYY-MM-DD formatted string.
 */
function parseTimestamp(timestamp) {
  var date = new Date(timestamp);

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  var day = date.getDate();
  if (day < 10) {
    day = '0' + day;
  }

  return '' + year + month + day;
}

function maskUsernameOrEmail(data) {
  if ((data == null) || (data.length < 3)) {
    return '****';
  }
  
  var split = data.split('@');
  var name = split[0]; 
  split[0] = name.substr(0,1) +  new Array(split[0].length - 2).fill('*').join('') + name.substr(name.length - 1,1);
  return split.join('@');
}

function validateFields(fields) {  
  fields.asArray().forEach(function (field) {
    try {
      log('(Field Id, Field Name) => (' + field.getId() + ',' + field.getName() + ')');
    } catch (exception) {
      warn('Unable to get field Id for field:' + field);
    }
  });
}