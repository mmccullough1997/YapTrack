/* eslint-disable react-hooks/exhaustive-deps */
// import { useAuth } from '../utils/context/authContext';

import { useEffect, useState } from 'react';
import { getUserBills } from '../api/billData';
import BillCard from '../components/BillCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [overdueBills, setOverdueBills] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  const getCurrentDate = () => {
    const date = new Date();
    setCurrentDate(date);
  };

  useEffect(() => {
    getCurrentDate();
    getUserBills(user.uid).then((userBillsArray) => {
      userBillsArray.forEach((bill) => {
        const newDueDate = new Date(bill.dueDate);
        if (bill.recurrenceName === 'Monthly') {
          if (bill.isPaid === false) {
            if (currentDate > newDueDate) {
              const overdue = [];
              overdue.push(bill);
              setOverdueBills(overdue);
            }
          }
        }
      });
    });
  }, []);

  const theCurrentDate = new Date();

  return (
    <div>
      <div className="header">
        <h5>My Dashboard</h5>
        <p>{`${theCurrentDate.toLocaleString('default', { weekday: 'long' })}, ${theCurrentDate.getMonth() + 1}/${theCurrentDate.getDate()}/${theCurrentDate.getFullYear()}`}</p>
      </div>

      <hr />

      <div>
        <h6>Overdue:</h6>
        <div className="d-flex flex-wrap">
          {overdueBills.map((overdueBill) => (
            <BillCard key={overdueBill.billFirebaseKey} billObj={overdueBill} />
          ))}
        </div>
      </div>

      <hr />

      <div>
        <h6>Due Soon:</h6>
        <div className="d-flex flex-wrap">
          {overdueBills.map((overdueBill) => (
            <BillCard key={overdueBill.billFirebaseKey} billObj={overdueBill} />
          ))}
        </div>
      </div>

      <hr />

      <div>
        <h6>Paid:</h6>
        <div className="d-flex flex-wrap">
          {overdueBills.map((overdueBill) => (
            <BillCard key={overdueBill.billFirebaseKey} billObj={overdueBill} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;
