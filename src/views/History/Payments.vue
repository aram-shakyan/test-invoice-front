<template>
  <v-col cols="12">
    <v-col offset="1" cols="10">
      <v-card>
        <v-card-title>
          History Payments
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="PAYMENT_HISTORIES.data"
            item-key="name"
            class="elevation-1"
            hide-default-footer
        >
          <template v-slot:item.payed_at_human="{item}">
            {{ item.payed_at_human || 'N/A' }}
          </template>
        </v-data-table>
      </v-card>
      <v-pagination
          :length="PAYMENT_HISTORIES.last_page"
          :total-visible="7"
          v-model="activePage"
          class="mt-4"
      ></v-pagination>
    </v-col>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      headers: [
        { text: 'ID',  align: 'start',  sortable: false, value: 'id'},
        { text: 'School name',  align: 'start',  sortable: false, value: 'school_name'},
        { text: 'Description', sortable: false, value: 'description' },
        { text: 'Amount', sortable: false, value: 'amount' },
        { text: 'Payed At', sortable: false, value: 'payed_at_human', align: 'end'}
      ],
      activePage: 1
    }
  },
  methods: {
    ...mapActions(['GET_PAYMENT_HISTORIES'])
  },
  created() {
    this.GET_PAYMENT_HISTORIES().then((res) => {
      this.activePage = this.PAYMENT_HISTORIES.current_page;
    });
  },
  computed: {
    ...mapGetters(['PAYMENT_HISTORIES']),
  },
  watch: {
    activePage: function (newVal) {
      this.GET_PAYMENT_HISTORIES({ page: newVal })
    }
  }
}
</script>

<style scoped>

</style>