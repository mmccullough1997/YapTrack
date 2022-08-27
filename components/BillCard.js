import * as React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function BillCard({ billObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{billObj.payee}</Card.Title>
        <hr />
        <Card.Title>Amount Due: ${billObj.amount}</Card.Title>
        <Card.Title>Due on: {billObj.dueDate}</Card.Title>
        <hr />
        <Card.Subtitle>Last Payment</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

BillCard.propTypes = {
  billObj: PropTypes.shape({
    payee: PropTypes.string,
    amount: PropTypes.number,
    dueDate: PropTypes.string,
    billFirebaseKey: PropTypes.string,
  }).isRequired,
};

export default BillCard;
