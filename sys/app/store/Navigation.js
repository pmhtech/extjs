Ext.define('SysApp.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',
    storeId : 'Navigation',
    fields: [


        {name: 'SYSTEM',  type: 'string'},
        {name: 'COMPANY',  type: 'string'},
        {name: 'PRE_MENU_ID',  type: 'string'},
        {name: 'MENU_ID',  type: 'string'},
        {name: 'MENU_NM',  type: 'string'},
        {name: 'MENU_LVL',  type: 'int'},
        {name: 'USE_YN',  type: 'string'},
        {name: 'SORT',  type: 'int'},
        {name: 'CLASS_NM',  type: 'string'},
        {name: 'WIDGET_NM',  type: 'string'},
        {name: 'expanded',  type: 'boolean', defaultValue : true},
        {name: 'leaf',  type: 'boolean', convert:function(v,record){
            return Ext.isEmpty(record.get('WIDGET_NM')) ? false : true;
        }}
    ],
    root: {
        text: 'All',
        expanded: true
    },doLoadData : function(array){
        var treeNode = PmhTech.Utils.convertListToTree(array,'MENU_ID','PRE_MENU_ID',"");
        this.oriData = Ext.clone(treeNode);
        this.getRoot().appendChild(treeNode);
    }
});