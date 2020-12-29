<template>
  <v-dialog
      v-model="dialog"
      width="700"
      @click:outside="dialog = false"
  >

    <v-card>
      <v-card-title class="headline">
        Update Invoice
      </v-card-title>

      <v-card-text>
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
          <form @submit.prevent="submit">
            <validation-provider
                v-slot="{ errors }"
                name="School name"
                rules="required|max:100"
            >
              <v-text-field
                  v-model="invoice.school_name"
                  :error-messages="errors"
                  label="School name"
              ></v-text-field>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                name="Description"
                rules="required|max:5000"
            >
              <v-textarea
                  v-model="invoice.description"
                  :error-messages="errors"
                  label="Description"
              ></v-textarea>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                name="Amount"
                rules="required|max:100|min:0"
            >
              <v-text-field
                  v-model="invoice.amount"
                  :error-messages="errors"
                  label="Amount"
                  type="number"
                  step="0.01"
                  min="0"
              ></v-text-field>
            </validation-provider>
          </form>
        </validation-observer>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            small
            text
            @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
            color="success"
            small
            @click="submit"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate'
import { required, max, min } from 'vee-validate/dist/rules';

extend('required', required);
extend('min', min);
extend('max', max);

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      invoice: {
        school_name: null,
        description: null,
        amount: null
      },
      dialog: false
    }
  },

  methods: {
    ...mapActions(['UPDATE_INVOICE', 'SHOW_INVOICE']),
    submit() {
      this.UPDATE_INVOICE({data: this.invoice, id: this.id}).then(() => {
        this.$emit('update:opened', false);
      }).catch(( { response } ) => {
        if(response.status === 422) this.processValidation(response.data.errors)
        else this.dialog = false;
      });
    }
  },
  watch: {
    dialog: function (newVal) {
      this.$emit('update:opened', newVal)
    },
    opened: function (newVal) {
      this.dialog = newVal;
    },
    id: function (newVal) {
      this.SHOW_INVOICE(newVal).then(({ data }) => {
        this.invoice = data.data;
      })
    }
  }
}
</script>

<style scoped>

</style>