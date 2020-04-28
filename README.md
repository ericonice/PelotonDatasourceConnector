# PelotonDatasourceConnector
A Google Data Source Connector for Peloton

This retrieves the same data that is returned when downloading a CSV file of your peloton workouts.  It's actually much simpler to create a data source using a CSV file, so if you are looking for the simplest approach this connector is not the best option.  

The advantage of this connector is the data can be refreshed without having to download the CSV file containing the workout data.

## NOTE: Please Use the Extract Data Source in Conjuction with this Connector
This connector should not be used by itself as this will result in many calls to the Peloton APIs.  Instead, please extract the data for both better performance and reducing Peloton API calls. 

Using the data, you can setup the data source to refresh your workout data daily.

See [Extract data for faster performance](https://support.google.com/datastudio/answer/9019969) for more information on how to extract data.
