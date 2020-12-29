import Repository from "@/api/Repository";

const resource = "history";

export default {
    getPayments(payload) {
        return Repository.get(`${resource}/payment`, { params : payload })
    }
}