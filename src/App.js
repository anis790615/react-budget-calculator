import React, {useState} from "react";
import "./App.css";
import ExpenseList from "./components/ExpensesList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import {v4 as uuidv4} from "uuid";

const initialExpenses = [
    {id: uuidv4(), charge: "rent", amount: 1600},
    {id: uuidv4(), charge: "car payment", amount: 400},
    {id: uuidv4(), charge: "credit card bill", amount: 1200},
];
// console.log(initialExpenses);
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
            const singleExpense = {id: uuidv4, charge, amount};
            setExpenses([...expenses, singleExpense]);
            setCharge("");
            setAmount("");
            handleAlert({type: "success", text: "Item Added"});
        } else {
            handleAlert({
                type: "danger",
                text: "Charge can't be empty and/or amount can't be zero",
            });
        }
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
                />
                <ExpenseList expenses={expenses} />
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
