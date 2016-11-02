Ext.define('SysApp.view.dashbaord.SiteMap', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.site_map',

    getSiteMap : function(nodes){


        var vGroup = {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            }, items: []
        };

        var hGroup = {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            }, items: []
        };


        var master = Ext.clone(vGroup);


        for(var i=0;i<nodes.length;i++){
            var node = nodes[i];
            var slave = Ext.clone(hGroup);
            slave.items.push({xtype: 'button', minWidth : 120, text: node.get('MENU_NM')});

            var childNodes = node.childNodes;

            if(childNodes){
                
                slave.items.push(this.getSiteMap(childNodes));
                master.items.push(slave);
            }else{
                master.items.push(slave);
            }

        }
        return master;
    },
    onAfterRender: function (component) {

        var rootNode = Ext.StoreMgr.lookup('Navigation').getRoot();
        var master = this.getSiteMap(rootNode.childNodes);

        component.add(master);

    }

});