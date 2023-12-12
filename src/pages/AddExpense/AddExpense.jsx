import React, { useState, useEffect } from "react";
import "./AddExpense.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [inputFields, setInputFields] = useState({
    category: "",
    expense: "",
    name: "",
    expensedate: "",
  });

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated !== "true" && navigate("/login");
  }, [isAuthenticated, navigate]);

  const [expenses, setExpenses] = useState([]);
  const [dataChange, setDataChange] = useState(true);
  const [budgets, setBudgets] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [newName, setNewName] = useState("");
  const [newExpense, setNewExpense] = useState("");
  const [newExpenseDate, setNewExpenseDate] = useState("");

  const [editId, setEditID] = useState(-1);

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleExpense = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://161.35.234.181:3005/api/v1/expense/addexpense",
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
            expense: "",
            name: "",
            expensedate: "",
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

  const handleEditExpense = (id) => {
    axios
      .get(`http://161.35.234.181:3005/api/v1/expense/getexpense/${id}`, config)
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          setNewCategory(res.data.expense.category);
          setNewExpense(res.data.expense.expense);
          setNewExpenseDate(res.data.expense.expensedate);
          setNewName(res.data.expense.name);
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
        `http://161.35.234.181:3005/api/v1/expense/updateexpense/${editId}`,
        {
          category: newCategory,
          expense: newExpense,
          name: newName,
          expensedate: newExpenseDate,
        },
        config
      )
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          console.log("res", res);
          setDataChange(!dataChange);
          setNewCategory("");
          setNewExpense("");
          setNewName("");
          setNewExpenseDate("");
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

  const handleDeleteExpense = (id) => {
    axios
      .delete(
        `http://161.35.234.181:3005/api/v1/expense/deleteexpense/${id}`,
        config
      )
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          setDataChange(!dataChange);
          toast.success("Expense deleted successfully");
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
          console.log("dd", res);
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
  }, []);

  useEffect(() => {
    isAuthenticated === "true" &&
      axios
        .get("http://161.35.234.181:3005/api/v1/expense/expenses", config)
        .then((res) => {
          console.log("kk", res);
          if (res.statusText === "OK") {
            console.log("res", res);
            setExpenses(res.data.expenses);
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
            className="add-expense-form w-100 m-auto"
            onSubmit={handleExpense}
          >
            <h1 className="h3 mb-3 fw-normal">Enter Expense</h1>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={inputFields.name}
                onChange={handleChange}
                placeholder="Enter Expense Name"
                required
              />
              <label htmlFor="name">Expense Name</label>
            </div>
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="expense"
                name="expense"
                value={inputFields.expense}
                onChange={handleChange}
                placeholder="Enter expense"
                required
              />
              <label htmlFor="expense">Expense:</label>
            </div>

            <div className="form-floating">
              <input
                type="date"
                className="form-control"
                id="expensedate"
                name="expensedate"
                value={inputFields.expensedate}
                onChange={handleChange}
                placeholder="Enter expense date"
                required
              />
              <label htmlFor="expensedate">Expense Date:</label>
            </div>

            <label htmlFor="category" className="m-2">
              Choose Category:
            </label>

            <select
              name="category"
              id="category"
              value={inputFields.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {budgets.map((budget, i) => (
                <option key={i} value={budget.category}>
                  {budget.category}
                </option>
              ))}
            </select>

            <button className="btn btn-primary w-100 py-2 my-2" type="submit">
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
              <th scope="col">Expense Name</th>
              <th scope="col">Category</th>
              <th scope="col">Expense Amount($)</th>
              <th scope="col">Expense Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((data, index) =>
              data._id == editId ? (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      {budgets.map((budget, i) => (
                        <option key={i} value={budget.category}>
                          {budget.category}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newExpense}
                      onChange={(e) => setNewExpense(e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={newExpenseDate}
                      onChange={(e) => setNewExpenseDate(e.target.value)}
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
                  <td>{data.name}</td>
                  <td>{data.category}</td>
                  <td>{data.expense}</td>
                  <td>{data.expensedate}</td>
                  <td>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => handleEditExpense(data._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDeleteExpense(data._id)}
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

export default AddExpense;
