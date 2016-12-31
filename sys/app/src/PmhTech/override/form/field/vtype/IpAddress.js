/**
 *
 */
Ext.define('PmhTech.override.form.field.vtype.IpAddress',{
   override : 'Ext.form.field.VTypes',

    /**
     * IP주소
     *
     * vtype : IpAddress
     *
     * @param value
     * @param field
     * @returns {Boolean}
     */
    ipAddress: function (value, field) {
        ipAddressMask = /[\d\.]/i;
        return /^(([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])\.)(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){2}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value);
    },
    ipAddressText :'1.0.0.0 ~ 254.255.255.255 범위내의 IP만 입력가능합니다.',
    ipAddressMask :/[\d\.]/i,


    /**
     * 서브네팅가능한 IP
     *
     * vtype : IpAddress
     *
     * @param value
     * @param field
     * @returns {Boolean}
     */
    netIpAddress: function (value, field) {
        return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(v);
    },
    netIpAddressText :'0.0.0.0 ~ 255.255.255.255 범위내의 IP만 입력가능합니다.',
    netIpAddressMask : /[\d\.]/i
});