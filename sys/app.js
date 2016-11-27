/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'SysApp',
    extend: 'Ext.app.Application',
    controllers: [
        'SysApp.controller.AjaxUtil',
        'SysApp.controller.ajax.UserMst',
        'SysApp.controller.menu.MenuController'
    ],
    requires: [
        'SysApp.view.global.GlobalMain'
    ],
    stores: [
        'SysApp.store.Navigation',
        'SysApp.store.FieldType'
    ],

    launch: function () {
        LoginController = SysApp.controller.LoginController;
        AjaxUtil = SysApp.controller.AjaxUtil;
        SysCode = {};
        Ext.create('SysApp.view.login.LoginForm');
    }
});