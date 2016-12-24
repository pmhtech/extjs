Ext.define('PmhTech.plugin.CsvExporterPlugin', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-grid-csv-exporter',
	init: function (grid) {
		var me = this;
		me.grid = grid;
		grid.exportCsvFile = Ext.Function.bind(me.exportCsvFile, me);
	},

	/**
	 * @public
	 * @param {String} downloadFileName : 다운로드명
	 */
	exportCsvFile: function(downloadFileName){
		var me              = this,
			csvContent      = '',
			noCsvSupport     = ( 'download' in document.createElement('a') ) ? false : true,
			sdelimiter      = noCsvSupport ? "<td>"   : "",
			edelimiter      = noCsvSupport ? "</td>"  : ",",
			snewLine        = noCsvSupport ? "<tr>"   : "",
			enewLine        = noCsvSupport ? "</tr>"  : "\r\n",
			printableValue  = '';

		csvContent += snewLine;


		var records = [];
		var store = me.grid.getStore();

		for(var i=0;i<store.getCount();i++){
			records.push(store.getAt(i));
		}
		var gridColumns = me.grid.getColumnManager().getColumns();


		for(var j=0;j<gridColumns.length;j++){
			csvContent += sdelimiter +  gridColumns[j].text + edelimiter;
		}
		csvContent += enewLine;
		for(var i=0;i<records.length;i++) {
			var data = records[i].data;
			csvContent += snewLine;
			csvContent += sdelimiter +  '' + edelimiter;
			for (var j = 0; j < gridColumns.length; j++) {
				var dataIndex = gridColumns[j].dataIndex;
				var value = data[dataIndex];
				printableValue = ((noCsvSupport) && value == '') ? ''  : value;
				printableValue = String(printableValue).replace(/,/g , "");
				printableValue = String(printableValue).replace(/(\r\n|\n|\r)/gm,"");
				csvContent += sdelimiter +  printableValue + edelimiter;
			}
			csvContent += enewLine;
		}

		if('download' in document.createElement('a')){
			/*
			 This is the code that produces the CSV file and downloads it
			 to the users computer
			 */


			//일부 IE에서나 FireFox상에서는 Click이벤트 미 작동됨.
			HTMLElement.prototype.click = function() {
				var evt = this.ownerDocument.createEvent('MouseEvents');
				evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				this.dispatchEvent(evt);
			};

			var link = document.createElement("a");




			link.setAttribute("href", "data:text/csv;charset=UTF-8,\uFEFF," + encodeURI(csvContent));
			link.setAttribute("download", Ext.isEmpty(downloadFileName) ?  "엑셀파일" : downloadFileName +".csv");
			link.click();
		} else {
			var newWin = open('windowName',"_blank");
			newWin.document.write('<table border=1>' + csvContent + '</table>');
		}
	}
});
