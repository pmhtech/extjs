Ext.define('SysApp.view.sys.code.detail.SysCodeDetailGrid',{
    extend : 'PmhTech.grid.Base',
    alias : 'widget.sys-code-detail-grid',
    controller : 'sys-code-detail-grid',
    storeProps : {
        fields : ['COMPANY','PRE_CD','CODE','CODE_NM','REF1','REF2','REF3','REF4','REF5','USE_YN','MEMO'],
        rootProperty : 'sysCode'
    },
    columns : [
        { text : '회사코드', dataIndex : 'COMPANY'  },
        { text : '회사코드', dataIndex : 'PRE_CD'   },
        { text : '회사코드', dataIndex : 'CODE'     },
        { text : '회사코드', dataIndex : 'CODE_NM'  },
        { text : '사용유무', dataIndex : 'USE_YN'   }
    ],listeners : {
        InitMode : 'onInitMode'
    }
});