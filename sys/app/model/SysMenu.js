Ext.define('SysApp.model.SysMenu', {
	extend: 'Ext.data.TreeModel',
	idProperty: 'MENU_ID',
	proxy : {
		type :'memory'
	},
	fields: [
		{name: 'MENU_ID', type: 'string' ,convert : function(v,rec){
			rec.set('id',v);
			return v;
		}},
		{
			name: 'iconCls', convert: function (v, rec) {
			return rec.get('ICON_CLASS')
		}
		},
		{name: 'expanded', type: 'boolean', defaultValue: true},
		{	name: 'isChecked', type: 'boolean', defaultValue: false },
		{	name: 'ACTIVE_YN', type: 'string', defaultValue: 'N' },
		{name: 'leaf', type: 'boolean', convert : function(v,rec){
			if(rec.data.MENU_LVL === 4){
				rec.data.leaf = true;
			}else{
				rec.data.leaf = false;
			}

			return rec.data.leaf;
		}}
	]
});