/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { getUserBills } from '../api/billData';
import BillCard from '../components/BillCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [overdueBills, setOverdueBills] = useState([]);
  const [dueSoon, setDueSoon] = useState([]);
  const [paidBills, setPaidBills] = useState([]);

  const getOverdueBills = () => {
    getUserBills(user.uid).then((userBillsArray) => {
      const overdue = userBillsArray.filter((bill) => new Date() > new Date(bill.dueDate) && bill.isPaid === false);
      setOverdueBills(overdue);
    });
  };

  const getBillsDueSoon = () => {
    getUserBills(user.uid).then((userBillsArray) => {
      const notOverdueBillsArray = userBillsArray.filter((bill) => new Date() < new Date(bill.dueDate));
      // eslint-disable-next-line max-len
      const billsDueSoon = notOverdueBillsArray.filter((bill) => (bill.recurrenceName === 'Monthly' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7) || (bill.recurrenceName === 'Weekly' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 3) || (bill.recurrenceName === 'BiWeekly' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 5) || (bill.recurrenceName === 'Quarterly' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7) || (bill.recurrenceName === 'Annually' && bill.isPaid === false && (Math.abs(new Date(bill.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7));
      setDueSoon(billsDueSoon);
    });
  };

  const getPaidBills = () => {
    getUserBills(user.uid).then((userBillsArray) => {
      const paid = userBillsArray.filter((bill) => bill.isPaid === true);
      setPaidBills(paid);
    });
  };

  useEffect(() => {
    getOverdueBills();
    getBillsDueSoon();
    getPaidBills();
  }, []);

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
