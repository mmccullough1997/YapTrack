import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserPayments = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/payments.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const createPayment = (paymentObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/payments.json`, paymentObj)
    .then((response) => {
      const payload = { paymentFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/payments/${response.data.name}.json`, payload)
        .then(() => {
          getUserPayments(paymentObj.uid).then(resolve);
        });
    }).catch(reject);
});

export {
  getUserPayments, createPayment,
};
