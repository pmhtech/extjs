Ext.define('PmhTech.util.GridUtil', {
    requires: [
        'Ext.util.Format',
        'PmhTech.util.StoreUtil'
    ],
    statics: {
         /**
         * @private
         * Form Validation 
         * @param {Ext.grid.Panel} 그리드
         * @param {String} DataIndex
         * @return {Integer} 데이터존재시 index 리턴 없으면 -1 리턴
         *
         */
        findGridColumnIndex: function(grid, dataIndex) {
            var idx=-1;
            for(var i=0;i<grid.columns.length;i++){
                if(grid.columns[i].dataIndex==dataIndex){

                    if(grid.columns[i].hidden){
                        return -1;
                    }
                    idx=i;
                    break;
                }
            }

            return i;
        },
    /**
     * @private
     * autoSync데이터보정 직접호출하시면 안됩니다.
     * @param {Ext.grid.Panel} cls The class to add
     */
        autoSyncDataCalibration: function(grid) {

            var columnArray = grid.columns;
            /**
            현재 선택된 Row의 데이터보정을 위해서 가져옴
            */
            var rec = grid.getSelectionModel().getSelection()[0];

            var dataObj = new Object();

            for(var i=0;i<columnArray.length;i++){


                var fieldName  = columnArray[i].dataIndex;
                if(Ext.isEmpty(fieldName)) continue;
                /**
                 hidden 필드는 데이터보정에서 제외
                */
                var editor=columnArray[i].hidden ? null : columnArray[i].getEditor();



                var fieldValue = rec.data[fieldName];

                if(!Ext.isEmpty(editor)){


                    switch(editor.xtype){
                       /**
                        * checkboxfield 데이터보정
                        */
                        case 'checkboxfield' :
                            fieldValue = fieldValue ? editor.inputValue : editor.uncheckedValue;

                            break;
                       /**
                        * datefield 데이터보정
                        */
                        case 'datefield' :

                            fieldValue = Ext.util.Format.date(fieldValue,editor.submitFormat);
                            break;
                      /**
                       *  그밖의 추가되는 케이스는 아래에 서술
                       *
                       */
                    }

                }
                dataObj[fieldName] = fieldValue;
            }

            /**

            rec.set(dataObj)를 하면 
            grid상의 edit 이벤트가 발생되어서 Ajax호출이 중복 발생됩니다.
            */
            rec.data = dataObj;

        },
        
        /**
         * @public
         * Grid상의 모든 editor를 가져온다.
         * @param {Ext.grid.Panel} 대상 그리드
         * @return{Array} Ext.form.field.Base를 상속받는 객체들 
         */
        getGridEditor : function(grid){
            var columnArray = grid.columns;
            var returnArray = new Array();
            var returnObj = new Object();
            var dataObj = new Object();

            for(var i=0;i<columnArray.length;i++){

                var fieldName  = columnArray[i].dataIndex;
                if(Ext.isEmpty(fieldName)) continue;

                var editor=columnArray[i].hidden ? null : columnArray[i].getEditor();
                if(!Ext.isEmpty(editor)){
                    returnArray.push(editor);
                }

            }
            return returnArray;
        },
        
        /**
         * @public
         * 반드시 afterrender 이벤트내에 서술
         * @param {Ext.grid.Panel} 그리드만 정의하면 내부적으로 Store에 접근해서 데이터보정완료함
         */
        setAutoSyncGridStore: function(grid) {

            var me = this;
            var gridStore = grid.getStore();

           /* if(Ext.isString(grid.store)){
                gridStore =Ext.StoreMgr.lookup(grid.store);

            }*/
          
            gridStore.addListener('update',function(store,record, operation, modifiedFieldNames){

                if(operation=='edit'){
                    /**
                     버그원인 
                     Sencha Docs를 autoSync보시면 edit이벤트 발생시에 바로 store.sync가 되어버림
                     하지만  edit가 완료된 시점에서야 checkbox 및 datefield의 inputValue가 
                     데이터가 Binding이 이루어짐
                     그때문에 checkboxfield는 ture,false로 DateField는 inputVlaue의 세팅값의 상관없이 toString해서 넘어감
                    */
                    me.autoSyncDataCalibration(grid);
                }
            });
			PmhTech.util.StoreUtil.setAutoSyncStore(gridStore);

        },
       
         /**
         * @public
         * rowEdting인경우 rendering은 editor의 valueField가 아닌 displayField로 보여주고 싶을때 사용
         * @param {Ext.grid.Panel} 초기화시킬 grid추가
         * @param {String} 데이터인덱스
         * @param {String} value 
         */
        getGridComboRenderer: function(grid, dataIndex, value) {
            /**
             grid와 dataIndex를 넘겨 몇번째 column에 존재하는지 확인
            */
            var i =this.findGridColumnIndex(grid,dataIndex);
            
            /**
              찾지못하면 value 리턴
            */
            if(i==-1){
                return value;
            }

            var editor= null;
           /**
            * Plugin이 존재하면 getEdtior를 통해 가져와야 정상적인 editor를 가져올수 있다.
            */


           var column = grid.getColumnManager().getColumns()[i];

           if(Ext.isFunction(column.getEditor)){
               editor= column.getEditor();
           }else{
               editor= column.editor;
           }

            /**
             * 해당 컬럼의 editor를 찾지못하면 그냥 값 리턴
             */
            if(Ext.isEmpty(editor)){
                return value;
            }

           /**
            * editor즉 Combobox의 store에서 editor의 valueField를 통해 값을 찾기
            */
            var idx =editor.store.find(editor.valueField,value);
            
           /**
            * 값을 찾지못하면 그냥 리턴
            */
            if(idx==-1){
                return value;
            }

           /**
            * editor의 displayField를 리턴
            */
            return editor.store.getAt(idx).get(editor.displayField);
        },
        /**
         * @public
         * @param {Ext.grid.Panel} grid
         * @param {String} downloadFileName : 다운로드명
         */
        exportCsvFile: function(grid,downloadFileName){
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
            var store = grid.getStore();

            for(var i=0;i<store.getCount();i++){
                records.push(store.getAt(i));
            }
            var gridColumns = grid.getColumnManager().getColumns();


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
        
    }
});