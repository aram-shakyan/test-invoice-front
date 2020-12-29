<template>
  <v-col cols="12">
    <v-col offset="3" cols="6">
      <v-card>
        <v-card-title class="headline">
          Pay Invoice
        </v-card-title>

        <v-card-text>
          <validation-observer
              ref="observer"
              v-slot="{ invalid }"
          >
            <form @submit.prevent="submit">
              <validation-provider
                  name="school_name"
              >
                <v-text-field
                    v-model="invoice.school_name"
                    label="School name"
                    disabled
                ></v-text-field>
              </validation-provider>

              <validation-provider
                  name="description"
              >
                <v-textarea
                    v-model="invoice.description"
                    label="Description"
                    disabled
                ></v-textarea>
              </validation-provider>

              <validation-provider
                  name="amount"
              >
                <v-text-field
                    v-model="invoice.amount"
                    label="Amount"
                    disabled
                ></v-text-field>
              </validation-provider>

              <validation-provider
                  name="name"
              >
                <v-text-field
                    v-model="invoice.name"
                    label="Full Name"
                    disabled
                ></v-text-field>
              </validation-provider>
            </form>
          </validation-observer>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="success"
              @click="submit"
          >
            PROCESS
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-col>
</template>

<script>
import {mapActions} from 'vuex';
import {ValidationObserver, ValidationProvider} from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      invoice: {
        school_name: null,
        description: null,
        amount: null,
        name: null
      },
      dialog: false
    }
  },
  created() {
    this.SHOW_INVOICE(this.$route.params.id).then(({data}) => {
      this.invoice = {...data.data, ...{ name: this.AUTH_USER.name }};
    }).catch(() => {
      this.$router.push({ name: 'Error404' })
    })
  },
  methods: {
    ...mapActions(['SHOW_INVOICE', 'PROCESS_PAYMENT']),
    submit() {
      this.PROCESS_PAYMENT(this.$route.params.id).then((res) => {
        this.$router.push({ name: 'Home' });
      });
    }
  }
}
</script>

<style scoped>

</style>