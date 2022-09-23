import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getUserBills } from '../api/billData';
import BillCards from '../components/BillCard';
import { useAuth } from '../utils/context/authContext';

export default function SearchPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  const getBills = () => {
    getUserBills(user.uid).then((billArr) => {
      const value = router.query.keyword;
      setFilteredData(billArr);
      const results = billArr.filter((bill) => bill.payee.toLowerCase().includes(value.toLowerCase()) || bill.tagName.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(results);
    });
  };

  useEffect(() => {
    getBills();
    setFilteredData([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.keyword]);

  return (
    <>
      <h1><u>Search Results</u></h1>
      <h2 className="searchPageSubheader">You searched for...{router.query.keyword.toLocaleUpperCase()}</h2>
      <div>
        {filteredData.length ? filteredData.map((bill) => (
          <BillCards key={bill.billFirebaseKey} billObj={bill} />
        )) : <h2>No Results Found.</h2>}
      </div>
    </>
  );
}
