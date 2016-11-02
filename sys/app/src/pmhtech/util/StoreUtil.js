Ext.define('PmhTech.util.StoreUtil', {
    statics: {
        convertListToTree: function (arrayList, id, parentId, rootId) {

            var rootNodes = [];
            var traverse = function (nodes, item, index) {
                if (nodes instanceof Array) {
                    return nodes.some(function (node) {
                        if (node[id] === item[parentId]) {
                            node.children = node.children || [];
                            return node.children.push(arrayList.splice(index, 1)[0]);
                        }

                        return traverse(node.children, item, index);
                    });
                }
            };

            while (arrayList.length > 0) {
                arrayList.some(function (item, index) {
                    if (item[parentId] === rootId) {
                        return rootNodes.push(arrayList.splice(index, 1)[0]);
                    }

                    return traverse(rootNodes, item, index);
                });
            }

            return rootNodes;
        },
        /**
         * @public
         * 반드시 afterrender 이벤트내에 서술
         * 해
         * @param {Ext.data.Store}
         */
        setAutoSyncStore: function (store) {

            /**
             * 기존의 store가 autoSync라면 사용안함으로 세팅
             */
            store.autoSync = false;
            store.addListener('update', function (thisStore, record, operation, modifiedFieldNames) {

                if (operation == 'edit') {

                    /**
                     Ext.data.Store의 suspendAutoSync를 대체
                     suspendPmhAutoSync가 true이면 AutoSync가 일시적으로 작동안됨
                     */
                    if (thisStore.suspendPmhAutoSync != true) {
                        thisStore.sync();
                    }
                    thisStore.commitChanges();
                }
            });

            store.addListener('remove', function (thisStore, record, index, isMove, eOpts) {
                if (thisStore.suspendPmhAutoSync != true) {
                    thisStore.sync();
                }
                thisStore.commitChanges();
            });

            store.addListener('add', function (thisStore, records, index) {
                if (thisStore.suspendPmhAutoSync != true) {
                    thisStore.sync();
                }
                thisStore.commitChanges();
            });
            store.addListener('write', function (thisStore, records, index) {


                /**
                 * Store의 write이벤트는 정상적으로 백엔드에서 HttpStatus가 정상처리(200,201)되었을때 실행되는 이벤트
                 * 매우 중요 !!!
                 *
                 * 기존 autoSync는 파라미터를 넣지 못하는 구조라서 아래의 코드가 반드시 필요 이런식으로 구현할경우
                 * 그냥 grid.store.load()라 하면 파라미터가 Injection되어서 자동으로 호출이 이루어집니다.
                 *
                 * rowEditPlugin.addListener('beforeload',(store, operation, eOpts){
                *
                *
                *   // 파라미터가 있는지 체크후 강제로 parameter가 존재하지 않는경우
                *   // 현재 로드이벤트는 무시하고 파라미터를 강제로 넣어서 다시로드시킴
                *       if(Ext.isEmpty(store.lastOptions.params) || Ext.isEmpty(store.lastOptions.params.EMP_ID)){
                *
                *           store.load({params:{
                *               'PK1': rec.get('PK1'),
                *               'PK2' : rec.get('PK2')
                *           }});
                *			//return이 false이면 load가 발생이 안되므로 파라미터가 없이는 호출이 불가능하게끔 구현
                *           return false;
                *       }
                *   });
                 *
                 *
                 *
                 *
                 */
                thisStore.load();
            });
        },
        /**
         * @public
         * autoSync를 사용하는데 grid를 초기화 시키고 싶을경우
         * autoSync가 true상태에서 removeAll을 시키면 store.api.destroy가 호출되므로 그점을 방지
         *
         * @param {Ext.grid.Panel} 초기화시킬 grid추가
         */
        removeAllOnly: function (store) {
            store.suspendPmhAutoSync = true;
            if (store.autoSync === true) {
                store.suspendAutoSync();
            }
            store.removeAll(false);
            if (store.autoSync === true) {
                store.resumeAutoSync();
            }
            store.suspendPmhAutoSync = false;
        }
    }
});