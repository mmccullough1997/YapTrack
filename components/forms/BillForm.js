import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import getTags from '../../api/tagData';
import getRecurrences from '../../api/recurrenceData';
import { createBill, updateBill } from '../../api/billData';
// import getBillPayments, { deleteBillPayments } from '../../api/mergedData';

const initialState = {
  amount: 0,
  dueDate: '',
  isClosed: false,
  isPaid: false,
  payee: '',
  paymentUrl: '',
};

function BillForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [recurrences, setRecurrences] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTags().then(setTags);
    getRecurrences().then(setRecurrences);
    if (obj.billFirebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.billFirebaseKey) {
      formInput.dueDate = new Date(new Date(formInput.dueDate).setDate(new Date(formInput.dueDate).getDate() + 1)).toISOString();
      formInput.amount = parseInt(formInput.amount, 10);
      updateBill(formInput, formInput.billFirebaseKey)
        .then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput, uid: user.uid,
      };
      payload.dueDate = new Date(new Date(payload.dueDate).setDate(new Date(payload.dueDate).getDate() + 1)).toISOString();
      payload.amount = parseInt(payload.amount, 10);
      createBill(payload).then(() => router.push('/myBills'));
    }
  };

  return (
    <div>
      <div>
        <h1>Add a Bill</h1>
        <Form onSubmit={handleSubmit}>
          <h2 className="text-black mt-5">{obj.billFirebaseKey ? 'Update' : 'Create'} Bill</h2>

          <FloatingLabel controlId="floatingInput1" label="Payee" className="mb-3">
            <Form.Control type="text" placeholder="Who's it for?" name="payee" value={formInput.payee} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Payment URL" className="mb-3">
            <Form.Control type="text" placeholder="Enter Payment URL" name="paymentUrl" value={formInput.paymentUrl} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Due Date" className="mb-3">
            <Form.Control type="date" placeholder="Due Date" name="dueDate" value={obj.billFirebaseKey ? formInput.dueDate.substring(0, 10) : formInput.dueDate} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" className="mb-3">
            <Form.Control type="text" placeholder="Enter Amount (Dollars)" name="amount" value={formInput.amount} onChange={handleChange} required />
          </FloatingLabel>

          <div>
            {obj.billFirebaseKey
              ? (
                <div>
                  <FloatingLabel controlId="floatingSelect" label="Tag">
                    <Form.Select aria-label="Tag" name="tagName" onChange={handleChange} className="mb-3" value={obj.tagName} required>
                      <option value="">Select Tag</option>
                      {tags.map((tag) => (
                        <option key={tag.tagFirebaseKey} value={tag.tagName}>
                          {tag.tagName}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Check
                      className="text-black mb-3"
                      type="switch"
                      id="isClosed"
                      name="isClosed"
                      label="Close?"
                      checked={formInput.isClosed}
                      onChange={(e) => {
                        setFormInput((prevState) => ({
                          ...prevState,
                          isClosed: e.target.checked,
                        }));
                      }}
                    />
                  </FloatingLabel>
                </div>
              ) : (
                <FloatingLabel controlId="floatingSelect">
                  <Form.Select aria-label="Tag" name="tagName" onChange={handleChange} className="mb-3" value={obj.tagName} required>
                    <option value="">Select Tag</option>
                    {tags.map((tag) => (
                      <option key={tag.tagFirebaseKey} value={tag.tagName}>
                        {tag.tagName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select aria-label="Recurrence" name="recurrenceName" onChange={handleChange} className="mb-3" value={obj.recurrenceName} required>
                    <option value="">Select Recurrence</option>
                    {recurrences.map((recurrence) => (
                      <option key={recurrence.recurrenceFirebaseKey} value={recurrence.recurrenceName}>
                        {recurrence.recurrenceName}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              )}
          </div>
        </Form>
      </div>
    </div>
  );
}

BillForm.propTypes = {
  obj: PropTypes.shape({
    amount: PropTypes.number,
    dueDate: PropTypes.string,
    isClosed: PropTypes.bool,
    isPaid: PropTypes.bool,
    billFirebaseKey: PropTypes.string,
    payee: PropTypes.string,
    paymentUrl: PropTypes.string,
    tagName: PropTypes.string,
    recurrenceName: PropTypes.string,
  }),
};

BillForm.defaultProps = {
  obj: initialState,
};

export default BillForm;
