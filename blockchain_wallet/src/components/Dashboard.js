import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState({});
  const [arrayOfTrans, setArrayOfTrans] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/chain").then(res => {
      setData(res.data.chain);
    });
  }, []);

  let amountsArray =
    data.length > 0 &&
    data.map(trans => {
      return trans.transactions.map(entries => {
        return entries.amount;
      });
    });

  let mergedArray = amountsArray.length > 0 && amountsArray.flat(1);
  let amountTotal =
    mergedArray.length > 0 && mergedArray.reduce((a, b) => a + b, 0);

  console.log(amountTotal);

  return (
    <div>
      <div className="trans-container">
        {data.length > 0 &&
          data.map(trans => {
            return trans.transactions.map((entries, index) => {
              return (
                <div key={index}>
                  <p>Amount: {entries.amount}</p>
                  <p>Recipient: {entries.recipient}</p>
                  <p>Sender: {entries.sender}</p>
                </div>
              );
            });
          })}
      </div>
      <h1>Total in Wallet: {amountTotal}</h1>
    </div>
  );
}

export default Dashboard;
