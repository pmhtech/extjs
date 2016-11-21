Ext.define('PmhTech.event.EventWireManager', {
    extend: 'Ext.Base',

    requires: [
        'PmhTech.event.xtype.Grid'
    ],
    statics: {
        _getComponent : function(masterView,eventNode){

            var cmpName = eventNode.COMPONENT;
            var cmpXType = eventNode.XTYPE;
            var eventName = eventNode.EVENT_NAME;
            var component = masterView.down(cmpName);
            if(component.getXTypes().search(cmpXType)==-1){
                alert('Component의 Xtype이 잘못되었습니다');
                console.log(component);
                return false;
            }
            return {
                component : component,
                eventName : eventName
            }
        },
        _getEventArgs : function(masterView,eventNode){

            var cmpName = eventNode.COMPONENT;
            var cmpXType = eventNode.XTYPE;
            var cmpEvent = eventNode.EVENT_NAME;
            var cmpEventDtl = eventNode.DETAIL_EVENT_NAME;
            var eventComment = eventNode.COMMENT;

            var component = masterView.down(cmpName);
            if(component.getXTypes().search(cmpXType)==-1){
                alert('Component의 Xtype이 잘못되었습니다');
                console.log(component);
                return false;
            }

            if(Ext.isEmpty(cmpEvent)){

                return {
                    component : component,
                    eventName : cmpEventDtl,
                    arguments : [component]
                }
            }
            var xtypeName = cmpXType.charAt(0).toUpperCase() + cmpXType.slice(1);
            return PmhTech.event.xtype[xtypeName][cmpEvent](component);
        },

        _getEventWire : function(masterView,parentNode, childNodes){


            var me = this;
            var masterEventProps = this._getComponent(masterView,parentNode);
            var parentComp = masterEventProps.component;
            var parentEvent = masterEventProps.eventName;


            for(var i=0;i<childNodes.length;i++){
                var childNode = childNodes[i];


                parentComp.addListener(parentEvent,function(){

                    var eventProps = me._getEventArgs(masterView,this);

                    var component = eventProps.component;
                    var eventName = eventProps.eventName;
                    var args = eventProps.arguments;
                    console.log(this.COMMENT);
                    component.fireEvent(eventName,args[0],args[1],args[2],args[3],args[4],args[5]);

                    if(Ext.isArray(this.children)) {

                        if(me.eventWired!==true){
                            me._getEventWire(masterView, this, this.children);
                            me.eventWired=true;
                        }
                    }

                },childNode);
            }

        },
        initEvent : function(masterView,array){


            var treeData = PmhTech.util.StoreUtil.convertListToTree(array,'EVENT_ID','PRE_EVENT_ID','');
            var rootNode = treeData[0];
            this._getEventWire(masterView,rootNode,rootNode.children);


        }
    }
});