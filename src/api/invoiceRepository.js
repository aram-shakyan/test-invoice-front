import Repository from "@/api/Repository";

const resource = "invoices";

export default {
    get(payload) {
        return Repository.get(`${resource}`, { params: payload })
    },
    show(id) {
        return Repository.get(`${resource}/${id}`)
    },
    store(payload) {
        return Repository.post(`${resource}`, payload)
    },
    update(payload, id) {
        return Repository.post(`${resource}/${id}`, {...payload, ...{ _method: 'PUT' }})
    },
    destroy(id) {
        return Repository.delete(`${resource}/${id}`)
    }
}