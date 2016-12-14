Ext.define('SysApp.view.sys.role.sysrole.center.SysRoleTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-tree',

    onChangeFilter : function(field){

        var me = this.getView();
        var MENU_AUTH = me.down('[name=MENU_AUTH]').getValue();
        var MENU_NM = me.down('[name=MENU_NM]').getValue();



        filterFunc = function(node){

            var isEmptyMENU_NM = Ext.isEmpty(node.get('MENU_NM')) ? true : false;
            var isEmptyMENU_AUTH = MENU_AUTH =='ALL' ? true: false;

            var compareMENU_NM = isEmptyMENU_NM ? true : node.get('MENU_NM').search(MENU_NM)!=-1;
            var compareMENU_AUTH = isEmptyMENU_AUTH ? true : node.get('MENU_AUTH') == MENU_AUTH;

            return compareMENU_NM && compareMENU_AUTH;
        };




        this.getView().filterBy(filterFunc);

    }
});
