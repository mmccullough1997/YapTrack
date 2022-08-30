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
import { getSingleBill, updateBill } from '../api/billData';

export default function BillCards({ billObj }) {
  const newDueDate = new Date(billObj.dueDate);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const router = useRouter();

  const handlePayment = () => {
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

  return (
    <Card sx={{ maxWidth: 300 }} className="billCard">
      <CardHeader
        className="billCardHeader"
        subheader={billObj.payee}
      />
      <CardContent>
        <hr />
        <Typography variant="body2" color="text.secondary">Amount Due: ${billObj.amount}</Typography>
        <Typography variant="body2" color="text.secondary">Due on: {`${newDueDate.toLocaleString('default', { weekday: 'long' })}, ${newDueDate.getMonth() + 1}/${newDueDate.getDate()}/${newDueDate.getFullYear()}`}</Typography>
        <hr />
        <Typography variant="paragraph" color="text.secondary">Last payment made on: {`${newDueDate.toLocaleString('default', { weekday: 'long' })}, ${newDueDate.getMonth() + 1}/${newDueDate.getDate()}/${newDueDate.getFullYear()}`}</Typography>
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
                  <MenuItem onClick={handlePaymentPortal}>Pay</MenuItem>
                  <MenuItem onClick={handlePayment}>Mark as Paid</MenuItem>
                  <hr />
                  <MenuItem>Edit</MenuItem>
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
};
