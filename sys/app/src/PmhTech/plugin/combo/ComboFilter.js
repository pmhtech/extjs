Ext.define('PmhTech.plugin.ComboFilter', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.pmh-combofilter',
    init: function (combo) {
        var me = this;
        me.combo = combo;

        combo.doLocalQuery = Ext.Function.bind(me.doLocalQuery, me);
        combo.validator = Ext.Function.bind(me.validator, me);
        combo.onTriggerClick = Ext.Function.bind(me.onTriggerClick, me);
    },

    doLocalQuery: function () {
        var field = this.combo;

        var fieldValue = field.getValue();

        //필터를 모두 제거함
        field.getStore().clearFilter();


        //기존 검색된결과값이 없을때 보이는 메시지를 제거함
        var findIdx = field.getStore().find(field.valueField, 'NOT_FOUND_DATA');
        if (findIdx != -1) {
            field.getStore().removeAt(findIdx);
        }

        if (Ext.isEmpty(field.getValue())) {
            return true;
        }
        //검색조건
        field.getStore().filterBy(function (record) {

            var dispValue = record.get(field.displayField);
            var codeValue = record.get(field.valueField);
            var compareValue = codeValue + ' - ' + dispValue;

            // 실제 Store내의 값과 입력한문자열이 포함되는지
            // 하단 search안에 파라미터의 정규식 작업을 한다면 초성검색도 가능함.
            // ex) ㅎㄱ 타이핑시 한글문서가 나오게끔도 할수 있음

            if (codeValue == 'NOT_FOUND_DATA' || compareValue.includes(fieldValue)) {
                return true;
            } else {
                return false;
            }
        });


        // 검색된결과값이 없을때 보여주는 메시지
        if (field.getStore().getCount() == 0) {

            var displayField = field.displayField;
            var valueField = field.valueField;
            var temp = {};

            temp[displayField] = '조회된 데이터가 존재하지 않습니다.';
            temp[valueField] = 'NOT_FOUND_DATA';

            field.getStore().add(temp);
        }
        field.expand();
    },
    validator: function (val) {
        var me = this.combo;

        if (me.allowBlank) {
            return true;
        }

        return Ext.isEmpty(me.getValue()) ? me.blankText : true;
    },
    onTriggerClick: function (e) {
        var me = this.combo;
        if (me.isExpanded) {
            me.collapse();
        } else {
            me.expand();
        }
    }
});