Ext.define('PmhTech.JSON', {
    extend: 'Ext.Base',
    statics: {
        /**
         * /**
         * 해당패널의 내용만 인쇄한다.
         * @param { JSON | Array} Parsing하고자 하는 JSON Array 또는 JSON
         * @returns {string} Enconding JSON String
         */
        encode: function (records) {
            if (!Ext.isArray(records)) {
                records = [records];
            }

            // 배열의 시작 [
            var jsonStr = '[';
            for (var i = 0; i < records.length; i++) {
                var record = records[i];

                // 배열이 큰경우 한건씩 encode 시켜서 jsonStr 추가
                jsonStr += Ext.JSONencode(record.data);
                if (records.length - 1 != i) {
                    jsonStr += ',';
                }
            }
            //배열의 종료 ]
            jsonStr += ']';
            return jsonStr;
        },
        deepEquals: function (o1, o2) {
            var k1 = Object.keys(o1).sort();
            var k2 = Object.keys(o2).sort();
            if (k1.length != k2.length) return false;
            return k1.zip(k2, function (keyPair) {
                if (typeof o1[keyPair[0]] == typeof o2[keyPair[1]] == "object") {
                    return deepEquals(o1[keyPair[0]], o2[keyPair[1]])
                } else {
                    return o1[keyPair[0]] == o2[keyPair[1]];
                }
            }).all();
        }
    }
});