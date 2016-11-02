Ext.define('PmhTech.override.data.reader.JsonReader', {
    override: 'Ext.data.Reader',

    setDynamicField: function (keyData) {

        var me = this;
        var tempFields = me.model.getFields();
        var thisStoreFields = [];
        for (var i = 0; i < tempFields.length; i++) {
            tempField = tempFields[i];
            thisStoreFields.push({
                convert: tempField.convert,
                mapping: tempField.mapping,
                name: tempField.name,
                sortType: tempField.sortType,
                type: tempField.type
            });
        }


        var keyList = [];
        Ext.iterate(keyData, function (key, value) {

            var field = Ext.Array.findBy(thisStoreFields, function (item) {
                if (item.name == key) {
                    return item;
                }

            });

            if (Ext.isEmpty(field)) {
                keyList.push({name: key});
            }
        });

        if (me.model.superclass.$className == 'Ext.data.Model') {
            var tempModel = Ext.define(undefined, {extend: me.model.superclass.$className, fields: thisStoreFields.concat(keyList)});
            me.setModel(tempModel, me.proxy);
        }
    },
    /**
     * Returns extracted, type-cast rows of data.
     * @param {Object[]/Object} root from server response
     * @return {Array} An array of records containing the extracted data
     * @private
     */
    extractData: function (root) {
        var me = this;

        me.setDynamicField(root[0]);
        var length = root.length,
            records = new Array(length),
            dataConverter,
            convertedValues, node, record, i;
        var ModelClass = me.model;
        if (!root.length && Ext.isObject(root)) {
            root = [root];
            length = 1;
        }


        for (i = 0; i < length; i++) {
            node = root[i];
            if (node.isModel) {
                // If we're given a model instance in the data, just push it on
                // without doing any conversion
                records[i] = node;
            } else {

                // Create a record with an empty data object.
                // Populate that data object by extracting and converting field values from raw data.
                // Must pass the ID to use because we pass no data for the constructor to pluck an ID from
                records[i] = record = new ModelClass(undefined, me.getId(node), node, convertedValues = {});
                //record.data = record.raw;
                // If the server did not include an id in the response data, the Model constructor will mark the record as phantom.
                // We  need to set phantom to false here because records created from a server response using a reader by definition are not phantom records.
                record.phantom = false;


                // Use generated function to extract all fields at once
                me.convertRecordData(convertedValues, node, record);

                if (me.implicitIncludes && record.associations.length) {
                    me.readAssociated(record, node);
                }
            }
        }
        return records;
    }
});


