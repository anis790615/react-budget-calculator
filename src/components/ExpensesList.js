import React from "react";
import Item from "./ExpenseItem";
import {MdDelete} from "react-icons/md";

const ExpensesList = ({expenses, clearItems, handleEdit, handleDelete}) => {
    return (
        <>
            <ul className="list">
                {expenses.map((expense) => {
                    return (
                        <Item
                            expense={expense}
                            key={expense.id}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    );
                })}
            </ul>
            {expenses.length > 0 && (
                <button className="btn" onClick={clearItems}>
                    clear expenses <MdDelete className="btn-icon" />
                </button>
            )}
        </>
    );
};
export default ExpensesList;
