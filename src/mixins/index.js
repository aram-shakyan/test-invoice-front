import Vue from 'vue';
import { mapGetters } from 'vuex';

Vue.mixin({
    methods: {
        hasPermission(...permissions) {
            let foundPermission = -1;
            if(this.IS_AUTHENTICATED && this.AUTH_USER.permissions) {
                foundPermission = this.AUTH_USER.permissions.findIndex((item) => permissions.indexOf(item.toLowerCase()) > -1)
            }

            return foundPermission > -1;
        },
        processValidation(errors) {
            this.$refs.observer.setErrors(errors);
        }
    },
    computed: {
        ...mapGetters(["AUTH_USER", "IS_AUTHENTICATED"])
    }
})
