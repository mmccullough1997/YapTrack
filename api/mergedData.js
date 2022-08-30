import { getSingleBill, getSingleBillsPayments } from './billData';

const getBillPayments = (billFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleBill(billFirebaseKey), getSingleBillsPayments(billFirebaseKey)])
    .then(([billObject, billPaymentsArray]) => {
      resolve({ ...billObject, payments: billPaymentsArray });
    }).catch((error) => reject(error));
});

export default getBillPayments;
