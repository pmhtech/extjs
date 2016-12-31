/**
 *
 */
Ext.define('PmhTech.override.form.field.Date', {
    override: 'Ext.form.field.Date',
    submitFormat : 'Ymd',
    format : 'Ymd',
    altFormats : 'Ymd|Y-m-d|Y.m.d|Y/m/d'


});