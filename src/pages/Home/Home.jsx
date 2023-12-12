import React from "react";
import budget from "./budget.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="container">
      <img src={budget} alt="budget" />
      <br />
      <br />
      <br />
      <h2>
        <b>
          A Personal Budget app helpful to easily manage your budgets and
          expenses
        </b>
      </h2>
      <p>
        {" "}
        Please <Link to="/login">Login</Link>/<Link to="/signup">Create</Link>{" "}
        account to view your dashboard
      </p>
    </div>
  );
};

export default Home;
