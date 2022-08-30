import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBill } from '../../../api/billData';
import BillForm from '../../../components/forms/BillForm';

export default function EditBill() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { billFirebaseKey } = router.query;

  useEffect(() => {
    getSingleBill(billFirebaseKey).then(setEditItem);
  }, [billFirebaseKey]);

  return (<BillForm obj={editItem} />);
}
