// import { useAuth } from '../utils/context/authContext';

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
    </div>
  );
}

export default Home;
