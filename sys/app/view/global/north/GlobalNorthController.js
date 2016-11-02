Ext.define('SysApp.view.global.center.GlobalNorthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.global_north',
    refs: [{
        ref: 'global_west',
        selector: 'globalWest'
    }],
    onAfterRender: function (comp) {
        var rootNode = Ext.StoreMgr.lookup('Navigation').getRoot();


        var northMenus = [];
        rootNode.cascadeBy({
            after: function (node) {
                if (node.get('MENU_LVL') == 1) {
                    northMenus.push(node);
                }

            }

        });

        var northButtons = [];
        for (var i = 0; i < northMenus.length; i++) {
            var button = this.createNorthButton(northMenus[i]);
            northButtons.push(button);
        }
        this.getView().add(northButtons);


    },
    createNorthButton: function (treeNode) {

        var me = this;
        var button = Ext.widget('button', {
            text: treeNode.get('MENU_NM'),
            handler: function (button) {

            }, scope: me

        });
        return button;


    }
});