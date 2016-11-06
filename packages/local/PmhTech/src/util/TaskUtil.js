/**

 사용가이드

 최초 app.js 상에서


 GlobalTask와 StaticTask란 ??

 GlobalTask : App 전체적으로 광역적으로 써야하는경우
 StaticTask : 특정화면에서 종속적으로 써야하는경우

 stopAllTask : StaticTask 전체 실행중지 : Ext.Route beforehandler에 정의하면 될것같음..


 PmhTech.util.TaskUtil.setStaticTask({
 		'STACK1_TASK' : null,
 		'STACK2_TASK' : null,
 		'STACK3_TASK' : null,
 });

 PmhTech.util.TaskUtil.setGlobalTask({
 		'GLOBAL1_TASK' : null,
 		'GLOBAL2_TASK' : null,
 		'GLOBAL3_TASK' : null,
 });

 PmhTech.util.TaskUtil.initTask();


 왜 이름을 미리 등록하고 사용하냐면... 태스크 타이핑 실수를 방지하기 위하여 정의하였습니다.
 실제로.. 스케줄러이름 잘못 만들어서 계속 만들거나 제어가 안되면 App이 죽습니다.(메모리초과로 인하여)
 물론 이런버그는 찾기 진짜힘들어요...



 //매 3초마다 실행하는 Task 등록
 PmhTech.util.TaskUtil.registerTask('STACK1_TASK',function(){ console.log('AAAA)},this,3000);


 //태스크시작
 PmhTech.util.TaskUtil.start('STACK1_TASK');

 //태스크중지
 PmhTech.util.TaskUtil.stop('STACK1_TASK');


 // GlobalTask 를 제외한 모든 Task멈춤
 PmhTech.util.TaskUtil.stopAllTask();



 */
Ext.define('PmhTech.util.TaskUtil', {

    statics: {

        /**
         * @public
         * StaticTask 초기화함수
         * @param {Object} 사용할 StaticTask  task : null 형태로 저장
         * @return {String} 해당 task의 종류
         *
         */
        setStaticTask: function (staticTask) {
            this.StaticTask = staticTask;
        },

        /**
         * @public
         *  GlobalTask 초기화함수
         * @param {Object} 사용할 StaticTask  task : null 형태로 저장
         * @return {String} 해당 task의 종류
         *
         */
        setGlobalTask: function (globalTask) {
            this.GlobalTask = globalTask;
        },

        initTask: function () {

            if (Ext.isEmpty(this.StaticTask) && Ext.isEmpty(this.GlobalTask)) {
                alert('Task가 생성되지 않았습니다');
            }
        },

        /**
         * @private
         *  Task 타입 가져오기
         * @param {String} taskName task 이름
         * @return {String} 해당 task의 종류
         *
         */
        getTaskType: function (taskName) {
            if (this.StaticTask[taskName] === undefined && this.GlobalTask[taskName] === undefined) {
                return null;
            }
            return this.StaticTask[taskName] === undefined ? 'GlobalTask' : 'StaticTask';
        },

        /**
         * @public
         *  Task 생성
         * @param {String} taskName Task 이름
         * @param {String} taskFunction 생성 콜백 함수
         * @param {String} scope 콜백 함수 scope
         * @param {String} delay task 수행 주기
         *
         */
        createTask: function (taskName, taskFunction, scope, delay) {

            if (this.StaticTask === undefined) {
                this.initTask();

            }
            var taskType = this.getTaskType(taskName);
            if (Ext.isEmpty(taskType)) {
                alert(taskName + '은 정의되지 않은 Task입니다.');
                return;
            } else if (this[taskType][taskName] !== null) {
                var task = this[taskType][taskName];
                Ext.util.TaskManager.stop(task);
            }

            var task = Ext.util.TaskManager.newTask({
                run: taskFunction,
                interval: Ext.isEmpty(delay) ? 5000 : delay,
                scope: scope
            });
            console.log('CREATE TASK : ' + taskName);
            this[taskType][taskName] = task;
        }
        ,

        /**
         * @public
         *  Task 삭제
         * @param {String} taskName Task 이름
         *
         */
        removeTask: function (taskName) {
            var taskType = this.getTaskType(taskName);
            if (Ext.isEmpty(this[taskType][taskName])) {
                this[taskType][taskName].stop();
            }
            this[taskType][taskName] = null;
        }
        ,

        /**
         * @public
         *  Task 시작
         * @param {String} taskName Task 이름
         * @param {Boolean} 시작 여부
         *
         */
        startTask: function (taskName) {
            var taskType = this.getTaskType(taskName);
            if (!Ext.isEmpty(this[taskType][taskName])) {
                var task = this[taskType][taskName];
                Ext.util.TaskManager.start(task);
                console.log('TASK START : ' + taskName);
                return true;
            }
            return false;
        }
        ,

        /**
         * @public
         *  Task 멈춤
         * @param {String} taskName Task 이름
         * @param {Boolean} 시작 여부
         *
         */
        stopTask: function (taskName) {
            var taskType = this.getTaskType(taskName);

            if (!Ext.isEmpty(this[taskType][taskName])) {
                var task = this[taskType][taskName];
                Ext.util.TaskManager.stop(task);
                console.log('TASK STOP : ' + taskName);
                return true;
            }
            return false;
        }
        ,

        /**
         * @public
         * global task를 제외한 모든 Task 멈춤
         */
        stopAllTask: function () {
            var me = this;
            Ext.iterate(this.StaticTask, function (key, value) {
                if (!Ext.isEmpty(value)) {
                    me.stopTask(key);
                }
            });
        }
        ,

        /**
         * @public
         *  Task 등록
         *  화면 이동시 실행/멈춤 관리가 병행된다
         * @param {String} taskName Task 이름
         * @param {String} taskFunction 생성 콜백 함수
         * @param {String} scope 콜백 함수 scope
         * @param {String} delay task 수행 주기
         */
        registerTask: function (taskName, taskFunction, scope, delay) {
            var me = scope;

            var TaskUtil = this;

            TaskUtil.createTask(taskName, taskFunction, me, delay);

            if (this.getTaskType(taskName) == 'StaticTask') {
                me.addListener('afterlayout', function (component) {
                    TaskUtil.startTask(taskName);
                });
                me.addListener('deactivate', function (component) {
                    TaskUtil.stopTask(taskName);
                });
            }
        }
    }
});