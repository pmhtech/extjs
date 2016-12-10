Ext.define('PmhTech.event.EventWireManager', {
    extend: 'Ext.Base',

    requires: [
        'PmhTech.event.xtype.Grid'
    ],
    statics: {
        _getComponent : function(masterView,eventNode){

            var cmpName = eventNode.CompName;
            var cmpXType = eventNode.CompXType;
            var eventName = eventNode.Event;

            if(!eventName){
                eventName = eventNode.CustomEvent;
            }

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

            var cmpName = eventNode.CompName;
            var cmpXType = eventNode.CompXType;
            var cmpEvent = eventNode.Event;
            var cmpEventDtl = eventNode.CustomEvent;
            var eventComment = eventNode.Comment;

            var component = masterView.down(cmpName);

            if(Ext.isEmpty(cmpEvent)){

                return {
                    component : component,
                    eventName : cmpEventDtl,
                    arguments : [component]
                }
            }

            if(component.getXTypes().search(cmpXType)==-1){

                alert('Component의 Xtype이 잘못되었습니다');
                console.log(component.getXTypes());
                console.log(component);
                console.log(eventNode);
                return false;
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
                    console.log(this.Comment);
                    component.fireEvent(eventName,args[0],args[1],args[2],args[3],args[4],args[5]);


                },childNode);

                if(Ext.isArray(childNode.children)) {
                    me._getEventWire(masterView, childNode, childNode.children);
                }
            }

        },
        initEvent : function(masterView,array){


            var treeData = PmhTech.util.StoreUtil.convertListToTree(array,'ID','PRE_ID','');
            var rootNode = treeData[0];

            this._getEventWire(masterView,rootNode,rootNode.children);


        }
    }
});