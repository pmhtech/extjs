/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'SysApp',
    extend: 'Ext.app.Application',
    paths: {
        'PmhTech': './app/src/pmhtech'
    },
    controllers: [
        'SysApp.controller.AjaxUtil',
        'SysApp.controller.ajax.SysCode',
        'SysApp.controller.ajax.UserMst',
        'SysApp.controller.menu.MenuController'
    ],
    requires: [
        'PmhTech.util.StoreUtil',
        'SysApp.view.global.GlobalMain',
        'PmhTech.form.field.ComboBox',
    ],
    stores: [
        'SysApp.store.Navigation'
    ],

    launch: function () {
        LoginController = SysApp.controller.LoginController;
        AjaxUtil = SysApp.controller.AjaxUtil;

        PmhTech.serverUrl = 'http://localhost:8080';

        Ext.create('SysApp.view.login.LoginForm');



        /*Ext.define('SysApp.view.common.Dimension', {
         extend: 'Ext.form.field.Picker',
         alias: 'widget.common_dimension',
         requires: [
         'Ext.tree.Panel',
         'Ext.grid.column.Check',
         'Ext.grid.plugin.BufferedRenderer'
         ],

         matchFieldWidth: false,
         enableKeyEvents: true,
         displayField: null,
         valueField: null,
         rendererField: null,
         delimiterField: null,
         sortByName: false,
         delimiterDisplayField: null,
         jsonRepo: null,
         groupCodes: [],
         searchField: null,
         compareFunc: null,
         emptyTempText: null,
         checkItems: [],



         dataSort : function(){
         var me = this;
         var defaultSortPrefix = [
         {
         property: 'GCDCODE',
         direction: 'ASC'
         },{
         property: 'isGroup',
         direction: 'DESC'
         }];

         var defaultSortSuffix = [
         {
         property: 'CDCODE',
         direction: 'ASC'
         }];

         if(me.sortByName){
         defaultSortPrefix.push({
         property: me.displayField,
         direction: 'ASC'
         });
         }

         var defaultSort = defaultSortPrefix.concat(defaultSortSuffix);

         me.getPicker().getStore().sort(defaultSort);

         },
         insertDelimiter: function (field,result) {

         if(Ext.isEmpty(field.delimiterField)){
         return result;
         }

         var groupCode = null;
         var totCount=result.length;
         for (var i = 0; i < totCount; i++) {
         var data = Ext.decode(JSON.stringify(result[i]));
         if (groupCode != data[field.delimiterField]) {
         data.isGroup = true;
         data[field.valueField] = data[field.delimiterField];
         data[field.displayField] = data[field.delimiterDisplayField];
         result = Ext.Array.insert(result,i,[data]);
         i++;
         totCount++;
         groupCode = data[field.delimiterField];
         }
         }
         return result;
         },

         getFilteredData: function (field, snapShot) {

         var me = this;

         var groupCode = field.delimiterField;
         var compareValues = field.groupCodes;

         var selected = me.checkItems;
         var inputValue = field.getValue();

         if (!Ext.isEmpty(inputValue)) {
         inputValue = inputValue.toLocaleLowerCase();
         }
         var result = JSLINQ(snapShot)
         .Where(function (item) {

         //이미 선택되어있는 항목 무조건 true
         item['isChecked'] = false;
         var compareValue = item[field.displayField].toLocaleLowerCase();
         for (var i = 0; i < selected.length; i++) {
         var data = selected[i];


         if (data[field.valueField] == item[field.valueField] &&
         data[field.displayField] == item[field.displayField]
         ) {
         item['isChecked'] = true;
         return true;
         }
         }

         //상위그룹선택안하고 입렵값없을때 무조건 false
         if (Ext.isEmpty(inputValue) && field.allowBlankFilter === true) {
         return true;
         }


         //상위그룹선택안하고 입렵값없을때 무조건 false
         if (Ext.isEmpty(inputValue) && compareValues.length == 0) {
         return false;
         }

         var compareFuncMatch = true;
         var groupCodeMatch = compareValues.length == 0;


         var nameMatch = false;
         var codeMatch = false;

         // 외부조건 일치하는지
         if (Ext.isFunction(field.compareFunc)) {
         compareFuncMatch = field.compareFunc(item, compareValues[i]);
         }

         //그룹코드와 일치 하는지
         for (var i = 0; i < compareValues.length; i++) {
         if (item[groupCode] == compareValues[i]) {
         groupCodeMatch = true;
         }
         }

         //입력문자열과 이름이 일치하는지
         nameMatch = compareValue.search(inputValue) != -1;

         var codeField = field.rendererField;

         if (codeField == null) {
         codeField = field.valueField;
         }

         var codeValue = item[codeField];
         if (Ext.isFunction(field.codeRendererFunc)) {
         codeValue = field.codeRendererFunc(item);
         }
         codeValue = Ext.isEmpty(codeValue) ? codeValue : codeValue.toLocaleLowerCase();
         //입력문자열과 표시되는 코드와 일치하는지
         codeMatch = codeValue.search(inputValue) != -1;

         return compareFuncMatch && groupCodeMatch && (nameMatch || codeMatch);


         })
         .OrderBy(function (item) {
         return item[groupCode];
         })
         .ToArray();
         return result;
         },


         filterByFullScan: function (field) {
         var fieldStore = field.getPicker().getStore();
         var snapShot = eval(field.oriStore).snapShot;
         var arrRemove = [];

         Ext.Array.each(field.checkItems, function (checkItem) {

         var checkCode = checkItem[field.delimiterField];
         var isExist = false;
         for (var j = 0; j < field.groupCodes.length; j++) {
         if (field.groupCodes[j] == checkCode) {
         isExist = true;
         break;
         }
         }
         if (!isExist) {

         arrRemove.push(checkItem);
         }
         });

         for (var i = 0; i < arrRemove.length; i++) {
         Ext.Array.remove(field.checkItems, arrRemove[i]);
         }

         var result = this.getFilteredData(field, snapShot);
         field.snapShot = result;
         fieldStore.removeAll();
         var datas = Ext.Array.clone(result);
         datas = this.insertDelimiter(field,datas);
         fieldStore.loadRawData(datas);
         },


         filterByGroupScan: function (field) {

         var fieldStore = field.getPicker().getStore();
         var snapShot = field.snapShot;


         if (field.groupCodes == 0) {
         field.checkItems = [];
         }

         var result = this.getFilteredData(field, snapShot);
         fieldStore.removeAll();
         var datas = Ext.Array.clone(result);
         datas = this.insertDelimiter(field,datas);
         fieldStore.loadRawData(datas);
         },

         initComponent: function () {
         var me = this;
         var oriStore = Ext.StoreMgr.lookup(me.store);

         if(!oriStore){
         oriStore = me.store;
         }

         me.emptyTempText = me.emptyText;

         //             me.addEvents('dimension_change');

         me.addListener('expand', function (field, e) {


         if (field.getValue().length <= 2) {
         var task = new Ext.util.DelayedTask(function () {
         if (field.beforeValue != field.getValue()) {
         field.beforeValue = field.getValue();
         //   me.groupCodes.length == 0 ? me.filterByFullScan(field) : me.filterByGroupScan(field);
         }
         });
         task.delay(Ext.isEmpty(field.getValue()) ? 200 : 700);
         }


         });
         me.addListener('keyup', function (field, e) {
         if (me.collapsed) {
         me.expand();
         } else {
         me.fireEvent('expand', field);
         me.expand();
         me.focus(false, 200);
         }

         });
         me.codeRendererFunc = oriStore.codeRendererFunc;
         me.allowBlankFilter = oriStore.allowBlankFilter;

         var fieldStore = me.getPicker().getStore();
         fieldStore.displayField = oriStore.displayField;
         fieldStore.valueField = oriStore.valueField;
         fieldStore.rendererField = oriStore.rendererField;
         fieldStore.delimiterField = oriStore.delimiterField;

         fieldStore.delimiterDisplayField = oriStore.delimiterDisplayField;

         me.addListener('collapse', function (field) {

         var searchStore = me.getPicker().getView(0).getStore();
         me.checkItems = [];
         for (var i = 0; i < searchStore.getCount(); i++) {
         var data = searchStore.getAt(i).copy().data;
         if (data.isChecked === true) {
         me.checkItems.push(data);
         }
         }
         me.fireEvent('dimension_change', field);
         });


         var searchStore = me.getPicker().getView().getStore();
         fieldStore.on('update', function (thisStore, record, operator, modfiedFieldNames) {

         if (Ext.isArray(modfiedFieldNames)) {

         if (operator == Ext.data.Model.EDIT && modfiedFieldNames[0] == 'isChecked') {

         var modifiedRecords = thisStore.getModifiedRecords();
         for (var i = 0; i < modifiedRecords.length; i++) {
         var parentNode = modifiedRecords[i];
         var isChecked = parentNode.get('isChecked');
         var groupCode = this.delimiterField;

         if (Ext.isEmpty(groupCode)) {
         groupCode = this.rendererField;
         }

         if (modifiedRecords[i].get('isGroup')) {
         var findIdx = searchStore.find(groupCode, parentNode.get(groupCode));

         if (findIdx != -1) {
         for (var j = findIdx; j < searchStore.getCount(); j++) {
         var targetNode = searchStore.getAt(j);
         if (
         parentNode.get(groupCode) == targetNode.get(groupCode)

         ) {
         targetNode.set('isChecked', isChecked);
         }
         }
         searchStore.commitChanges();
         }
         }
         }
         }
         }
         }, me);
         me.callParent(arguments);
         },
         collapseIf: function (e) {
         return false;
         },
         createPicker: function () {
         var me = this;
         var oriStore = Ext.StoreMgr.lookup(me.store);

         var picker = Ext.create('Ext.grid.Panel', {
         pickerField: me,
         floating: true,
         width: 500,
         viewConfig: {
         enableTextSelection: false,
         stripeRows: true,
         markDirty: false
         },
         hidden: true,
         ownerCt: this.ownerCt,
         renderTo: document.body,
         store: oriStore,
         height: 200,
         columns: [
         {
         xtype: 'checkcolumn', dataIndex: 'isChecked', text: '&#160;',
         sortable: false,
         draggable: false,
         resizable: false,
         hideable: false,
         menuDisabled: true,
         width: 30,
         cls: Ext.baseCssPrefix + 'column-header-checkbox'
         },
         {

         text: '코드명',
         dataIndex: me.displayField,
         width: 250,
         renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
         var imgSrc ='"data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="';
         var groupIcons='<img src='+imgSrc+' role="presentation" class=" x-tree-icon x-tree-icon-parent ">';
         var contentIcons ='<img src='+imgSrc+' role="presentation" class=" x-tree-icon x-tree-icon-leaf ">'

         var elbow ='<img src='+imgSrc+' class=" x-tree-elbow-img x-tree-elbow" role="presentation">';

         if(record.get('isGroup')===true){
         return groupIcons +'&nbsp;&nbsp;'+value;
         }

         return elbow+contentIcons+'&nbsp;&nbsp;'+value;
         }
         }, {
         text: '코드', dataIndex: me.valueField, width: 90, renderer: function (value, metadata, record) {

         var valueField = me.rendererField == null ? me.valueField : me.rendererField;
         rendererValue = record.get(valueField);


         return rendererValue;
         }
         }
         ]
         });
         return picker;
         }
         ,
         getSubmitValue: function () {
         return this.getDimensionValue();
         },
         getGroupValues: function () {
         var me = this;
         var retValue = [];
         var selection = me.checkItems;
         var groupField = me.groupField;

         if (Ext.isEmpty(groupField)) {
         groupField = me.valueField;
         }

         for (var i = 0; i < selection.length; i++) {
         if (selection[i]['isGroup'] !== true) {
         retValue.push(selection[i][groupField]);
         }
         }
         return retValue;
         },
         getDimensionValue: function () {

         var me = this;
         var retValue = [];
         var selection = me.checkItems;

         for (var i = 0; i < selection.length; i++) {
         if (selection[i]['isGroup'] !== true) {
         retValue.push(selection[i][me.valueField]);
         }
         }
         return retValue;
         }
         });



         Ext.widget({
         xtype: 'common_dimension',
         renderTo : Ext.getBody(),
         name: 'hqId',
         emptyText: '본부',
         queryMode: 'local',
         store: Ext.create('Ext.data.Store', {
         fields : ['CODE','CDCODE','NAME'],
         data :   [
         {
         "CODE": "B099000000",
         "CDCODE": "B09900",
         "NAME": "유통사업부"
         },
         {
         "CODE": "B111090000",
         "CDCODE": "B11109",
         "NAME": "수도권마케팅1본부"
         },
         {
         "CODE": "B136690000",
         "CDCODE": "B13669",
         "NAME": "수도권마케팅2본부"
         },
         {
         "CODE": "B199690000",
         "CDCODE": "B19969",
         "NAME": "특수마케팅본부"
         },
         {
         "CODE": "B211320000",
         "CDCODE": "B21132",
         "NAME": "부산마케팅본부"
         },
         {
         "CODE": "B311320000",
         "CDCODE": "B31132",
         "NAME": "대구마케팅본부"
         },
         {
         "CODE": "B411550000",
         "CDCODE": "B41155",
         "NAME": "서부마케팅본부"
         },
         {
         "CODE": "B611680000",
         "CDCODE": "B61168",
         "NAME": "중부마케팅본부"
         },
         {
         "CODE": "Z000000001",
         "CDCODE": "Z000000001",
         "NAME": "ETC"
         }
         ]
         }),
         displayField: 'NAME',
         rendererField: 'CDCODE',
         valueField: 'CODE',
         toolTipField: 'CODE',
         editable: false
         });*/
    }
});