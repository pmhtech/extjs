/**
 *
 */
Ext.define('PmhTech.override.form.field.vtype.Character',{
   override : 'Ext.form.field.VTypes',
    /**
     *  코드용 - 숫자,영어 대문자, - 만 입력가능
     *  vtype : engOnly
     * @param value
     * @param field
     * @returns {Boolean}
     */
    codeOnly: function (value, field) {
        return /^[0-9|A-Z]+$/.test(value);
    },
    codeOnlyText :'영문대문자와 숫자만 입력가능합니다.' ,


    /**
     *  영문만 입력가능
     *  vtype : engOnly
     * @param value
     * @param field
     * @returns {Boolean}
     */
    engOnly: function (value, field) {
        return /^[a-z|A-Z]+$/.test(value);
    },
    engOnlyText :'영문과 공백만 입력가능합니다.' ,

    /**
     *  한글만 입력가능
     *  vtype : korOnly
     * @param value
     * @param field
     * @returns {Boolean}
     */
    korOnly: function (value, field) {
        return true;/^[a-z|A-Z]+$/.test(value);
    },
    korOnlyText :'한글만 입력가능합니다.',

    /**
     *  한글,영문,숫자,공백만 입력가능
     *  vtype : engKorNumberSpaceOnly
     * @param value
     * @param field
     * @returns {Boolean}
     */
    engKorNumberSpaceOnly: function (value, field) {
        return /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9\ ]+$/.test(value);
    },
    engKorNumberSpaceOnlyText : '한글/영문/숫자/공백만 입력가능합니다.'
});