Ext.define('PmhTech.util.ValidUtil', {
    requires : [
        'PmhTech.util.GridUtil'
    ],
    statics: {
    
        /**
         * @private
         * @param {Array} Ext.form.field.Base
         * @return {Object} Prototype으로 리턴합니다. obj.errorField, obj.errorMessage
         *
         *  사용법은 다음과 같습니다.
         *  아래코드 사용시 column내부의 editor들의 Validation을 가져오고 오류 발생시 가장 첫번째 editor로 focus됩니다.
         *
         *	rowEditPlugin.addListener('validateedit', function(editor, context, eOpts) {
         *
         *		if(!PmhTech.util.ValidateUtil.isValidGridEditor(this)){
         *  		return false;
         * 		}
         *	});
         */
        getFieldsErrorMessage : function(arrField){
            var returnObj = new Object();
            returnObj.errorMessage=null;
            returnObj.errorField = null;

            var arrErrorMessage = new Array();

            for(var i=0;i<arrField.length;i++){
                var errObj =null;
                if(Ext.isEmpty(arrField[i].getValue())){
                   /**
                    * Ext.form.field.Base를 상속받는 모든객체는 getErrors()라는것이 존재합니다.
                    */
                    errObj = arrField[i].getErrors();
                }else{
                    errObj = arrField[i].getErrors(arrField[i].getValue());
                }
                //errObj의 목적은 에러메시지 띄운이후 해당 Field로 focus가 자동으로 이루어지게 하기위해서 만들었습니다.
                if(!Ext.isEmpty(errObj)){
                    
                    arrErrorMessage.push(errObj[0]);

                    if(arrErrorMessage.length==1){
                        returnObj.errorField = arrField[i];
                    }
                }

            }

            // 에러필드가 존재하지 않으면 null 리턴을합니다.
            if(Ext.isEmpty(returnObj.errorField)){
                return null;
            }

            returnObj.errorMessage = arrErrorMessage.join('<br>').toString();
            return returnObj;

        },
    
        /**
         * @public
         * RowEditingPlugin 사용시 그리드의 데이터 Validation
         * @param {Ext.grid.Panel}
         * @return {boolean} 오류 발생시 return false
         *
         *  사용법은 다음과 같습니다.
         *  아래코드 사용시 column내부의 editor들의 Validation을 가져오고 오류 발생시 가장 첫번째 editor로 focus됩니다.
         *
         *	rowEditPlugin.addListener('validateedit', function(editor, context, eOpts) {
         *
         *		if(!PmhTech.util.isValidGridEditor(this)){
         *  		return false;
         * 		}
         *	});
         */
        isValidGrid : function(grid){
            var arrEditor = PmhTech.util.GridUtil.getGridEditor(grid);
            var returnObj = this.getFieldsErrorMessage(arrEditor);

            if(Ext.isEmpty(returnObj)){
                return true;
            }
            Ext.Msg.alert('오류',returnObj.errorMessage,function(){
                returnObj.errorField.focus();
            });

            return false;
        },
            
        /**
         * @public
         * Form Validation 
         * @param {Ext.form.Panel}
         * @return {boolean} 오류 발생시 false 없으면 true
         *
         */
        isValidForm: function(formPanel) {

            var basicForm = formPanel.getForm();

            if(basicForm.isValid()){
                return true;
            }
            var arrField = basicForm.getFields().items;

            var returnObj = this.getFieldsErrorMessage(arrField);


            if(Ext.isEmpty(returnObj)){
                return true;
            }
            Ext.Msg.alert('오류',returnObj.errorMessage,function(){
                returnObj.errorField.focus();
            });

            return false;

        }
        
        
    }
});

       