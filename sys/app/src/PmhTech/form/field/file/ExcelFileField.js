Ext.define('PmhTech.form.field.file.ExcelFileField',{
    alias : 'widget.pmh-excelfilefield',
    extend : 'Ext.form.field.File',
    output: null,

    initComponent : function(){
        var me = this;
        me.callParent();

        me.on('afterrender',function(me){
            var me = this;
            me.fileInputEl.dom.onchange=function(event){
                var file = event.target.files[0];
                var reader = new FileReader();
                reader.onload = function(event){
                    var data = event.target.result;
                    var wb = XLSX.read(data, {type: 'binary'});
                    JSON.stringify(me.toJson(wb),2,2);

                    me.fireEvent('excelload',me,me.output);
                };
                reader.readAsBinaryString(file);
            };
        });
    },
    toJson : function(workbook) {
        var me = this;
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        me.output=result;
        return result;
    }
});