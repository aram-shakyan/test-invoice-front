import Repository from "@/api/Repository";

const resource = "payments";

export default {
    payInvoice(id) {
        return Repository.post(`${resource}/pay/invoice`, { invoice_id: id })
    }
}