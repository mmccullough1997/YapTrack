/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-brace-presence */
import * as React from 'react';
import { Chart } from 'react-google-charts';
import { getUserPayments } from '../api/paymentData';
import { useAuth } from '../utils/context/authContext';

export default function mySpending() {
  const { user } = useAuth();
  const [data, setData] = React.useState([]);

  const options = {
    is3D: true,
    height: 700,
    backgroundColor: "#FAF0D7",
  };

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUserPayments(user.uid).then((billPaymentsArray) => {
        const h = Object.values(billPaymentsArray.reduce((c, { tagName, amount }) => {
          c[tagName] = c[tagName] || { tagName, amount: 0 };
          c[tagName].amount += amount;
          return c;
        }, {}));
        const output = h.map((obj) => Object.keys(obj).map((key) => obj[key]));
        output.unshift(['Tag', 'Amount']);
        setData(output);
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (

    <div>
      <div className="header">
        <h5>My Spending</h5>
        <p>{`${new Date().toLocaleString('default', { weekday: 'long' })}, ${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`}</p>
      </div>

      <hr />

      <div className="mySpendingSubheader">
        <h5><b>Breakdown of Bills by Tag</b></h5>
      </div>

      <Chart
        className="chart"
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"100%"}
      />

    </div>
  );
}
