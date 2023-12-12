import React, { useState, useContext, useEffect } from "react";
import "./AddBudget.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBudget = () => {
  const [inputFields, setInputFields] = useState({
    category: "",
    budget: "",
  });

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated !== "true" && navigate("/login");
  }, [isAuthenticated, navigate]);

  const [dataChange, setDataChange] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [editId, setEditID] = useState(-1);

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleBudget = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://161.35.234.181:3005/api/v1/budget/addbudget",
        inputFields,
        config
      )
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          console.log("res", res);
          setDataChange(!dataChange);
          setInputFields({
            category: "",
            budget: "",
          });
        } else {
          const errorData = res.json();
          console.error("Error ", errorData.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const handleEditBudget = (id) => {
    axios
      .get(`http://161.35.234.181:3005/api/v1/budget/getbudget/${id}`, config)
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          setNewCategory(res.data.budget.category);
          setNewBudget(res.data.budget.budget);
        } else {
          const errorData = res.json();
          console.error("Error ", errorData.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
    setEditID(id);
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://161.35.234.181:3005/api/v1/budget/updatebudget/${editId}`,
        { category: newCategory, budget: newBudget },
        config
      )
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          console.log("res", res);
          setDataChange(!dataChange);
          setNewCategory("");
          setNewBudget("");
          setEditID(-1);
        } else {
          const errorData = res.json();
          console.error("Error ", errorData.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const handleDeleteBudget = (id) => {
    axios
      .delete(
        `http://161.35.234.181:3005/api/v1/budget/deletebudget/${id}`,
        config
      )
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          setDataChange(!dataChange);
          toast.success("Budget deleted successfully");
        } else {
          const errorData = res.json();
          console.error("Error ", errorData.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  useEffect(() => {
    isAuthenticated === "true" &&
      axios
        .get("http://161.35.234.181:3005/api/v1/budget/budgets", config)
        .then((res) => {
          console.log(res);
          if (res.statusText === "OK") {
            console.log("res", res);
            setBudgets(res.data.budgets);
          } else {
            const errorData = res.json();
            console.error("Error", errorData.message);
          }
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
  }, [dataChange]);

  return (
    <div className="container">
      <Toaster />
      <div className="row">
        <div className="col">
          <form
            className="add-budget-form w-100 m-auto"
            onSubmit={handleBudget}
          >
            <h1 className="h3 mb-3 fw-normal">Enter Budget</h1>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={inputFields.category}
                onChange={handleChange}
                placeholder="Enter Budget Category"
                required
              />
              <label for="category">Budget Category</label>
            </div>
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="budget"
                name="budget"
                value={inputFields.budget}
                onChange={handleChange}
                placeholder="Enter Budget"
                required
              />
              <label for="budget">Budget</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Budget Amount($)</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((data, index) =>
              data._id == editId ? (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => setEditID(-1)}
                    >
                      cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.category}</td>
                  <td>{data.budget}</td>
                  <td>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => handleEditBudget(data._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDeleteBudget(data._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddBudget;
