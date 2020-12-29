<template>
  <v-dialog
      v-model="dialog"
      max-width="400"
      @click:outside="dialog = false"
  >
    <v-card>
      <v-card-title class="headline">
        Are you sure want to delete?
      </v-card-title>
      <v-card-text>if you delete this invoice it will be deleted permanently.</v-card-text>
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
            small
            color="success"
            @click="deleteSubmit"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

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
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapActions(['DELETE_INVOICE']),
    deleteSubmit() {
      if(this.id) this.DELETE_INVOICE(this.id);
      this.dialog = false;
    }
  },
  watch: {
    dialog: function (newVal) {
      this.$emit('update:opened', newVal)
    },
    opened: function (newVal) {
      this.dialog = newVal;
    },
  }
}
</script>

<style scoped>

</style>