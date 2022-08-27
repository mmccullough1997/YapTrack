/* eslint-disable react-hooks/exhaustive-deps */
// import { useAuth } from '../utils/context/authContext';

import { useEffect, useState } from 'react';
import { getUserBills } from '../api/billData';
// import BillCard from '../components/BillCard';
import BillCards from '../components/BillCards';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const date = new Date().toLocaleString();
  const [overdueBills, setOverdueBills] = useState([]);
  // const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    getUserBills(user.uid).then((userBillsArray) => {
      console.warn(userBillsArray);
      setOverdueBills(userBillsArray);
    });
  }, []);

  return (
    <div>
      <div className="header">
        <h5>My Dashboard</h5>
        <p>{date}</p>
      </div>
      <hr />
      <div className="d-flex flex-wrap">
        {overdueBills.map((overdueBill) => (
          <BillCards key={overdueBill.billFirebaseKey} billObj={overdueBill} />
        ))}
      </div>
    </div>
  );
}

export default Home;
