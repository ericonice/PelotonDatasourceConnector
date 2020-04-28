function ChunkyCache(cache, chunkSize){
  return {
    put: function (key, value, timeout) {
      var json = JSON.stringify(value);
      var cSize = Math.floor(chunkSize / 2);
      var chunks = [];
      var index = 0;
      while (index < json.length){
        cKey = key + "_" + index;
        chunks.push(cKey);
        cache.put(cKey, json.substr(index, cSize), timeout+5);
        index += cSize;
      }
      
      var superBlk = {
        chunkSize: chunkSize,
        chunks: chunks,
        length: json.length
      };
      cache.put(key, JSON.stringify(superBlk), timeout);
    },
    get: function (key) {
      var superBlkCache = cache.get(key);
      if (superBlkCache != null) {
        var superBlk = JSON.parse(superBlkCache);
        chunks = superBlk.chunks.map(function (cKey){
          return cache.get(cKey);
        });
        if (chunks.every(function (c) { return c != null; })){
          return JSON.parse(chunks.join(''));
        }
      }
    }
  };
};

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