import React, {useState, useEffect} from "react";
import "./App.css";
import ExpenseList from "./components/ExpensesList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import {v4 as uuidv4} from "uuid";

// const initialExpenses = [
//     {id: uuidv4(), charge: "rent", amount: 1600},
//     {id: uuidv4(), charge: "car payment", amount: 400},
//     {id: uuidv4(), charge: "credit card bill", amount: 1200},
// ];
// console.log(initialExpenses);
const initialExpenses = localStorage.getItem("expenses")
    ? JSON.parse(localStorage.getItem("expenses"))
    : [];
function App() {
    // ******************** state values **********************
    // all expenses , add expense
    const [expenses, setExpenses] = useState(initialExpenses);
    // single expense
    const [charge, setCharge] = useState("");
    // single amount
    const [amount, setAmount] = useState("");
    // alert
    const [alert, setAlert] = useState({show: false});
    //edit
    const [edit, setEdit] = useState(false);
    //edit item
    const [id, setId] = useState(0);
    // ******************** useEffect **************************
    useEffect(() => {
        console.log("We called useEffect");
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);
    // ******************** functionality **********************
    // Handle charge
    const handleCharge = (e) => {
        setCharge(e.target.value);
    };
    // Handle amount
    const handleAmount = (e) => {
        setAmount(e.target.value);
    };
    // Handle alert
    const handleAlert = ({type, text}) => {
        setAlert({
            show: true,
            type,
            text,
        });
        setTimeout(() => {
            setAlert({show: false});
        }, 2000);
    };
    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (charge !== "" && amount > 0) {
            if (edit) {
                setExpenses(
                    expenses.map((item) => {
                        return item.id === id
                            ? {...item, charge, amount}
                            : item;
                    })
                );
                handleAlert({type: "success", text: "Item Updated"});
                setEdit(false);
            } else {
                const singleExpense = {id: uuidv4, charge, amount};
                setExpenses([...expenses, singleExpense]);
                handleAlert({type: "success", text: "Item Added"});
            }
            setCharge("");
            setAmount("");
        } else {
            // Call handle alert
            handleAlert({
                type: "danger",
                text: "Charge can't be empty and/or amount can't be zero",
            });
        }
    };
    // Clear all Items
    const clearItems = () => {
        setExpenses([]);
        handleAlert({type: "danger", text: "All items deleted"});
    };
    // Delete Item
    const handleDelete = (id) => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
        handleAlert({type: "danger", text: "Item deleted"});
    };
    // Edit Item
    const handleEdit = (id) => {
        let expense = expenses.find((expense) => (expense.id = id));
        setCharge(expense.charge);
        setAmount(expense.amount);
        setEdit(true);
        setId(expense.id);
        console.log(expense);
    };

    return (
        <>
            {alert.show && <Alert type={alert.type} text={alert.text} />}

            <h1>React Budget Calulator</h1>
            <main className="App">
                <ExpenseForm
                    charge={charge}
                    amount={amount}
                    handleCharge={handleCharge}
                    handleAmount={handleAmount}
                    handleSubmit={handleSubmit}
                    edit={edit}
                />
                <ExpenseList
                    expenses={expenses}
                    clearItems={clearItems}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            </main>
            <h1>
                total spending :{" "}
                <span className="total">
                    €{" "}
                    {expenses.reduce((acc, curr) => {
                        return (acc += parseInt(curr.amount));
                    }, 0)}
                </span>
            </h1>
        </>
    );
}

export default App;
