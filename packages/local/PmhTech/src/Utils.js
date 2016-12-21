

Ext.define('PmhTech.Utils', {
    extend: 'Ext.Base',
    statics: {
        showPopup: function (widgetName, options) {
            var popup = Ext.ComponentQuery.query(widgetName)[0];

            if (!popup) {
                popup = Ext.widget(widgetName);
            }

            var mode;
            var params = {};
            var callBackFunc;
            var callBackScope;
            if (options) {
                mode = options.mode;
                params = options.params;
                callBackFunc = options.callBackFunc;

                if (Ext.isFunction(options.callBackFunc)) {
                    if (!options.callBackScope) {
                        alert('SCOPE 미지정');
                    }
                }
                callBackScope = options.callBackScope;
            }
            popup.show();
            popup.initSetting(mode, params, callBackFunc, callBackScope);

        },

        printHTML: function (html) {


            Ext.callback(function () {
                var myWindow = window.open('', '', 'width=1200,height=1000');
                var task = new Ext.util.DelayedTask(function () {

                    myWindow.location.reload();
                    myWindow.document.write('<html><head>');
                    myWindow.document.write('<title>' + 'Title' + '</title>');
                    myWindow.document.write('</head><body>');
                    myWindow.document.write(html);
                    myWindow.document.write('</body></html>');
                    myWindow.focus();

                    if (Ext.isIE === true) {
                        var OLECMDID = 7;
                        var PROMPT = 1;
                        var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
                        document.body.insertAdjacentHTML('beforeEnd', WebBrowser);
                        WebBrowser.ExecWB(OLECMDID, PROMPT);
                    } else {
                        myWindow.print();
                    }
                });

                task.delay(500);
            }, Samjong.browserArea);


        },convertListToTree: function (arrayList, id, parentId, rootId) {

            var rootNodes = [];
            var traverse = function (nodes, item, index) {

                if (nodes instanceof Array) {

                    return nodes.some(function (node) {

                        if (node[id] === item[parentId]) {

                            node.children = node.children || [];
                            return node.children.push(arrayList.splice(index, 1)[0]);
                        }

                        return traverse(node.children, item, index);
                    });
                }
            };

            while (arrayList.length > 0) {
                arrayList.some(function (item, index) {
                    if (item[parentId] === rootId) {
                        return rootNodes.push(arrayList.splice(index, 1)[0]);
                    }

                    return traverse(rootNodes, item, index);
                });
            }

            return rootNodes;
        },
        getDefaultLanguage : function(){

            var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');
            var defaultRec = SysCode['COM_000002'].getAt(findIdx);


            return defaultRec.get('REF1');
        }

    }
});
