import { Link } from "react-router-dom";
import "../styles/homePage.css";

const HomePage = () => {
  return (
    <main className="homepage_wrapper">
      <div className="buttons">
        <Link to="orders/unverified">
          <button className="btn dark_btn">Unverified Orders</button>
        </Link>
        <Link to="orders/verified">
          <button className="btn light_btn">Verified Orders</button>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
