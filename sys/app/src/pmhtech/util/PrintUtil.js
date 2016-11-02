Ext.define('PmhTech.util.PrintUtil', {
    statics: {
        /**
         * 해당패널의 내용만 인쇄한다.
         * @param {Ext.Component} 인쇄하고자 하는 Component 또는 Panel
         *
         */
        printComponent: function (pnl) {
            var targetElement = Ext.getCmp(pnl.id);

            /**
             *
             * window창을 띄움
             */
            var myWindow = window.open('', '', 'visible=none');


            if (Ext.isEmpty(myWindow)) {
                /**
                 * 창을 못띄우거나 브라우저에서 강제로 막아둔경우 이걸 강제로 해제시킨다.
                 *
                 */
                document.write("<object id='DHTMLEdit' classid='clsid:2D360201-FFF5-11d1-8D03-00A0C959BC0A' width='1' height='1' align='middle'><PARAM NAME='ActivateApplets' VALUE='1'><PARAM NAME='ActivateActiveXControls' VALUE='1'></object>");
                setTimeout(function () {
                    myWindow.document.write(targetElement.body.dom.innerHTML);
                    myWindow.location.reload();
                    myWindow.focus();
                    myWindow.print();
                    myWindow.close();
                }, 500);
            } else {
                myWindow.document.write(targetElement.body.dom.innerHTML);
                myWindow.location.reload();
                myWindow.focus();
                myWindow.print();
                myWindow.close();
            }
        }

    }
});