/*
*
* 직정수정하시면 안됩니당...
* */
Ext.define('PmhTech.window.FileWindow', {
    alias : 'widget.pmh_filewindow',
    extend: 'Ext.Window',
    defaultListenerScope : true,
    requires: [
        'Ext.grid.Panel',
        'Ext.form.field.File'
    ],
    autoScroll : true,
    title: '파일업로드',
    closeAction : 'hide',
    height: 400,
    width: 700,
    items: [{
        xtype: 'gridpanel',
        height: 200
    }, {
        xtype: 'form',
        bodyPadding: 20
    }], dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [
            {xtype: 'tbfill'},
            {
                xtype: 'button',
                text: '업로드',
                handler : 'handlerBtnUpload'
            }, {
                xtype: 'button',
                text: '닫기',
                handler : 'handlerBtnClose'
            }
        ]
    }], listeners: {
        afterrender: function (component) {
            var me = this;
            var item = [{
                xtype: 'panel',
                layout: 'column',
                defaults: {
                    columnWidth: 0.8,
                    labelWidth: 60,
                    margin: '5 0 0 5'
                },
                items: [{
                    xtype: 'fileuploadfield',
                    fieldLabel: '첨부파일',
                    name: 'file'
                }, {
                    xtype: 'textfield',
                    name: 'NAME',
                    hidden: true
                }, {
                    xtype: 'button',
                    text: '추가',
                    columnWidth: 0.1,
                    handler: function (button) {
                        me.down('form').add(item);
                    }
                }, {
                    xtype: 'button',
                    text: '삭제',
                    columnWidth: 0.1,
                    handler: function (button) {
                        if (me.down('form').items.items.length > 3) {
                            button.up('panel').destroy();
                        }
                    }
                }]
            }];
            me.down('form').add(item);
            me.down('form').add(item);
            me.down('form').add(item);
        }
    },
    showPopup : function(paramObj, callBackFunc){

        var me = this;

        if(Ext.isEmpty(paramObj.fileStore)){
           alert('fileStore을 지정하세용... . 파일목록들을 저장곳이 없네요');
            return false;
        }
        if(Ext.isEmpty(paramObj.fileColumns)){
            alert('fileGridColumns을 지정하세용...리스트를 볼수가 없어용....');
            return false;
        }
        if(Ext.isEmpty(paramObj.fileParams)){
            alert('fileParams를 지정하세요... . DB컬럼값을 지정하셔야....');
            return false;
        }


        me.down('grid').reconfigure(paramObj.fileStore, paramObj.fileColumns);
        me.callBackFunc = callBackFunc;

        me.fileParams = paramObj.fileParams;
        var gridStore = me.down('grid').getStore();

        gridStore.load();
        me.show();
    },

    handlerBtnUpload : function(button) {
        var me = this;
        var formPanel = me.down('form');
        var filUploadForm = formPanel.getForm();
        var gridStore = me.down('grid').getStore();

        filUploadForm.submit({
            url: gridStore.getProxy().url,
            headers: {'Content-Type':'multipart/form-data; charset=UTF-8'},
            waitMsg: 'FileUpload 중입니다...',
            params :me.fileParams ,
            success: function (fp, o) {
                me.fileTempID= o.fileTempID;
                Ext.Msg.alert('확인', '업로드가 정상처리되었습니다.');
            }
        });
    },
    handlerBtnClose : function(button){
        this.hide();
    }
});
