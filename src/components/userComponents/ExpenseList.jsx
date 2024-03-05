import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const ExpenseList = () => {

  let [count, setcount] = useState(0)

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    //console.log('user id...',userId);

    getTransactionByUserId(id);
  }, [count])

  const [transaction, settransaction] = useState([]);
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

  const deleteTransaction = async (id) => {
    try {
      const res = await axios.delete("http://localhost:4000/transaction/deleteTransactionById/" + id);
      if (res.status === 200) {
        alert('transaction deleted');
        count++;
        setcount(count)
      }
    }
    catch (err) {
      console.log('deleteTransaction error :', err);
    }

  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-plain table-plain-bg">
            <div className="card-header ">
              <h4 className="card-title">Transactions List</h4>
              {/* <p className="card-category">Here is a subtitle for this table</p> */}
            </div>
            <div className="card-body table-full-width table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>category</th>
                    <th>subCategory</th>
                    <th>amount</th>
                    <th>transaction date</th>
                    <th>transaction type</th>
                    <th>payment type</th>
                    <th>payee</th>
                    <th>user</th>
                    <th>description</th>
                    <th>status</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.map((tr) => {
                    return (
                      <tr>
                        <td>{tr.category.categoryName}</td>
                        <td>{tr.subCategory.subCategoryName}</td>
                        {tr.transactionType.transactionType === "expense" 
                        ? 
                        <td style={{color:'red'}}>{`-${tr.amount}`}</td>
                        : 
                        <td style={{color:'green'}}>{`+${tr.amount}`}</td>}
                        <td>{tr.transactionDateTime}</td>
                        <td>{tr.transactionType.transactionType}</td>
                        <td>{tr.paymentType.paymentType}</td>
                        <td>{tr.payee.payeeName}</td>
                        <td>{tr.user.firstName}</td>
                        <td>{tr.description}</td>
                        <td>{tr.status}</td>
                        <td><Link to={`/user/updateExpense/${tr._id}`} className='btn btn-round btn-primary'>update</Link>
                          <button onClick={() => { deleteTransaction(tr._id) }} className='btn btn-round btn-danger'>delete</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
