/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../utils/context/authContext';
import { getUserBills } from '../api/billData';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function monthAtAGlance() {
  const [bills, setBills] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    getUserBills(user.uid).then((userBillsArray) => {
      if (mounted) {
        const mapa = userBillsArray?.map((bill) => ({
          title: bill?.payee,
          start: bill?.dueDate,
          allDay: true,
          end: bill?.dueDate,
          backgroundColor: (new Date() > new Date(bill?.dueDate) && bill?.isPaid === false && bill?.isClosed === false ? 'red' : bill?.isPaid === true ? 'green' : bill?.recurrenceName === 'Monthly' && bill?.isPaid === false && (Math.abs(new Date(bill?.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7 ? 'orange' : bill?.recurrenceName === 'Weekly' && bill?.isPaid === false && (Math.abs(new Date(bill?.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 3 ? 'orange' : bill?.recurrenceName === 'BiWeekly' && bill?.isPaid === false && (Math.abs(new Date(bill?.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 5 ? 'orange' : bill?.recurrenceName === 'Quarterly' && bill?.isPaid === false && (Math.abs(new Date(bill?.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7 ? 'orange' : bill?.recurrenceName === 'Annually' && bill?.isPaid === false && (Math.abs(new Date(bill?.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7 ? 'orange' : bill?.recurrenceName === 'Once' && bill?.isPaid === false && (Math.abs(new Date(bill?.dueDate).getTime() - new Date().getTime())) / (24 * 60 * 60 * 1000) <= 7 ? 'orange' : 'blue'),
        }));
        setBills(mapa);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <div className="header">
        <h5>Month At a Glance</h5>
        <p>{`${new Date().toLocaleString('default', { weekday: 'long' })}, ${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`}</p>
      </div>

      <hr />
      <div>
        <Calendar
          localizer={localizer}
          events={bills}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700, margin: '20px' }}
          eventPropGetter={(event) => {
            const { backgroundColor } = event;
            return { style: { backgroundColor } };
          }}
        />
      </div>
    </div>
  );
}

export default monthAtAGlance;
