Ext.define('PmhTech.util.Router', {

  statics: {
    _action: null,

    setAction: function (action) {
      var me = this;
      me._action = action;
    },

    redirect: function () {

      var me = this;
      me._action(location.hash);

    },
    initialize: function () {

      var me = this;

      if (!Ext.isFunction(me._action)) {
        alert('beforeAction  미지정되었습니다.')
      }


      if (window.addEventListener) {
        window.addEventListener('hashchange', function () {
          me.redirect();

        });
      } else {
        window.attachEvent('onhashchange', function () {
          me.redirect();
        });
      }
    }

  }
});