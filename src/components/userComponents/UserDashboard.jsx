import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const UserDashboard = () => {

  const [transaction, settransaction] = useState([]);
  let [income, setincome] = useState(0);
  let [expense, setexpense] = useState(0);
  // const [categories, setcategories] = useState([]);
  const [searchRes, setsearchRes] = useState([]);

  const [graphData, setgraphData] = useState({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    const id = sessionStorage.getItem("id");

    getTransactionByUserId(id);
    // getCategories();
  }, [])

  useEffect(() => {
    const totalIncome = transaction.reduce((acc, curr) => {
      return curr.transactionType.transactionType === "income"
        ?
        acc + curr.amount
        :
        acc
    }, 0)
    setincome(`+${totalIncome}`);

    const totalExpense = transaction.reduce((acc, curr) => {
      return curr.transactionType.transactionType === "expense"
        ?
        acc + curr.amount
        :
        acc
    }, 0)
    setexpense(`-${totalExpense}`);

  }, [transaction])

  const getTransactionByUserId = async (id) => {
    try {
      const data = { userId: id }
      const res = await axios.post("http://localhost:4000/transaction/getTransactionByUserId", data);
      // console.log("tr data..", res);
      settransaction(res.data.data);

      if (res.data.data && res.data.data.length > 0) {

        const transformedData = {
          labels: res.data.data.map((dt) => dt.category.categoryName),
          datasets: [{
            label: "expenses",
            data: res.data.data.map((dt) => dt.amount),
            backgroundColor: ["red", "green", "blue"],
            borderWidth: 1
          }]
        }

        setgraphData(transformedData);
      }

    } catch (err) {
      console.log('getTransaction error :', err);

    }
  }

  // const getCategories = async () => {
  //   try {

  //     const res = await axios.get("http://localhost:4000/category/getCategory");
  //     //  console.log("categories...", res);
  //     setcategories(res.data.data);

  //   } catch (err) {
  //     console.log('getTransaction error :', err);
  //   }
  // }

  // const graphData = {

  // }

  const serachHandler = async (e) => {
    // console.log("inputText contains :", e.target.value); 
    try {
      
      const userId = sessionStorage.getItem("id");
      
      const res = await axios.get("http://localhost:4000/transaction/getFilteredTransactionByUserId/"+userId, {
        params:{
          title:e.target.value
        }
      });
      // console.log("data......", res.data.data);
      setsearchRes(res.data.data);

    } catch (err) {
      console.log("searchHandler error :", err);
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <div className='card'>
            {/* <div className='card-header'>
              <h4>Income</h4>
            </div> */}
            <div className='card-body'>
              <h4 style={{ margin: "0" }}>Total-Income</h4>
              <h5 style={{ color: 'green' }}>{income}</h5>
            </div>
          </div>
        </div>

        <div className='col-md-3'>
          <div className='card'>
            <div className='card-body'>
              <h4 style={{ margin: "0" }}>Total-Expense</h4>
              <h5 style={{ color: 'red' }}>{expense}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Expense Graph</h4>
              {/* <p className="card-category">24 Hours performance</p> */}
            </div>
            <div className="card-body ">
              <div id="chartHours" className="ct-chart">

                <Bar
                  data={graphData}
                />

              </div>
            </div>
            {/* <div className="card-footer ">
              <div className="legend">
                <i className="fa fa-circle text-info" /> Open
                <i className="fa fa-circle text-danger" /> Click
                <i className="fa fa-circle text-warning" /> Click Second Time
              </div>
              <hr />
              <div className="stats">
                <i className="fa fa-history" /> Updated 3 minutes ago
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Search Transaction</h4>
              {/* <p className="card-category">24 Hours performance</p> */}
            </div>
            <div className="card-body ">
              <div id="chartHours" className="ct-chart">

                <input type='text' onChange={(e) => serachHandler(e)} placeholder='search'></input>
                <br/>
                <h3>{searchRes.title}</h3>
                <h4>{searchRes.category.categoryName}</h4>
                <h4>{searchRes.amount}</h4>
                <br/>

              </div>
            </div>
            {/* <div className="card-footer ">
              <div className="legend">
                <i className="fa fa-circle text-info" /> Open
                <i className="fa fa-circle text-danger" /> Click
                <i className="fa fa-circle text-warning" /> Click Second Time
              </div>
              <hr />
              <div className="stats">
                <i className="fa fa-history" /> Updated 3 minutes ago
              </div>
            </div> */}
          </div>
        </div>
      </div>

    </div>
  )
}
