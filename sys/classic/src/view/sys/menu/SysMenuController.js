Ext.define('SysApp.view.sys.SysMenuController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-menu',


	onSelectTree : function( selmodel , record , index , eOpts ) {

		var forms = this.getView().query('tabpanel form');

		for(var i=0;i<forms.length;i++){
			var form = forms[i];
			form.getForm().setValues(record.data);
		}


	}
});