Ext.define('SysApp.view.sys.role.sysrole.center.SysRoleTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-tree',

    onChangeFilter : function(field){

        var me = this.getView();
        var MENU_NM = me.down('[name=MENU_NM]').getValue();
        var MENU_AUTH = me.down('[name=MENU_AUTH]').getValue();
        var USE_YN = me.down('[name=USE_YN]').getValue();



        filterFunc = function(node){

            var isEmptyMENU_NM = Ext.isEmpty(node.get('MENU_NM')) ? true : false;
            var isEmptyMENU_AUTH = MENU_AUTH =='ALL' ? true: false;
            var isEmptyUSE_YN = USE_YN =='ALL' ? true: false;

            var compareMENU_NM = isEmptyMENU_NM ? true : node.get('MENU_NM').search(MENU_NM)!=-1;
            var compareMENU_AUTH = isEmptyMENU_AUTH ? true : node.get('MENU_AUTH') == MENU_AUTH;
            var compareUSE_YN = isEmptyUSE_YN ? true : node.get('isChecked') == (USE_YN=='Y');

            return compareMENU_NM && compareMENU_AUTH && compareUSE_YN;
        };
        this.getView().filterBy(filterFunc);
    },
    onCheckChange :  function(checkcolumn,rowIndex,checked){

        var node = this.getView().getStore().getAt(rowIndex);


        if (node.get('leaf') !== true) {
            function changeCheckbox(node, checked) {
                node.eachChild(function (n) {
                    n.set('isChecked', checked);
                    changeCheckbox(n, checked);
                });
            }
            changeCheckbox(node, checked);
        }

        function changeUncheckebox(n, chk) {
            if (n.parentNode) {
                n.set('isChecked',false);
                changeUncheckebox(n.parentNode, false);
            }
        }

        if(!checked){
            changeUncheckebox(node, checked);
        }else {

            function childNodeAllCheck(n, chk) {

                var parentNode = n.parentNode;

                if (parentNode) {
                    var findNode = parentNode.findChild('isChecked', false);

                    if (!findNode) {
                        parentNode.set('isChecked', true);
                        childNodeAllCheck(parentNode, chk);
                    }
                }
            }
            childNodeAllCheck(node, checked);
        }
    }
});
