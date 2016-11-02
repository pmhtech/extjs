Ext.define('PmhTech.Ajax', {
  extend : 'Ext.Base',
  statics: {
    /**
     * /**
     * 해당패널의 내용만 인쇄한다.
     * @param { JSON | Array} Parsing하고자 하는 JSON Array 또는 JSON
     * @returns {string} Enconding JSON String
     */
    request: function (params) {


      params.url= PmhTech.serverUrl+params.url;

      params.failure = function(response, opts) {
        console.log('server-side failure with status code ' + response.status);
      };

      Ext.Ajax.request(params);



    }
  }
});