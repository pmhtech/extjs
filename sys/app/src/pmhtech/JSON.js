Ext.define('PmhTech.JSON', {
  extend : 'Ext.Base',
  statics: {
    /**
     * /**
     * 해당패널의 내용만 인쇄한다.
     * @param { JSON | Array} Parsing하고자 하는 JSON Array 또는 JSON
     * @returns {string} Enconding JSON String
     */
    encode: function (records) {
      if (!Ext.isArray(records)) {
        records = [records];
      }

      // 배열의 시작 [
      var jsonStr = '[';
      for (var i = 0; i < records.length; i++) {
        var record = records[i];

        // 배열이 큰경우 한건씩 encode 시켜서 jsonStr 추가
        jsonStr += Ext.JSONencode(record.data);
        if (records.length - 1 != i) {
          jsonStr += ',';
        }
      }
      //배열의 종료 ]
      jsonStr += ']';
      return jsonStr;
    }
  }
});