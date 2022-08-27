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
      setOverdueBills(userBillsArray);
    });
  }, []);

  return (
    <div>
      <div className="header">
        <h5>My Dashboard</h5>
        <p>{`${currentDate.toLocaleString('default', { weekday: 'long' })}, ${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`}</p>
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
