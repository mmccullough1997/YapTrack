import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';

export default function BillCards({ billObj }) {
  return (
    <Card sx={{ maxWidth: 300 }} className="billCard">
      <CardHeader
        className="billCardHeader"
        subheader={billObj.payee}
      />
      <CardContent>
        <hr />
        <Typography variant="body2" color="text.secondary">Amount Due: ${billObj.amount}</Typography>
        <Typography variant="body2" color="text.secondary">Due on: {billObj.dueDate}</Typography>
        <hr />
        <Typography variant="paragraph" color="text.secondary">Last payment made on: {billObj.dueDate}</Typography>
      </CardContent>
      <IconButton aria-label="settings">
        <MoreVertIcon />
      </IconButton>
    </Card>
  );
}

BillCards.propTypes = {
  billObj: PropTypes.shape({
    payee: PropTypes.string,
    amount: PropTypes.number,
    dueDate: PropTypes.string,
    billFirebaseKey: PropTypes.string,
  }).isRequired,
};
