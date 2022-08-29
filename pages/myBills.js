/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { getUserBills } from '../api/billData';
import BillCard from '../components/BillCard';
import { useAuth } from '../utils/context/authContext';

export default function myBills() {
  const { user } = useAuth();
  const [userBills, setUserBills] = useState([]);

  useEffect(() => {
    getUserBills(user.uid).then((userBillsArray) => {
      setUserBills(userBillsArray);
    });
  }, []);

  return (
    <div>
      <div className="d-flex flex-wrap">
        {userBills.map((bill) => (
          <BillCard key={bill.billFirebaseKey} billObj={bill} />
        ))}
      </div>
    </div>
  );
}
