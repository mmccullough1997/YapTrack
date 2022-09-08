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

  // const data = [
  //   ['Task', 'Hours per Day'],
  //   ['Work', 11],
  //   ['Eat', 2],
  //   ['Commute', 2],
  //   ['Watch TV', 2],
  //   ['Sleep', 7],
  // ];

  const options = {
    is3D: true,
    height: 700,
  };

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUserPayments(user.uid).then((billPaymentsArray) => {
        const tags = billPaymentsArray.map((payment) => payment.tagName);
        const amounts = billPaymentsArray.map((payment) => payment.amount);
        const preData = tags.map((e, i) => [e, amounts[i]]);
        preData.unshift(['Tag', 'Amount']);
        setData(preData);
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
