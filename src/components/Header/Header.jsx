import React, { useEffect, useState } from "react";

import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  let isAuthenticated = localStorage.getItem("isAuthenticated");
  const navigate = useNavigate();
  let jwtToken = localStorage.getItem("token");
  const [expTime, setExpTime] = useState(null);
  const [model, setModel] = useState(false);

  useEffect(() => {
    let time;

    if (jwtToken) {
      console.log("token creared");
      const expirationTime = new Date().getTime() + 3 * 60 * 1000;
      const remaining = expirationTime - Date.now();
      setExpTime(remaining);

      time = setInterval(() => {
        const remaining = expirationTime - Date.now();
        setExpTime(remaining);

        if (remaining <= 20000) {
          console.log("timer called");
          setModel(true);
        }

        if (remaining <= 0) {
          setModel(false);
          handleLogout();
        }
      }, 1000); // Update remaining time every second

      return () => clearInterval(time);
    }
  }, [jwtToken]);

  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };

  const handleRefreshToken = () => {
    axios
      .post("http://161.35.234.181:3005/api/v1/users/refreshToken", {}, config)
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          localStorage.setItem("token", res.data.newAccessToken);
          jwtToken = res.data.newAccessToken;
          setModel(false);
        } else {
          const errorData = res.json();
          console.error("Error signing the user:", errorData.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("isAuthenticated", "false");
    isAuthenticated = "false";
    jwtToken = null;
    navigate("/login");
  };

  return (
    <>
      <div className="page-header container-fluid">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link
              to="/"
              className="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <h1 className="page-title">
                <b>Personal Budget</b>
              </h1>
            </Link>
          </div>

          <ul className="normallinks nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 link-secondary">
                <b>Home</b>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link px-2 link-secondary">
                <b>Contact</b>
              </Link>
            </li>
            {isAuthenticated === "true" ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="nav-link px-2 link-secondary"
                  >
                    <b>Dashboard</b>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addBudget"
                    className="nav-link px-2 link-secondary"
                  >
                    <b>Add Budget</b>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addExpense"
                    className="nav-link px-2 link-secondary"
                  >
                    <b>Add Expense</b>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>

          <div className="col-md-3 text-end">
            {isAuthenticated !== "true" ? (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    className="login btn btn-outline-primary me-2"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button type="button" className="signup btn btn-primary">
                    Sign-up
                  </button>
                </Link>
              </>
            ) : (
              <button
                type="button"
                className="logout btn btn-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </header>
      </div>
      {model && (
        <div
          class="modal show fade"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
          tabindex="-1"
          role="dialog"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Sign In Again</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>
                  Your session is about to expire please click on refresh to
                  continue.
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleRefreshToken}
                >
                  Refresh
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={(e) => setModel(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
