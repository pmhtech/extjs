Ext.define('SysApp.controller.menu.MenuController', {
    extend: 'Ext.app.Controller',
    routes: {
        ':id': {
            before: 'beforeHandleRoute', // #2
            action: 'handleRoute' // #3
        }
    },
    refs: [{
        ref: 'centerTabPanel',
        selector: 'global-center #mainTab'
    }, {
        ref: 'globalNorth',
        selector: 'global-north'
    }, {
        ref: 'globalWest',
        selector: 'global-west'
    },{
        ref:'globalMain',
        selector:'global-main'
    }],
    init: function () {
        this.control({
            'globalNorth': {
                afterrender: this.createMainMenu
            },
            'centerTabPanel': {
                tabchange: this.onGlobalCenterTabChange
            }
        });


    },
    onGlobalCenterTabChange: function (component, newcard, oldcard) {

        var node = newcard.menuNode;

        var globalNorth = this.getGlobalNorth();
        var masterId = this.getParentMenuByDepth(node, 1, "");
        var subMenuID = this.getParentMenuByDepth(node, 2, "");


        var globalWest = this.getGlobalWest();

        if (globalWest.activeMenu != masterId) {
            var menuBtn = globalNorth.down('#' + masterId);
            menuBtn.handler(menuBtn, subMenuID, node);
        }

        var subTree = globalWest.down('#' + subMenuID);


        subTree.expand();
        var findIdx = subTree.getStore().find('MENU_ID', node.get('MENU_ID'));


        if (findIdx != -1) {
            subTree.getSelectionModel().select(findIdx);

        }

        this.redirectTo(node.get('MENU_ID'));
    },


    createMainMenu: function () {
        var globalNorth = this.getGlobalNorth();
        var globalWest = this.getGlobalWest();
        var rootNode = Ext.clone(Ext.StoreMgr.lookup('Navigation').oriData);
        var childNodes = rootNode;
        var northButtons = [];
        for (var i = 0; i < childNodes.length; i++) {

            var node = childNodes[i];

            var button = {
                xtype: 'button',
                text: node['MENU_NM'],
                node: Ext.clone(node),
                globalNorth: globalNorth,
                itemId: node['MENU_ID'],
                globalWest: this.getGlobalWest(),
                handler: this.createSubMenu,
                scope: this
            };
            northButtons.push(button);

        }
        globalNorth.add(northButtons);


    },
    createSubMenu: function (button, subMenuID, node) {

        Ext.suspendLayouts();
        button.globalWest.removeAll();
        var panels = [];
        var childNodes = Ext.clone(button.node.children);

        for (var i = 0; i < childNodes.length; i++) {

            var childNode = childNodes[i];

            var treeStore = Ext.create('Ext.data.TreeStore', {
                fields: [
                    {name: 'MENU_ID', type: 'string'},
                    {name: 'expanded', type: 'boolean', defaultValue: true},
                    {name: 'leaf',  type: 'boolean', convert:function(v,record){
                        return Ext.isEmpty(record.get('WIDGET_NM')) ? false : true;
                    }}

                ], root: {
                    text: 'ALL',
                    expanded: true
                }
            });
            treeStore.getRoot().appendChild(childNode.children);


            var subTree = {
                xtype: 'menu-tree',
                title: childNode['MENU_NM'],
                collapsed: subMenuID == childNode['MENU_ID'] ? false : true,
                itemId: childNode['MENU_ID'],
                store: treeStore
            };

            panels.push(subTree);
        }
        button.globalWest.setTitle(button.node['MENU_NM']);
        button.globalWest.activeMenu = button.itemId;
        button.globalWest.add(panels);
        Ext.resumeLayouts(true);


    },
    beforeHandleRoute: function (id, action) {
        var navigation = Ext.StoreMgr.lookup('Navigation');
        if (navigation.getCount() > 0) {
            action.resume();
        } else {
            return false;
        }

    },

    getParentMenuByDepth: function (node, depth, menucd) {

        if (node.getDepth() != depth) {
            menucd = this.getParentMenuByDepth(node.parentNode, depth, menucd);
        } else {
            menucd = node.get('MENU_ID');
        }
        return menucd;
    },
    handleRoute: function (id) {

        var navigation = Ext.StoreMgr.lookup('Navigation');
        if (navigation.getCount() <= 0 || Ext.isEmpty(id)) {
            return false;
        }
        var rootNode = navigation.getRoot();
        var node = rootNode.findChild('MENU_ID', id, true);
        if (!node) return false;

        var centerTabPanel = this.getCenterTabPanel();
        var viewContent = centerTabPanel.down('#centerPage_' + id);


        var widgetName = node.get('WIDGET_NM');
        var title = node.get('MENU_NM');

        console.log('메뉴명 : '+title, '         클래스명 : '+widgetName);
        if (!viewContent) {
            viewContent =  {
                xtype : widgetName,
                title: title,
                itemId: 'centerPage_' + id,
                menuNode: node
            };
            //centerTabPanel.add(viewContent);
        }
        centerTabPanel.setActiveTab(viewContent);
    }
});