import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

export const BarChart = () => {

    const [transaction, settransaction] = useState([]);

    const [graphData, setgraphData] = useState({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        const id = sessionStorage.getItem("id");

        getTransactionByUserId(id);
        // getCategories();
    }, [])

    const getTransactionByUserId = async (id) => {
        try {
            const data = { userId: id }
            const res = await axios.post("http://localhost:4000/transaction/getTransactionByUserId", data);
            // console.log("tr data..", res);
            settransaction(res.data.data);

            if (res.data.data && res.data.data.length > 0) {

                const categoryMap = {};

                res.data.data.forEach((transaction) => {

                    if (transaction.transactionType.transactionType === "expense") {

                        const catName = transaction.category.categoryName;

                        if (categoryMap[catName]) {
                            categoryMap[catName] += transaction.amount;
                        } else {
                            categoryMap[catName] = transaction.amount;
                        }
                    }
                });

                const data = {
                    labels: Object.keys(categoryMap),
                    datasets: [{
                        label: 'Total Expenses',
                        backgroundColor: ['#ff6300', '#ff6361', '#58508d'],
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 1,
                        data: Object.values(categoryMap),

                    }]
                }
                setgraphData(data)
            }

        } catch (err) {
            console.log('getTransaction error :', err);
        }
    }

    return (
        <div>
            <div style={{ display: 'inline-block' }}>
                <Bar
                    data={graphData}
                />
            </div>
        </div>

    )
}

export const PieChart = () => {
    const vat = "pieChart function";
    return (
        <div>
            <h1>{vat}</h1>
        </div>
    )
}

