import AuthRepository from "./authRepository";
import PaymentRepository from "./paymentRepository";
import HistoryRepository from "./historyRepository";
import InvoiceRepository from "./invoiceRepository";

const repositories = {
    auth: AuthRepository,
    invoice: InvoiceRepository,
    history: HistoryRepository,
    payment: PaymentRepository,
}

export const RepositoryFactory = {
    get: name => repositories[name]
}