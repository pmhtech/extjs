Ext.define('SysApp.view.sys.menu.tab.locale.SysMenuTabLocale', {
	extend: 'PmhTech.form.Panel',
	alias: 'widget.sys-menu-tab-locale',
	controller: 'sys-menu-tab-locale',
	layout: 'column',
	defaults: {
		columnWidth: 0.5,
		margin: '0 5 5 5'
	},
	bodyPadding: 5,
	border: false,


	initComponent : function(){
		var me = this;

		Ext.apply(me,{
			items: [{
				xtype: 'textfield',
				fieldLabel: '메뉴명',
				name: 'LOCALE_CD',
				hidden : true,
				value : me.LOCALE_CD
			},{
				xtype: 'pmh-combo-code',
				fieldLabel: '시스템구분',
				store: SysCode['SYS_000001'].copy(false),
				name: 'SYSTEM',
				listeners: {
					change: 'onChangeNotify'
				}
			}, {
				xtype: 'pmh-combo-code',
				fieldLabel: '메뉴권한',
				store: SysCode['SYS_000002'].copy(),
				name: 'MENU_AUTH',
				listeners: {
					change: 'onChangeNotify'
				}

			},{
				xtype: 'treepicker',
				fieldLabel: '상위메뉴ID',
				name: 'PRE_MENU_ID',
				displayField: 'MENU_NM',
				valueField : 'MENU_ID',
				maxPickerHeight: 400,
				minPickerWidth : 400,
				store : Ext.create('Ext.data.TreeStore',{
					root: {
						MENU_NM: 'All',
						text: 'ALL',
						id : 'root',
						expanded: true
					}
				}),
				listeners: {
					change: 'onChangeNotify',
					collapse : 'onCollapsePicker'
				}
			}, {
				xtype: 'textfield',
				fieldLabel: '메뉴ID',
				name: 'MENU_ID',
				listeners: {
					change: 'onChangeNotify'
				}
			},   {
				xtype: 'textfield',
				fieldLabel: '메뉴명',
				name: 'MENU_NM'
			},  {
				xtype: 'textfield',
				fieldLabel: '메뉴레벨',
				name: 'MENU_LVL',
				listeners: {
					change: 'onChangeNotify'
				}
			},{
				xtype: 'textfield',
				fieldLabel: '클래스명',
				columnWidth : 1,
				name: 'CLASS_NM',
				listeners: {
					change: 'onChangeNotify'
				}
			},{
				xtype: 'textfield',
				fieldLabel: '위젯명',
				name: 'WIDGET_NM',
				columnWidth : 1,
				listeners: {
					change: 'onChangeNotify'
				}
			}, {
				xtype: 'textfield',
				fieldLabel: '정렬순서',
				name: 'SORT',
				listeners: {
					change: 'onChangeNotify'
				}
			}, {
				xtype: 'pmhtech-radio-base',
				fieldLabel: '사용유무',
				name: 'USE_YN',
				radioItems: [{
					xtype: 'radio',
					inputValue: 'Y',
					name: 'USE_YN',
					boxLabel: '사용'
				}, {
					xtype: 'radio',
					inputValue: 'N',
					name: 'USE_YN',
					boxLabel: '미사용'
				}],
				onChangeRadioGroup: 'onChangeUSE_YN'
			},{
				xtype: 'textarea',
				columnWidth : 1,
				fieldLabel: '메모',
				name: 'MEMO'
			}],
			listeners: {
				InitMode: 'onInitMode',
				UpdateMode: 'onUpdateMode',
				InsertMode: 'onInsertMode',
				scope : this.getController()
			}


		});
		me.callParent(arguments);
	}
});