import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserBills = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/bills.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const getSingleBill = (billFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/bills/${billFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getBillsByTag = (tag, uid) => new Promise((resolve, reject) => {
  getUserBills(uid).then((bills) => {
    const filteredBills = bills.filter((theBill) => theBill.tagName === tag);
    resolve(filteredBills);
  })
    .catch((error) => reject(error));
});

const createBill = (billObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/bills.json`, billObj)
    .then((response) => {
      const payload = { billFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/bills/${response.data.name}.json`, payload)
        .then(() => {
          getUserBills(billObj.uid).then(resolve);
        });
    }).catch(reject);
});

const deleteBill = (billFirebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/bills/${billFirebaseKey}.json`)
    .then(() => {
      getUserBills(uid).then((billsArray) => resolve(billsArray));
    })
    .catch((error) => reject(error));
});

const updateBill = (billObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/bills/${billObj.billFirebaseKey}.json`, billObj)
    .then(() => getUserBills(billObj.uid).then(resolve))
    .catch(reject);
});

const getSingleBillsPayments = (billFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/payments.json?orderBy="billFirebaseKey"&equalTo="${billFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getUserBills, getSingleBill, createBill, deleteBill, updateBill, getSingleBillsPayments, getBillsByTag,
};
