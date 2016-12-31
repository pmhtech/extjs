/**
 *
 * TreePanel에서 Checkbox 자동체크를 하는 플러그인
 *
 * 	   @example
 *     Ext.create('Ext.tree.Panel,{
 * 		plugins: [{
 *			ptype : 'pmh-treechecker',
 *			dataIndex : 'isChecked'
 *
 *		}],
 *		store: Ext.create('Ext.data.TreeStore', {
 * 			fields: [
 * 				{	name: 'isChecked', type: 'boolean', defaultValue: false }
 * 			],
 *			root: {
 *				MENU_NM: 'All',
 *				text: 'ALL',
 *				id: 'root',
 *				expanded: true
 *		    }
 *		 }
 *	   });
 *
 *
 *
 * */
Ext.define('PmhTech.plugin.TreeChecker', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-treechecker',


	/***
	 * @cfg {String} dataIndex
	 * CheckColumn의 dataIndex를 지정 , 미지정 또는 checked일경우는 Tree의 기본 checked 필드 사용
	 */
	dataIndex: 'checked',
	/***
	 * @cfg {Boolean} includeParent
	 * true일경우 childNode가 전부 선택된경우만 상위노드들 선택
	 * false일경우 childNode가 하나라도 선택되면 상위노드 전체선택
	 */
	includeParent: true,
	init: function (tree) {
		var me = this;
		me.tree = tree;
		if (me.dataIndex == 'checked') {
			tree.addListener('checkchange', this.onCheckChange, this);

		} else {
			var columns = tree.getColumns();
			var column = null;
			for (var i = 0; i < columns.length; i++) {

				if (columns[i].dataIndex == me.dataIndex) {
					column = columns[i];
					column.addListener('checkchange', this.onCheckColumnChange, this);
					break;
				}
			}
		}
	},
	onCheckColumnChange: function (checkcolumn, rowIndex, checked) {

		var node = this.tree.getStore().getAt(rowIndex);
		this.onCheckChange(node, checked);

	},
	onCheckChange: function (node, checked) {

		var includeParent = this.includeParent;

		if (node.get('leaf') !== true) {
			this.changeCheckbox(node, checked);
		}
		if (!checked) {
			if (!includeParent) {
				this.changeUncheckebox(node, checked);
			} else {
				this.childNodeAllUnCheck(node, checked);
			}
		} else {
			this.childNodeAllCheck(node, checked);

			if (includeParent) {
				this.parentNodeAllCheck(node, checked);
			}
		}
	},


	parentNodeAllCheck: function (node, checked) {
		var me = this;
		var parentNode = node.parentNode;

		if (parentNode) {
			parentNode.set(me.dataIndex, checked);
			this.parentNodeAllCheck(parentNode, checked);
		}
	},
	childNodeAllUnCheck: function (node, chk) {
		var me = this;

		if (node) {
			var parentNode = node.parentNode;
			if (parentNode) {
				var findNode = parentNode.findChild(me.dataIndex, true, true);

				if (Ext.isEmpty(findNode) && parentNode) {
					parentNode.set(me.dataIndex, false);

				}
				this.childNodeAllUnCheck(parentNode, chk);
			}
		}
	},

	childNodeAllCheck: function (node, chk) {

		var me = this;

		if (node) {
			var parentNode = node.parentNode;
			if (parentNode) {
				var findNode = parentNode.findChild(me.dataIndex, false);

				if (!findNode) {
					parentNode.set(me.dataIndex, true);
					this.childNodeAllCheck(parentNode, chk);
				}
			}
		}
	},
	changeUncheckebox: function (node, chk) {

		var me = this;
		if (node.parentNode) {
			node.set(me.dataIndex, false);
			this.changeUncheckebox(node.parentNode, false);
		}
	},
	changeCheckbox: function (node, checked) {
		var me = this;

		node.eachChild(function (n) {
			n.set(me.dataIndex, checked);
			me.changeCheckbox(n, checked);
		});
	}


});