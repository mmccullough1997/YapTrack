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
      console.warn(billPaymentsArray);
      const sortedUserBillPayments = billPaymentsArray.sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate));
      setLatestBillPayments(sortedUserBillPayments);
    });
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.5}>
          <Grid xs>
            <Item>Name</Item>
            {lastestBillPayments?.map((bill) => (
              <Item>{bill.billFirebaseKey}</Item>
            ))}
          </Grid>
          <Grid xs>
            <Item>Amount Paid</Item>
            {lastestBillPayments?.map((bill) => (
              <Item>{bill.amount}</Item>
            ))}
          </Grid>
          <Grid xs>
            <Item>Date Paid</Item>
            {lastestBillPayments?.map((bill) => (
              <Item>{bill.paidDate}</Item>
            ))}
          </Grid>
          <Grid xs>
            <Item>Date Due</Item>
            {lastestBillPayments?.map((bill) => (
              <Item>{bill.dueDate}</Item>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
