Ext.define('PmhTech.button.FileButton', {
    alias : 'widget.pmh_filebutton',
    extend: 'Ext.button.Button',
    requires : [
        'PmhTech.form.FileLabel',
        'PmhTech.window.FileWindow'
    ],
    fileStore : null,
    fileDownloadKey : [],
    text : '첨부파일',
    handler : function(button){

        var me = this;

        var tempKeyField = me.up('form').getForm().findField(me.fileTempID);

        var fileWindow = Ext.ComponentQuery.query('pmh_filewindow')[0];

        if(Ext.isEmpty(fileWindow)){
            fileWindow = Ext.widget('pmh_filewindow');
        }
        var paramObj = {
            fileTempID : me.fileTempID,
            fileStore : me.fileStore,
            fileColumns : me.fileColumns,
            fileParams : me.configFileParams(),
            fileDownloadKey : me.fileDownloadKey
        };

        fileWindow.showPopup(paramObj,function(fileTempKey){
            tempKeyField.setValue(fileTempKey);
        });
    },
    configFileParams : function(){
        alert( '너무 성급하시네요.. configFileParams를 정의하세용... ');
    },
    showDownLoadUrl : function(records,operation){
        var me = this;
        var label = Ext.ComponentQuery.query('#'+me.fileLabelItemId)[0];
        var key = me.fileDownloadKey;
        var fileName = me.fileNameField;
        var labelValue = '';
        Ext.Array.each(records,function(record){
            var downloadUrl = label.downloadUrl+'?'+key[0]+'='+record.get(key[0]);
            for(var i=1;i<key.length;i++){
                downloadUrl+= '&'+key[i]+'='+record.get(key[i]);
            }
            labelValue += '<a href='+downloadUrl+'>'+record.get(fileName)+'</a>'+',';
        });
        label.setValue(labelValue);
    },listeners : {
        beforerender : function(comp){
            var me = this;
            me.fileStore.addListener('beforeload',function(thisStore){
                if(!Ext.isEmpty(thisStore.lastOptions.params)){
                    return true;
                }
                thisStore.load({
                    params : me.configFileParams()
                    ,callback : me.showDownLoadUrl
                    ,scope : me
                });
                return false;
            });
        }
    }
});