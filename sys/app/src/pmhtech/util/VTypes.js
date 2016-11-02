Ext.define('PmhTech.util.VTypes', {

  init: function () {
    var me = this;

    Ext.apply(Ext.form.field.VTypes, {

      /**
       * 서브네팅가능한 IP
       *
       * vtype : netIpAddress
       *
       * @param value
       * @param field
       * @returns {boolean}
       */
      netIpAddress: function (value, field) {
        me.netIpAddressText = '0.0.0.0 ~ 255.255.255.255 범위내의 IP만 입력가능합니다.';
        me.netIpAddressMask = /[\d\.]/i;
        return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(v);
      },


      /**
       * 서브네팅가능한 IP
       *
       * vtype : IpAddress
       *
       * @param value
       * @param field
       * @returns {boolean}
       */
      ipAddress: function (value, field) {

        me.ipAddressText = '1.0.0.0 ~ 254.255.255.255 범위내의 IP만 입력가능합니다.';
        me.ipAddressMask = /[\d\.]/i;
        return /^(([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])\.)(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){2}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value);
      },


      /**
       *  영문만 입력가능
       *  vtype : engOnly
       * @param value
       * @param field
       * @returns {boolean}
       */
      engOnly: function (value, field) {
        var me = this;
        me.engOnlyText = '영문과 공백만 입력가능합니다.';
        return /^[a-z|A-Z]+$/.test(value);
      },

      /**
       *  한글만 입력가능
       *  vtype : korOnly
       * @param value
       * @param field
       * @returns {boolean}
       */
      korOnly: function (value, field) {
        var me = this;
        me.korOnlyText = '한글만 입력가능합니다.';
        return /^[a-z|A-Z]+$/.test(value);
      },

      /**
       *  한글,영문,숫자,공백만 입력가능
       *  vtype : engKorNumberSpaceOnly
       * @param value
       * @param field
       * @returns {boolean}
       */
      engKorNumberSpaceOnly: function (value, field) {
        me.engKorNumberSpaceOnlyText = '한글/영문/숫자/공백만 입력가능합니다.';
        return /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9\ ]+$/.test(value);
      }
    });
  }
});