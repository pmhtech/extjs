Ext.define('SysApp.view.sys.code.syscode.detail.grid.SysCodeDetailGrid',{
    extend : 'PmhTech.grid.Base',
    alias : 'widget.sys-code-detail-grid',
    controller : 'sys-code-detail-grid',
    storeProps : {
        fields : ['COMPANY','PRE_CD','CODE','CODE_NM','REF1','REF2','REF3','REF4','REF5','USE_YN','MEMO'],
        rootProperty : 'sysCodes'
    },
    columns : [
        { text : '회사코드', dataIndex : 'COMPANY',  editor : {xtype : 'pmh-combo-code', store : SysCode['COM_000001']} ,renderer : PmhTech.Format.comboRenderer},
        { text : '코드그룹', dataIndex : 'PRE_CD'   },
        { text : '코드명', dataIndex : 'CODE_NM'  },
        { text : '코드', dataIndex : 'CODE'     },
        { text : '정렬순서', dataIndex : 'SORT'  },
        { text : '사용유무', dataIndex : 'USE_YN'   }
    ],listeners : {
        InitMode : 'onInitMode'
    }
});