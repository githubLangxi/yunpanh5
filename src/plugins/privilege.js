import Vue from 'vue';

export default {
    install(Vue, options) {
        if (!window.GLOBAL_USER_ACTIONS && localStorage.GLOBAL_USER_ACTIONS) {
            window.GLOBAL_USER_ACTIONS = JSON.parse(localStorage.GLOBAL_USER_ACTIONS);
        }
        Vue.directive("privilege", {
            bind: function (el, binding) {
                var actions = window.GLOBAL_USER_ACTIONS || [];
                for (var i = 0, count = actions.length; i < count; i++) {
                    if (actions[i] == binding.value) {
                        return;
                    }
                }

                el.style.display = "none";
            }
        });
    },

    reset() {
        delete window.GLOBAL_USER_ACTIONS;
        localStorage.removeItem("GLOBAL_USER_ACTIONS");
    }
}