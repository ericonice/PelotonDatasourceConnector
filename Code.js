// Used for debugging
const adminMode = true;

// Order of fields in csv file.  Would be better to determine this based on the first row of the csv file
var Fields = {
  WorkoutTimestamp : 0,
  Live : 1,
  InstructorName : 2,
  Length : 3,
  FitnessDiscipline : 4,
  Type : 5,
  Title : 6,
  ClassTimestamp : 7,
  TotalOutput : 8,     
  AvgWatts : 9,
  AvgResistance : 10,
  AvgCadence : 11,
  AvgSpeed : 12,
  Distance : 13,
  Calories : 14,
  AvgHeartrate : 15,
  AvgIncline : 16,
  AvgPace : 17,  
}

function isAdminUser() {
  return adminMode;
}

function getAuthType() {
  var response = { type: 'NONE' };
  return response;
}

function getConfig(request) {
  var cc = DataStudioApp.createCommunityConnector();
  var config = cc.getConfig();
  
  if (adminMode) {
    config.newCheckbox()
      .setId('useSampleData')
      .setName('Use Sample Data')
      .setHelpText('Use sample data of about 1000 classes');
  }

  config.newInfo()
    .setId('instructions')
    .setText('Enter username and password.');
  
  config.newTextInput()
    .setId('username')
    .setName('Enter username or email')
    .setPlaceholder('username or email');
  
  config.newTextInput()
    .setId('password')
    .setName('Enter password')
    .setPlaceholder('password');

  config.setDateRangeRequired(false);
  
  return config.build();
}

function getFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;
      
  fields.newDimension()
    .setId('workoutTimestamp')
    .setName('Workout Timestamp')
    .setType(types.YEAR_MONTH_DAY);
  
  fields.newDimension()
    .setId('live')
    .setName('Live/On-Demand')
    .setType(types.TEXT);
 
  fields.newDimension()
    .setId('instructorName')
    .setName('Instructor Name')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('length')
    .setName('Length (min)')
    .setType(types.NUMBER);
  
  fields.newDimension()
    .setId('fitnessDiscipline')
    .setName('Fitness Discipline')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('type')
    .setName('Type')
    .setType(types.TEXT);
  
  fields.newDimension()
    .setId('title')
    .setName('Title')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('classTimestamp')
    .setName('Class Timestamp')
    .setType(types.YEAR_MONTH_DAY);
  
  fields.newDimension()
    .setId('recordCount')
    .setName('Record Count')
    .setType(types.NUMBER);

  fields.newMetric()
    .setId('totalOutput')
    .setName('Total Output')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);
  
  fields.newMetric()
    .setId('avgWatts')
    .setName('Avg. Watts')
    .setType(types.NUMBER)
    .setAggregation(aggregations.AVG);

  fields.newMetric()
    .setId('avgResistance')
    .setName('Avg. Resistance')
    .setType(types.NUMBER)
    .setAggregation(aggregations.AVG);
  
  fields.newMetric()
    .setId('avgCadence')
    .setName('Avg. Cadence (RPM)')
    .setType(types.NUMBER)
    .setAggregation(aggregations.AVG);

  fields.newMetric()
    .setId('avgSpeed')
    .setName('Avg. Speed (kph)')
    .setType(types.NUMBER)
    .setAggregation(aggregations.AVG);

  fields.newMetric()
    .setId('distance')
    .setName('Distance (km)')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('calories')
    .setName('Calories')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('avgHeartrate')
    .setName('Avg. Heartrate')
    .setType(types.NUMBER)
    .setAggregation(aggregations.AVG);

  fields.newMetric()
    .setId('avgIncline')
    .setName('Avg. Incline')
    .setType(types.NUMBER)
    .setAggregation(aggregations.AVG);

  fields.newMetric()
    .setId('avgPace')
    .setName('Avg. Pace (km/min)')
    .setType(types.NUMBER)
    .setAggregation(aggregations.AVG);

  return fields;
}

function getSchema(request) {
  var fields = getFields().build();
  return { schema: fields };
}



function responseToRows(requestedFields, workoutData) {
  // Transform parsed data and filter for requested fields
  
  var index = 1;
  return workoutData.map(function(row) {
    var values = [];
    requestedFields.asArray().forEach(function (field) {
      switch (field.getId()) {
        case 'recordCount':
          return values.push(index++);
        case 'classTimestamp':
          return values.push(parseTimestamp(row[Fields.ClassTimestamp]));
        case 'workoutTimestamp':
          return values.push(parseTimestamp(row[Fields.WorkoutTimestamp]));          
        case 'live':
          return values.push(row[Fields.Live]);
        case 'instructorName':
          return values.push(row[Fields.InstructorName]);
        case 'length':
          return values.push(row[Fields.Length]);
        case 'fitnessDiscipline':
          return values.push(row[Fields.FitnessDiscipline]);
        case 'type':
          return values.push(row[Fields.Type]);
        case 'title':
          return values.push(row[Fields.Title]);
        case 'totalOutput':
          return values.push(row[Fields.TotalOutput]);
        case 'avgWatts':
          return values.push(row[Fields.AvgWatts]);
        case 'avgResistance':
          return values.push(row[Fields.AvgResistance]);
        case 'avgCadence':
          return values.push(row[Fields.AvgCadence]);
        case 'avgSpeed':
          return values.push(row[Fields.AvgSpeed]);
        case 'distance':
          return values.push(row[Fields.Distance]);
        case 'calories':
          return values.push(row[Fields.Calories]);
        case 'avgHeartrate':
          return values.push(row[Fields.AvgHeartrate]);
        case 'avgIncline':
          return values.push(row[Fields.AvgIncline]);
        case 'avgPace':
          return values.push(row[Fields.AvgPace]);
        default:
          return row.push('');
      }
    });
    
    return { values: values };
  });
}
  
function getData(request) {
  try {
    var workoutData = request.configParams.useSampleData 
      ? getDataUsingSampleData() 
      : getDataUsingPelotonAPIs(request);
  
    var requestedFieldIds = request.fields.map(function(field) {
      return field.name;
    });
    var requestedFields = getFields().forIds(requestedFieldIds);
    console.log('Requested field IDs' + JSON.stringify(requestedFieldIds));

    // Get the values for the requested fields
    var rows = responseToRows(requestedFields, workoutData);
  
    return {
      schema: requestedFields.build(),
      rows: rows
    };
    
  } catch(e) {
    console.error('Error attempting to get data:' + e);
    throw e;
  }
}

function getDataUsingSampleData(request) {
  console.log('Getting data using sample data');
  return Utilities.parseCsv(sampleData).slice(1);
}

function getDataUsingPelotonAPIs(request) {
  var username = request.configParams.username;
  var password = request.configParams.password;
  console.log('Getting data for user');
  
  // First get the user_id and cookie needed to invoke the API to get the workout data
  var url = 'https://api.onepeloton.com/auth/login'
  var payload =
      {
        "username_or_email": username, 
        "password": password
      };
  var options =
      {
        "method"  : "POST",
        "contentType" : "application/json",
        "payload" : JSON.stringify(payload)
      };

  var authResult = UrlFetchApp.fetch(url, options);
    
  // Needs the peloton_session_id cookie for future invocations
  var cookies = authResult.getAllHeaders()['Set-Cookie']; 
  var cookie = cookies.filter(function (c) {
    return c.startsWith('peloton_session_id');
  })[0];
    
  // And needs the user_id
  var authResponse = JSON.parse(authResult.getContentText());
  var userId = authResponse.user_id;
    
  // Fetch and parse data from API
  var url = 'https://api.onepeloton.com/api/user/' + userId + '/workout_history_csv';    
  var header = {"Cookie":cookie};
  var options = {"headers":header};
  var response = UrlFetchApp.fetch(url, options);
  
  // Response is csv  
  var data = response.getContentText();
  
  // Convert to array, ignoring the header row
  // TODO: Use the first row to help determine data associated with each column
  return Utilities.parseCsv(data).slice(1);
}