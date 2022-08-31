/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { getUserPayments } from '../api/paymentData';
import { useAuth } from '../utils/context/authContext';

export default function myPayments() {
  const { user } = useAuth();
  const [lastestBillPayments, setLatestBillPayments] = React.useState([]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  React.useEffect(() => {
    getUserPayments(user.uid).then((billPaymentsArray) => {
      const sortedUserBillPayments = billPaymentsArray.sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate));
      setLatestBillPayments(sortedUserBillPayments);
    });
  }, []);

  return (
    <div>
      <div className="header">
        <h5>My Payments</h5>
        <p>{`${new Date().toLocaleString('default', { weekday: 'long' })}, ${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`}</p>
      </div>

      <hr />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.5}>
          <Grid xs>
            <Item className="paymentsHeader"><b>Name</b></Item>
            {lastestBillPayments?.map((bill) => (
              <Item>{bill.payee}</Item>
            ))}
          </Grid>
          <Grid xs>
            <Item className="paymentsHeader"><b>Amount Paid</b></Item>
            {lastestBillPayments?.map((bill) => (
              <Item>${bill.amount}</Item>
            ))}
          </Grid>
          <Grid xs>
            <Item className="paymentsHeader"><b>Date Paid</b></Item>
            {lastestBillPayments?.map((bill) => (
              <Item>{new Date(bill.paidDate).toLocaleDateString()}</Item>
            ))}
          </Grid>
          <Grid xs>
            <Item className="paymentsHeader"><b>Date Due</b></Item>
            {lastestBillPayments?.map((bill) => (
              <Item>{new Date(bill.dueDate).toLocaleDateString()}</Item>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
