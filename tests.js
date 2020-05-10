function processSampleData() {
  try {
     var csvData = Utilities.parseCsv(sample_csv_data).slice(1);
     var workoutData = JSON.parse(getSampleWorkoutsData());
     
     
     csvData = csvData.reverse();
     for (var i = 0; i < csvData.length; i++) {
        var d1 = new Date(csvData[i][0]);
        d1.setSeconds(0,0);
        var d2 = new Date(workoutData.data[i].start_time*1000);
        d2.setSeconds(0,0);
        if (d1.getTime() != d2.getTime()) {        
          console.log(i + ':' + csvData[i][0] + ':' + new Date(workoutData.data[i].start_time*1000));
        }
    }



     var allFields = getFields(false);
     var requestedFieldIds = allFields.build().map(function(field) {
        return field.name;
      });
    
      var requestedFields = allFields.forIds(requestedFieldIds);
      log('Requested field IDs' + JSON.stringify(requestedFieldIds));

      // Get the values for the requested fields
      var rows = responseToRows(requestedFields, csvData);
      
      log('Successfully fetched ' + rows.length + ' rows for ' + requestedFieldIds.length +' columns');
      return {
        schema: requestedFields.build(),
        rows: rows
      };
    
  } catch(e) {
    error('Error attempting to get data:' + e);
    throw e;
  }
  
}
