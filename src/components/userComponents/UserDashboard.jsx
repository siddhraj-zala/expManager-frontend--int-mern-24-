import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export const UserDashboard = () => {

  const [transaction, settransaction] = useState([]);
  let [income, setincome] = useState(0);
  let [expense, setexpense] = useState(0);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    getTransactionByUserId(id);
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
      //console.log("tr data..",res);
      settransaction(res.data.data);
    } catch (err) {
      console.log('getTransaction error :', err);

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
        <div className="col-md-4">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Email Statistics</h4>
              <p className="card-category">Last Campaign Performance</p>
            </div>
            <div className="card-body ">
              <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                <svg
                  // xmlns:ct="http://gionkunz.github.com/chartist-js/ct"
                  width="100%"
                  height="100%"
                  className="ct-chart-pie"
                  style={{ width: "100%", height: "100%" }}
                >
                  <g className="ct-series ct-series-c">
                    <path
                      d="M154.5,5A117.5,117.5,0,0,0,79.287,32.227L154.5,122.5Z"
                      className="ct-slice-pie"
                    // ct:value={11}
                    />
                  </g>
                  <g className="ct-series ct-series-b">
                    <path
                      d="M79.603,31.965A117.5,117.5,0,0,0,132.886,237.995L154.5,122.5Z"
                      className="ct-slice-pie"
                    // ct:value={36}
                    />
                  </g>
                  <g className="ct-series ct-series-a">
                    <path
                      d="M132.483,237.919A117.5,117.5,0,1,0,154.5,5L154.5,122.5Z"
                      className="ct-slice-pie"
                    // ct:value={53}
                    />
                  </g>
                  <g>
                    <text
                      dx="212.98926542043094"
                      dy="128.02886340746272"
                      textAnchor="middle"
                      className="ct-label"
                    >
                      53%
                    </text>
                    <text
                      dx="97.59573928369292"
                      dy="137.11053087093524"
                      textAnchor="middle"
                      className="ct-label"
                    >
                      36%
                    </text>
                    <text
                      dx="134.5991471855891"
                      dy="67.22325482393927"
                      textAnchor="middle"
                      className="ct-label"
                    >
                      11%
                    </text>
                  </g>
                </svg>
              </div>
              <div className="legend">
                <i className="fa fa-circle text-info" /> Open
                <i className="fa fa-circle text-danger" /> Bounce
                <i className="fa fa-circle text-warning" /> Unsubscribe
              </div>
              <hr />
              <div className="stats">
                <i className="fa fa-clock-o" /> Campaign sent 2 days ago
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Users Behavior</h4>
              <p className="card-category">24 Hours performance</p>
            </div>
            <div className="card-body ">
              <div id="chartHours" className="ct-chart">
                <svg
                  // xmlns:ct="http://gionkunz.github.com/chartist-js/ct"
                  width="100%"
                  height="245px"
                  className="ct-chart-line"
                  style={{ width: "100%", height: 245 }}
                >
                  <g className="ct-grids">
                    <line
                      y1={210}
                      y2={210}
                      x1={50}
                      x2={664}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="185.625"
                      y2="185.625"
                      x1={50}
                      x2={664}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="161.25"
                      y2="161.25"
                      x1={50}
                      x2={664}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="136.875"
                      y2="136.875"
                      x1={50}
                      x2={664}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="112.5"
                      y2="112.5"
                      x1={50}
                      x2={664}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="88.125"
                      y2="88.125"
                      x1={50}
                      x2={664}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="63.75"
                      y2="63.75"
                      x1={50}
                      x2={664}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="39.375"
                      y2="39.375"
                      x1={50}
                      x2={664}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1={15}
                      y2={15}
                      x1={50}
                      x2={664}
                      className="ct-grid ct-vertical"
                    />
                  </g>
                  <g>
                    <g className="ct-series ct-series-a">
                      <path
                        d="M50,210L50,140.044C75.583,140.044,101.167,116.156,126.75,116.156C152.333,116.156,177.917,90.563,203.5,90.563C229.083,90.563,254.667,90.075,280.25,90.075C305.833,90.075,331.417,74.963,357,74.963C382.583,74.963,408.167,67.163,433.75,67.163C459.333,67.163,484.917,39.863,510.5,39.863C536.083,39.863,561.667,40.594,587.25,40.594C612.833,40.594,638.417,26.7,664,26.7C689.583,26.7,715.167,17.925,740.75,17.925C766.333,17.925,791.917,3.787,817.5,3.787C843.083,3.787,868.667,-20.1,894.25,-20.1L894.25,210Z"
                        className="ct-area"
                      // ct:values="[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]"
                      />
                    </g>
                    <g className="ct-series ct-series-b">
                      <path
                        d="M50,210L50,193.669C75.583,193.669,101.167,172.95,126.75,172.95C152.333,172.95,177.917,175.144,203.5,175.144C229.083,175.144,254.667,151.5,280.25,151.5C305.833,151.5,331.417,140.044,357,140.044C382.583,140.044,408.167,128.344,433.75,128.344C459.333,128.344,484.917,103.969,510.5,103.969C536.083,103.969,561.667,103.481,587.25,103.481C612.833,103.481,638.417,78.619,664,78.619C689.583,78.619,715.167,77.887,740.75,77.887C766.333,77.887,791.917,77.4,817.5,77.4C843.083,77.4,868.667,52.294,894.25,52.294L894.25,210Z"
                        className="ct-area"
                      // ct:values="[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]"
                      />
                    </g>
                    <g className="ct-series ct-series-c">
                      <path
                        d="M50,210L50,204.394C75.583,204.394,101.167,182.456,126.75,182.456C152.333,182.456,177.917,193.669,203.5,193.669C229.083,193.669,254.667,183.675,280.25,183.675C305.833,183.675,331.417,163.688,357,163.688C382.583,163.688,408.167,151.744,433.75,151.744C459.333,151.744,484.917,135.169,510.5,135.169C536.083,135.169,561.667,134.925,587.25,134.925C612.833,134.925,638.417,102.994,664,102.994C689.583,102.994,715.167,110.063,740.75,110.063C766.333,110.063,791.917,110.063,817.5,110.063C843.083,110.063,868.667,85.931,894.25,85.931L894.25,210Z"
                        className="ct-area"
                      // ct:values="[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]"
                      />
                    </g>
                  </g>
                  <g className="ct-labels">
                    <foreignObject
                      style={{ overflow: "visible" }}
                      x={50}
                      y={215}
                      width="76.75"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 77, height: 20 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        9:00AM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      x="126.75"
                      y={215}
                      width="76.75"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 77, height: 20 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        12:00AM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      x="203.5"
                      y={215}
                      width="76.75"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 77, height: 20 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        3:00PM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      x="280.25"
                      y={215}
                      width="76.75"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 77, height: 20 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        6:00PM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      x={357}
                      y={215}
                      width="76.75"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 77, height: 20 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        9:00PM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      x="433.75"
                      y={215}
                      width="76.75"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 77, height: 20 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        12:00PM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      x="510.5"
                      y={215}
                      width="76.75"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 77, height: 20 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        3:00AM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      x="587.25"
                      y={215}
                      width="76.75"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 77, height: 20 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        6:00AM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      y="185.625"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        0
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      y="161.25"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        100
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      y="136.875"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        200
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      y="112.5"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        300
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      y="88.125"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        400
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      y="63.75"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        500
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      y="39.375"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        600
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      y={15}
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        700
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: "visible" }}
                      y={-15}
                      x={10}
                      height={30}
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 30, width: 30 }}
                      // xmlns="http://www.w3.org/1999/xhtml"
                      >
                        800
                      </span>
                    </foreignObject>
                  </g>
                </svg>
              </div>
            </div>
            <div className="card-footer ">
              <div className="legend">
                <i className="fa fa-circle text-info" /> Open
                <i className="fa fa-circle text-danger" /> Click
                <i className="fa fa-circle text-warning" /> Click Second Time
              </div>
              <hr />
              <div className="stats">
                <i className="fa fa-history" /> Updated 3 minutes ago
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
