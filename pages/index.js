// import { useAuth } from '../utils/context/authContext';

import BillCard from '../components/BillCard';

function Home() {
  // const { user } = useAuth();
  const date = new Date().toLocaleString();

  return (
    <div>
      <div className="header">
        <h5>My Dashboard</h5>
        <p>{date}</p>
      </div>
      <hr />
      <BillCard />
    </div>
  );
}

export default Home;
