<template>
  <v-col cols="12">
    <v-col offset="1" cols="10">
      <v-alert type="warning" v-if="!IS_AUTHENTICATED">
        Please login to pay invoices.
        <v-btn small class="ml-4" :to="{ name: 'Login' }">Login</v-btn>
      </v-alert>
      <v-card>
        <v-card-title>
          Invoices
          <v-btn @click="showStoreDialog = true"
                 small
                 color="success"
                 v-if="hasPermission('create invoice')"
                 class="ml-4">+ Create</v-btn>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="INVOICES.data"
            item-key="name"
            class="elevation-1"
            hide-default-footer
        >
          <template v-slot:item.payed_by="{item}">
            {{ item.payeer ? item.payeer.name : 'N/A' }}
          </template>
          <template v-slot:item.payed_at_human="{item}">
            {{ item.payed_at_human || 'N/A' }}
          </template>
          <template v-slot:item.status_label="{item}">
            <v-chip label small :color="getStatusColor(item.status_label)">{{ item.status_label }}</v-chip>
          </template>
          <template v-slot:item.actions="{item}">
            <v-btn color="success"
                   small
                   v-if="!IS_AUTHENTICATED || hasPermission('pay invoice')"
                   @click="pay(item.id)"
                   :disabled="item.status_label === 'Payed'"
            >PAY</v-btn>

            <v-btn @click="deleteInvoice(item.id)" color="error" small v-if="hasPermission('delete invoice')">delete</v-btn>
            <v-btn @click="updateInvoice(item.id)" color="warning" small v-if="hasPermission('update invoice')" class="ml-4">update</v-btn>
          </template>
        </v-data-table>
      </v-card>

      <v-pagination
          :length="INVOICES.last_page"
          :total-visible="7"
          v-model="activePage"
          class="mt-4"
      ></v-pagination>
    </v-col>

    <invoice-store-dialog v-bind:opened.sync="showStoreDialog" />
    <invoice-delete-dialog v-bind:opened.sync="showDeleteDialog" :id="deleteID"/>
    <invoice-update-dialog v-bind:opened.sync="showUpdateDialog" :id="updateID" />
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InvoiceStoreDialog from "@/components/Invoice/StoreDialog";
import InvoiceDeleteDialog from "@/components/Invoice/DeleteDialog";
import InvoiceUpdateDialog from "@/components/Invoice/UpdateDialog";

export default {
  components: { InvoiceStoreDialog, InvoiceDeleteDialog, InvoiceUpdateDialog },
  data() {
    return {
      headers: [
        { text: 'ID',  align: 'start',  sortable: false, value: 'id'},
        { text: 'School name',  align: 'start',  sortable: false, value: 'school_name'},
        { text: 'Description', sortable: false, value: 'description' },
        { text: 'Amount', sortable: false, value: 'amount' },
        { text: 'Payed by', sortable: false, value: 'payed_by'},
        { text: 'Payed At', sortable: false, value: 'payed_at_human'},
        { text: 'Payment Status',  sortable: false, value: 'status_label'},
        { text: 'Actions', sortable: false, align: 'end', value: 'actions' },
      ],
      showStoreDialog: false,
      showDeleteDialog: false,
      showUpdateDialog: false,
      deleteID: '',
      updateID: '',
      activePage: 1
    }
  },
  methods: {
    ...mapActions(['GET_INVOICES']),
    pay(id) {
      if(!this.IS_AUTHENTICATED) this.$router.push({ name: 'Login' });

      this.$router.push({ name: 'PayInvoice', params: { id }});
    },
    deleteInvoice(id) {
      this.deleteID = id;
      this.showDeleteDialog = true
    },
    updateInvoice(id) {
      this.updateID = id;
      this.showUpdateDialog = true
    },
    getStatusColor(status) {
      return status === 'Payed' ? 'success' : 'warning'
    }
  },
  created() {
    this.GET_INVOICES().then((res) => {
      this.activePage = this.INVOICES.current_page;
    });
  },
  computed: {
    ...mapGetters(['INVOICES', 'IS_AUTHENTICATED']),
  },
  watch: {
    activePage: function (newVal) {
      this.GET_INVOICES({ page: newVal })
    }
  }
}
</script>

<style scoped>

</style>