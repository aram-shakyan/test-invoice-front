import { RepositoryFactory } from "@/api/RepositoryFactory";

export default {
    state: {
        invoices: [],
        history_payments: []
    },
    mutations: {
        SET_INVOICES(state, invoices) {
            state.invoices = invoices;
        },
        SET_HISTORY_PAYMENTS(state, payments) {
            state.history_payments = payments;
        }
    },
    actions: {
        GET_INVOICES(context, payload) {
            return new Promise((resolve, reject) => {
                RepositoryFactory.get('invoice').get(payload).then(({ data : { data } }) => {
                    context.commit("SET_INVOICES", data)
                    resolve();
                }).catch(() => reject());
            });
        },
        STORE_INVOICE(context, payload) {
            return new Promise((resolve, reject) => {
                RepositoryFactory.get('invoice').store(payload).then(() => {
                    context.dispatch("GET_INVOICES");
                    resolve();
                }).catch((err) => reject(err));
            });
        },
        DELETE_INVOICE(context, id) {
            RepositoryFactory.get('invoice').destroy(id).then(() => {
                context.dispatch("GET_INVOICES");
            })
        },
        SHOW_INVOICE(context, id) {
            return RepositoryFactory.get('invoice').show(id);
        },
        UPDATE_INVOICE(context, payload) {
            return new Promise((resolve, reject) => {
                RepositoryFactory.get('invoice').update(payload.data, payload.id).then(() => {
                    context.dispatch("GET_INVOICES");
                    resolve();
                }).catch((err) => reject(err));
            });
        },
        PROCESS_PAYMENT(context, id) {
            RepositoryFactory.get('payment').payInvoice(id);
        },
        GET_PAYMENT_HISTORIES(context, payload) {
            return new Promise((resolve, reject) => {
                RepositoryFactory.get('history').getPayments(payload).then(({ data : { data } }) => {
                    context.commit("SET_HISTORY_PAYMENTS", data);
                    resolve();
                }).catch(() => reject());
            })
        }
    },
    getters: {
        INVOICES(state) {
            return state.invoices;
        },
        PAYMENT_HISTORIES(state) {
            return state.history_payments;
        }
    }
}