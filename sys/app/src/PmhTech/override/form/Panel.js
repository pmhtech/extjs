/**
 *
 */
Ext.define('Samjong.override.form.Panel', {
    override: 'Ext.form.Panel',
	plugins : [{
		ptype : 'pmh-form-validator'
	},{
		ptype : 'pmh-form-dirtychecker'
	},{
		ptype : 'pmh-form-readonly'
	}]
});