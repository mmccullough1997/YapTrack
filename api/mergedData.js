import { deleteBill, getSingleBill, getSingleBillsPayments } from './billData';
import { deletePayment } from './paymentData';

const getBillPayments = (billFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleBill(billFirebaseKey), getSingleBillsPayments(billFirebaseKey)])
    .then(([billObject, billPaymentsArray]) => {
      resolve({ ...billObject, payments: billPaymentsArray });
    }).catch((error) => reject(error));
});

const deleteBillPayments = (billFirebaseKey, uid) => new Promise((resolve, reject) => {
  getBillPayments(billFirebaseKey).then((billPaymentArray) => {
    const deleteBillPromises = billPaymentArray.map((payment) => deletePayment(payment.paymentFirebaseKey, uid));
    Promise.all(deleteBillPromises).then(() => {
      deleteBill(billFirebaseKey, uid).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  getBillPayments, deleteBillPayments,
};
