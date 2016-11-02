Ext.define('SysApp.controller.menu.MenuController',{
    extend : 'Ext.app.Controller',
    routes : {
        ':id' : {
            before : 'beforeHandleRoute' , // #2
            action: 'handleRoute' // #3
        }
    },
    refs : [{
        ref : 'centerTabPanel',
        selector : 'global_center tabpanel'
        },{
        ref : 'globalWest',
        selector : 'global_west'
    }
    ],
    beforeHandleRoute :function(id,action){
        var navigation = Ext.StoreMgr.lookup('Navigation');
        if(navigation.getCount()>0){
            action.resume();
        }else{
            return false;
        }

    },
    handleRoute : function(id){

        var navigation = Ext.StoreMgr.lookup('Navigation');
        if(navigation.getCount()<=0 || Ext.isEmpty(id)){
            return false;
        }
        var rootNode = navigation.getRoot();

        var node = rootNode.findChild('MENU_ID', id, true);


        var centerTabPanel = this.getCenterTabPanel();
        var globalWest = this.getGlobalWest();
        var viewContent = centerTabPanel.down('#centerPage_'+id);
        if(!viewContent){
            viewContent ={
                xtype : node.get('WIDGET_NM'),
                title : node.get('MENU_NM'),
                itemId : 'centerPage_'+id,
                menuNode : node

            };
        }
        globalWest.getSelectionModel().select(node);
        centerTabPanel.setActiveTab(viewContent);
    }
});