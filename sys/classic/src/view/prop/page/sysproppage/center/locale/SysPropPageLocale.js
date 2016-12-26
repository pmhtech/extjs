
Ext.define('SysApp.view.prop.page.sysproppage.center.locale.SysPropPageLocale',{
    extend: 'Ext.panel.Panel',
    alias : 'widget.sys-prop-page-locale',
    controller: 'sys-prop-page-locale',
    layout : {
        type : 'hbox',
        align : 'stretch'
    },

    initComponent : function(){
        var me = this;

        var isDefaultLang = (PmhTech.Utils.getDefaultLanguage()==me.LOCALE_CD);
        Ext.apply(me,{
            items : [{
                xtype : 'pmh-simple-grid',
                itemId : 'sysPropPageLocale',
                title : '컴포넌트 속성',
                storeProps : {
                    fields :[
                        {name : 'isChecked', type: 'boolean',defaultValue:false }
                    ],
                    rootProperty : 'sysPropPages'
                },
                dockedItems : [{
                   xtype : 'pmh-button-toolbar',
                    buttonAlign : 'right',
                    btnItems : ['delete']
                }],
                flex : 2,
                plugins :[{
                    ptype : 'pmh-grid-excel-editor',
                    listeners : {
                        beforeedit : 'onBeforeEdit',
                        scope : me.getController()
                    }
                },{
                    ptype : 'pmh-grid-checker'
                }],
                columns : [
                    {text : '화면위젯'        , dataIndex :'MASTER_DOM'   ,width: 100,editor : {xtype : 'textfield'}},
                    {text : '상세DOM'        , dataIndex :'DETAIL_DOM'   ,width: 100,editor : {xtype : 'textfield'}},
                    {text : '필드타입'       , dataIndex :'DOM_TYPE', width: 100,
                        editor : {
                            xtype : 'pmh-combo',
                            storeProps : {
                                rootProperty : 'sysPropTypes'
                            },
                            displayField : 'XTYPE_NM',
                            valueField : 'XTYPE_NM'
                        }
                    },
                    {text : 'Dom 주소'     , dataIndex : 'DOM_QRY' , flex : 1
                        ,editor : {
                            xtype : 'textfield'
                        }
                    },
                    {text : '라벨'        , dataIndex :'DOM_LABEL'   ,width: 100,editor : {xtype : 'textfield'}},
                    {text : '정렬순서'       , dataIndex :'SORT', width : 40,
                        editor : {
                            xtype : 'numberfield'
                        }
                    },
                    {text : '필드타입'       , dataIndex :'DOM_PROPS'}

                ],
                listeners : {
                    select : 'onSelectGrid',
                    storeUpdate : 'onUpdateStore',
                    scope : me.getController()
                }
            },{
                xtype : 'propertygrid',
                flex : 1,
                title : '기타속성값',
                itemId : 'fieldPropertyDtl',
                listeners : {
                    afterrender  : 'onAfterRenderPropertyGrid',
                    scope : me.getController()
                }
            }],listeners : {
                InitMode : 'onInitMode',
                scope : me.getController()
            }
        });

        me.callParent(arguments);
    }
});
