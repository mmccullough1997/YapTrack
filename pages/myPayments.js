/* eslint-disable prefer-template */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Button } from 'react-bootstrap';
import Grid from '@mui/material/Unstable_Grid2';
import { getUserPayments } from '../api/paymentData';
import { useAuth } from '../utils/context/authContext';

export default function myPayments() {
  const { user } = useAuth();
  const [lastestBillPayments, setLatestBillPayments] = React.useState([]);
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');

  const handleFromChange = (fromValue) => {
    const fromTheDate = new Date(fromValue.$d).toISOString();
    setFromDate(fromTheDate.slice(0, -14) + ('T00:00:00-05:00'));
  };

  const handleToChange = (toValue) => {
    const toTheDate = new Date(toValue.$d).toISOString();
    setToDate(toTheDate.slice(0, -14) + ('T00:00:00-05:00'));
  };

  const handleClick = () => {
    getUserPayments(user.uid).then((billPaymentsArray) => {
      const filteredUserBillPayments = billPaymentsArray.filter((payment) => payment.paidDate >= fromDate && payment.paidDate <= toDate);
      setLatestBillPayments(filteredUserBillPayments);
    });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  React.useEffect(() => {
    let mounted = true;
    getUserPayments(user.uid).then((billPaymentsArray) => {
      if (mounted) {
        const sortedUserBillPayments = billPaymentsArray.sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate));
        setLatestBillPayments(sortedUserBillPayments);
        setFromDate(sortedUserBillPayments[sortedUserBillPayments.length - 1]?.paidDate);
        setToDate(sortedUserBillPayments[0]?.paidDate);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <div className="header">
        <h5>My Payments</h5>
        <p>{`${new Date().toLocaleString('default', { weekday: 'long' })}, ${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`}</p>
      </div>

      <hr />

      <div className="paymentFilter">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker className="datePicker" label="From Date" inputFormat="MM/DD/YY" value={fromDate} onChange={handleFromChange} renderInput={(params) => <TextField {...params} />} /> <DesktopDatePicker className="datePicker" label="To Date" inputFormat="MM/DD/YY" value={toDate} onChange={handleToChange} renderInput={(params) => <TextField {...params} />} />
          <Button className="submitPaymentFilterButton" variant="outline-none" onClick={handleClick}><NavigateNextRoundedIcon /></Button>
        </LocalizationProvider>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1.5}>
          <Grid xs>
            <Item className="paymentsHeader"><b>Name</b></Item>
            {lastestBillPayments?.map((bill) => (
              <Item className="thaGrid" key={bill.billFirebaseKey}>{bill.payee}</Item>
            ))}
          </Grid>
          <Grid xs>
            <Item className="paymentsHeader"><b>Amount Paid</b></Item>
            {lastestBillPayments?.map((bill) => (
              <Item className="thaGrid" key={bill.billFirebaseKey}>${bill.amount}</Item>
            ))}
          </Grid>
          <Grid xs>
            <Item className="paymentsHeader"><b>Date Paid</b></Item>
            {lastestBillPayments?.map((bill) => (
              <Item className="thaGrid" key={bill.billFirebaseKey}>{new Date(bill.paidDate).toLocaleDateString()}</Item>
            ))}
          </Grid>
          <Grid xs>
            <Item className="paymentsHeader"><b>Date Due</b></Item>
            {lastestBillPayments?.map((bill) => (
              <Item className="thaGrid" key={bill.billFirebaseKey}>{new Date(bill.dueDate).toLocaleDateString()}</Item>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
