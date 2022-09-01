/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import {
  ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper,
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSingleBill, updateBill } from '../api/billData';
import { useAuth } from '../utils/context/authContext';
import { createPayment, getLastBillPayment } from '../api/paymentData';
import { deleteBillPayments, getBillPayments } from '../api/mergedData';

export default function BillCards({ billObj }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const router = useRouter();
  const { user } = useAuth();
  const [lastPaymentDate, setLastPaymentDate] = React.useState('');

  const deleteTheBill = () => {
    if (window.confirm('Delete this bill? Previous payments will be erased. If you wish to keep records of payments, please consider closing the bill instead.')) {
      getBillPayments(billObj.billFirebaseKey).then(() => {
        deleteBillPayments(billObj.billFirebaseKey, user.uid).then(() => {
          router.push('/');
        });
      });
    }
  };

  const handlePayment = () => {
    const newPayment = {
      billFirebaseKey: billObj.billFirebaseKey, dueDate: billObj.dueDate, amount: billObj.amount, paidDate: new Date(), uid: user.uid, payee: billObj.payee,
    };
    createPayment(newPayment);
    getSingleBill(billObj.billFirebaseKey).then((bill) => {
      const newBillObj = {
        amount: bill.amount, billFirebaseKey: bill.billFirebaseKey, dueDate: bill.dueDate, isClosed: bill.isClosed, isPaid: true, payee: bill.payee, paymentUrl: bill.paymentUrl, recurrenceName: bill.recurrenceName, tagName: bill.tagName, uid: bill.uid,
      };
      updateBill(newBillObj).then(() => {
        router.push('/');
      });
    });
  };

  const handlePaymentPortal = () => {
    router.push(`${billObj.paymentUrl}`);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    getLastBillPayment(billObj?.billFirebaseKey).then((billPayment) => {
      if (billPayment[0]) {
        setLastPaymentDate(billPayment[0].paidDate);
      }
    });
  }, []);

  return (
    <Card sx={{ maxWidth: 300 }} className="billCard">
      <CardHeader
        className="billCardHeader"
        subheader={billObj?.payee}
      />
      <CardContent>
        <hr />
        <Typography variant="body2" color="text.secondary">Amount Due: ${billObj?.amount}</Typography>
        <Typography variant="body2" color="text.secondary">Due on: {`${new Date(billObj?.dueDate).toLocaleString('default', { weekday: 'long' })}, ${new Date(billObj?.dueDate).getMonth() + 1}/${new Date(billObj?.dueDate).getDate()}/${new Date(billObj?.dueDate).getFullYear()}`}</Typography>
        <hr />
        <Typography variant="paragraph" color="text.secondary">{lastPaymentDate ? `Last payment made on: ${new Date(lastPaymentDate).toLocaleString('default', { weekday: 'long' })}, ${new Date(lastPaymentDate).getMonth() + 1}/${new Date(lastPaymentDate).getDate()}/${new Date(lastPaymentDate).getFullYear()}` : 'No Payments'}</Typography>
      </CardContent>
      <IconButton
        aria-label="settings"
        onClick={handleToggle}
        size="small"
        aria-controls={open ? 'split-button-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="menu"
        ref={anchorRef}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'right bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  <MenuItem onClick={handlePayment}>Mark as Paid</MenuItem>
                  <MenuItem onClick={handlePaymentPortal}>Pay</MenuItem>
                  <hr />
                  <Link href={`/bill/edit/${billObj?.billFirebaseKey}`} passHref>
                    <MenuItem>Edit</MenuItem>
                  </Link>
                  <MenuItem onClick={deleteTheBill}>Delete Bill</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Card>
  );
}

BillCards.propTypes = {
  billObj: PropTypes.shape({
    payee: PropTypes.string,
    amount: PropTypes.number,
    dueDate: PropTypes.string,
    paymentUrl: PropTypes.string,
    billFirebaseKey: PropTypes.string,
  }).isRequired,
  router: PropTypes.string,
  name: PropTypes.string,
};

BillCards.defaultProps = {
  router: '',
  name: '',
};
