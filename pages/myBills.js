/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Chip, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getBillsByTag, getUserBills } from '../api/billData';
import BillCard from '../components/BillCard';
import { useAuth } from '../utils/context/authContext';

export default function myBills() {
  const { user } = useAuth();
  const [userBills, setUserBills] = useState([]);

  const handleClick = (event) => {
    const val = event.target.innerHTML;
    if (val === 'All') {
      getUserBills(user.uid).then((theBills) => {
        setUserBills(theBills);
      });
    } else if (val === 'Closed') {
      getUserBills(user.uid).then((theBills) => {
        const closed = theBills.filter((bill) => bill.isClosed === true);
        setUserBills(closed);
      });
    } else {
      getBillsByTag(val, user.uid).then((result) => {
        setUserBills(result);
      });
    }
  };

  useEffect(() => {
    getUserBills(user.uid).then((userBillsArray) => {
      setUserBills(userBillsArray);
    });
  }, []);

  return (
    <div>
      <div className="header">
        <h5>My Bills</h5>
        <p>{`${new Date().toLocaleString('default', { weekday: 'long' })}, ${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`}</p>
      </div>

      <hr />

      <div className="filters">
        <Stack direction="row" spacing={1}>
          <Chip style={{ backgroundColor: 'grey', color: 'white' }} label="Utilities" onClick={handleClick} />
          <Chip style={{ backgroundColor: 'grey', color: 'white' }} label="Health" variant="outlined" onClick={handleClick} />
          <Chip style={{ backgroundColor: 'grey', color: 'white' }} label="Entertainment" variant="outlined" onClick={handleClick} />
          <Chip style={{ backgroundColor: 'grey', color: 'white' }} label="Home" variant="outlined" onClick={handleClick} />
          <Chip style={{ backgroundColor: 'grey', color: 'white' }} label="Closed" variant="outlined" onClick={handleClick} />
          <Chip style={{ backgroundColor: 'grey', color: 'white' }} label="All" variant="outlined" onClick={handleClick} />
        </Stack>
      </div>

      <div className="d-flex flex-wrap">
        {userBills.map((bill) => (
          <BillCard key={bill.billFirebaseKey} billObj={bill} />
        ))}
      </div>
    </div>
  );
}
