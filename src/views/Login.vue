<template>
  <v-col offset="3" cols="6">
    <v-card rounded>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
          <form @submit.prevent="submit">
            <validation-provider
                v-slot="{ errors }"
                vid="email"
                name="Email"
                rules="required|email"
            >
              <v-text-field
                  v-model="auth.email"
                  :error-messages="errors"
                  label="E-mail"
              ></v-text-field>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                vid="password"
                name="Password"
                rules="required|min:6"
            >
              <v-text-field
                  v-model="auth.password"
                  :error-messages="errors"
                  label="Password"
                  type="password"
              ></v-text-field>
            </validation-provider>

            <v-btn
                class="mr-4"
                type="submit"
                color="info"
            >
              submit
            </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-col>
</template>


<script>
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules';

extend('required', required);
extend('email', email);
extend('min', min);

import { mapActions } from "vuex";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      auth: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    submit() {
      this.$refs.observer.validate().then((isValid) => {
        if(isValid) {
          this.LOGIN(this.auth).then(() => {
            this.$router.push({ name: 'Home' })
          }).catch(( { response } ) => {
            if(response.status === 422) this.processValidation(response.data.errors)
          });
        }
      });
    }
  },
}
</script>