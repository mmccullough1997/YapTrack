/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserBills, updateBill } from '../api/billData';
import BillCard from '../components/BillCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [overdueBills, setOverdueBills] = useState([]);
  const [dueSoon, setDueSoon] = useState([]);
  const [paidBills, setPaidBills] = useState([]);
  const router = useRouter();

  const getOverdueBills = () => {
    getUserBills(user.uid).then((userBillsArray) => {
      const overdue = userBillsArray.filter((bill) => new Date() > new Date(bill.dueDate) && bill.isPaid === false && bill.isClosed === false);
      setOverdueBills(overdue);
    });
  };

  const getBillsDueSoon = () => {
    getUserBills(user.uid).then((userBillsArray) => {
      const notOverdueBillsArray = userBillsArray.filter((bill) => new Date() < new Date(bill.dueDate) && bill.isClosed === false);
      // eslint-disable-next-line max-len
      const billsDueSoon = notOverdueBillsArray.filter((bill) => (bill.recurrenceName === 'Monthly' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7) || (bill.recurrenceName === 'Weekly' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 3) || (bill.recurrenceName === 'BiWeekly' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 5) || (bill.recurrenceName === 'Quarterly' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7) || (bill.recurrenceName === 'Annually' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7) || (bill.recurrenceName === 'Once' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7));
      setDueSoon(billsDueSoon);
    });
  };

  const checkPaidBills = () => {
    getUserBills(user.uid).then((userBillsArray) => {
      const paid = userBillsArray.filter((bill) => bill.isPaid === true && new Date() <= new Date(bill.dueDate) && bill.isClosed === false);
      setPaidBills(paid);
      const paidBillAndDue = userBillsArray.filter((bill) => bill.isPaid === true && new Date() > new Date(bill.dueDate) && bill.isClosed === false);
      paidBillAndDue.forEach((bill) => {
        if (bill.recurrenceName === 'Monthly') {
          const newBillObj = {
            amount: bill.amount, billFirebaseKey: bill.billFirebaseKey, dueDate: new Date(new Date(bill.dueDate).setMonth(new Date(bill.dueDate).getMonth() + 1)).toISOString(), isClosed: bill.isClosed, isPaid: false, payee: bill.payee, paymentUrl: bill.paymentUrl, recurrenceName: bill.recurrenceName, tagName: bill.tagName, uid: bill.uid,
          };
          updateBill(newBillObj);
        } else if (bill.recurrenceName === 'Weekly') {
          const newBillObj = {
            amount: bill.amount, billFirebaseKey: bill.billFirebaseKey, dueDate: new Date(new Date(bill.dueDate).setDate(new Date(bill.dueDate).getDate() + 7)).toISOString(), isClosed: bill.isClosed, isPaid: false, payee: bill.payee, paymentUrl: bill.paymentUrl, recurrenceName: bill.recurrenceName, tagName: bill.tagName, uid: bill.uid,
          };
          updateBill(newBillObj);
        } else if (bill.recurrenceName === 'BiWeekly') {
          const newBillObj = {
            amount: bill.amount, billFirebaseKey: bill.billFirebaseKey, dueDate: new Date(new Date(bill.dueDate).setDate(new Date(bill.dueDate).getDate() + 14)).toISOString(), isClosed: bill.isClosed, isPaid: false, payee: bill.payee, paymentUrl: bill.paymentUrl, recurrenceName: bill.recurrenceName, tagName: bill.tagName, uid: bill.uid,
          };
          updateBill(newBillObj);
        } else if (bill.recurrenceName === 'Quarterly') {
          const newBillObj = {
            amount: bill.amount, billFirebaseKey: bill.billFirebaseKey, dueDate: new Date(new Date(bill.dueDate).setDate(new Date(bill.dueDate).getDate() + 90)).toISOString(), isClosed: bill.isClosed, isPaid: false, payee: bill.payee, paymentUrl: bill.paymentUrl, recurrenceName: bill.recurrenceName, tagName: bill.tagName, uid: bill.uid,
          };
          updateBill(newBillObj);
        } else if (bill.recurrenceName === 'Annually') {
          const newBillObj = {
            amount: bill.amount, billFirebaseKey: bill.billFirebaseKey, dueDate: new Date(new Date(bill.dueDate).setDate(new Date(bill.dueDate).getFullYear() + 1)).toISOString(), isClosed: bill.isClosed, isPaid: false, payee: bill.payee, paymentUrl: bill.paymentUrl, recurrenceName: bill.recurrenceName, tagName: bill.tagName, uid: bill.uid,
          };
          updateBill(newBillObj);
        } else {
          const newBillObj = {
            amount: bill.amount, billFirebaseKey: bill.billFirebaseKey, dueDate: bill.dueDate, isClosed: true, isPaid: true, payee: bill.payee, paymentUrl: bill.paymentUrl, recurrenceName: bill.recurrenceName, tagName: bill.tagName, uid: bill.uid,
          };
          updateBill(newBillObj);
        }
      });
    });
  };

  useEffect(() => {
    getOverdueBills();
    getBillsDueSoon();
    checkPaidBills();
  }, [router]);

  return (
    <div>
      <div className="header">
        <h5>My Dashboard</h5>
        <p>{`${new Date().toLocaleString('default', { weekday: 'long' })}, ${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`}</p>
      </div>

      <hr />

      <div>
        <h6><mark className="red">{overdueBills.length}</mark> Bills Overdue:</h6>
        <div className="d-flex flex-wrap">
          {overdueBills.map((overdueBill) => (
            <BillCard key={overdueBill.billFirebaseKey} billObj={overdueBill} />
          ))}
        </div>
      </div>

      <hr />

      <div>
        <h6><mark className="orange">{dueSoon.length}</mark> Bills Due Soon:</h6>
        <div className="d-flex flex-wrap">
          {dueSoon.map((billsDueSoon) => (
            <BillCard key={billsDueSoon.billFirebaseKey} billObj={billsDueSoon} />
          ))}
        </div>
      </div>

      <hr />

      <div>
        <h6><mark className="green">{paidBills.length}</mark> Bills Paid:</h6>
        <div className="d-flex flex-wrap">
          {paidBills.map((paidBill) => (
            <BillCard key={paidBill.billFirebaseKey} billObj={paidBill} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;
