/**
 *
 *
 *
 *
 *
 */
Ext.define('PmhTech.Format', {
    extend: 'Ext.Base',
    statics: {

		/**
         *
         * @param value
         * @param metaData
         * @param record
         * @param rowIndex
         * @param colIndex
         * @param store
         * @returns {string}
         */
        comboRenderer : function(value, metaData, record, rowIndex, colIndex, store){
            var combo = this.getColumns()[colIndex].getEditor();
            var comboStore = combo.getStore();
            var findIdx = combo.getStore().find(combo.valueField,value);

            if(findIdx==-1){
                return value;
            }
            var rec =  comboStore.getAt(findIdx);


            var value = '';
            if(combo.isShowCode===true){
                value = '['+rec.get(combo.valueField)+'] ';
            }

            value +=rec.get(combo.displayField);

            return value;
        },
		/**
         *
         * @param value
         */
        dateRenderer: function (value) {

            if (Ext.isDate(value)) {
                return Ext.util.Format.date(value, 'Y-m-d')
            }

            var year = value.substr(0, 4);
            var month = value.substr(4, 2);
            var day = value.substr(6, 2);

            return Ext.String.format('{0}-{1}-{2}', year, month, day);
        },
		/**
         *
         * @param value
         */
        numberRenderer: function (value) {
            return Ext.util.Format.number(value, '#,###')
        }
		/**
         *
         * @param value
         * @returns {string}
         */
        ,inactiveRenderer: function (value) {
            return value == 'N' ? '' : value;
        }
    }
});