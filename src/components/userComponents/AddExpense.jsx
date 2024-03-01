import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

export const AddExpense = () => {

  useEffect(() => {
    getUser();
    getPayee();
    getCategory();
    getSubCategory();
    getTransactionType();
    getPaymentType();
  }, [])

  const userId = sessionStorage.getItem("id");

  const [user, setuser] = useState([]); //contains the data of logged-in user
  //console.log('first name', user.firstName);
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/getUserById/" + userId);
      //console.log("user", res);
      setuser(res.data.data);

    } catch (err) {
      console.log('getUser error :', err);
    }
  }

  const [payee, setpayee] = useState([]);
  const getPayee = async () => {
    try {
      const res = await axios.get("http://localhost:4000/payee/getPayee");
      //console.log("payee", res);
      setpayee(res.data.data);

    } catch (err) {
      console.log('getPayee error :', err);
    }
  }

  const [category, setcategory] = useState([]);
  const getCategory = async () => {
    try {
      const res = await axios.get("http://localhost:4000/category/getCategory");
      setcategory(res.data.data);

    } catch (err) {
      console.log('getCategory error :', err);
    }
  }

  const [subCategory, setsubCategory] = useState([]);
  const getSubCategory = async () => {
    try {
      const res = await axios.get("http://localhost:4000/subCategory/getSubCategory");
      setsubCategory(res.data.data);

    } catch (err) {
      console.log('getSubCategory error :', err);
    }
  }

  const [transactionType, settransactionType] = useState([]);
  const getTransactionType = async () => {
    try {
      const res = await axios.get("http://localhost:4000/transactionType/getTransactionType");
      settransactionType(res.data.data);

    } catch (err) {
      console.log('getTransactionType error :', err);
    }
  }

  const [paymentType, setpaymentType] = useState([]);
  const getPaymentType = async () => {
    try {
      const res = await axios.get("http://localhost:4000/paymentType/getPaymentType");
      setpaymentType(res.data.data);

    } catch (err) {
      console.log('getPaymentType error :', err);
    }
  }

  const sendMail = async (data) => {
    try {
      const mailData = {
        to: user.email,
        subject: "transaction created",
        html: `
        <html>
            <head>
                <style>
                   body {
                     font-family: Arial, sans-serif;
                    }
                   .container {
                     max-width: 600px;
                     margin: 0 auto;
                     padding: 20px;
                     background-color: #f9f9f9;
                    }
                </style>
            </head>
            <body>
                <div class="container" id="div1">
                    <h3>Hello ${user.firstName}! your transaction is created as follows:</h3>
                    <p>${JSON.stringify(data)}</p>
                </div>
            </body>
        </html> 
        `
      }
      const mailRes = await axios.post("http://localhost:4000/mail/sendMail", mailData);

    } catch (err) {
      console.log("sendMail error :", err);
    }
  }

  const { register, handleSubmit } = useForm();
  const submitHandler = async (data) => {
    //console.log('form data', data);
    try {
      const res = await axios.post("http://localhost:4000/transaction/createTransaction", data);
      if (res.status === 201) {
        alert('transaction created');
        //console.log("transaction data :", res.data.data);
        const getTrById = await axios.get("http://localhost:4000/transaction/getTransactionById/" + res.data.data._id);
        //console.log('transaction by id...', getTrById.data.data);
        sendMail(getTrById.data.data);
      }
    }
    catch (err) {
      console.log("transaction creation error :", err);
    }

  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Create Transaction</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="row">
                  <div className="col-md-5 pr-1">
                    <div className="form-group">
                      <label htmlFor='transactionDateTime'>Date & Time</label>
                      <input
                        type='datetime-local' {...register('transactionDateTime')}
                        className="form-control"
                        disabled=""
                      />
                    </div>
                  </div>
                  <div className="col-md-3 px-1">
                    <div className="form-group">
                      <label htmlFor='category'>Category:</label>
                      <select {...register('category')} className="form-control">
                        {category.map((dt) => {
                          return (<option value={dt._id}>{dt.categoryName}</option>)
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 pl-1">
                    <div className="form-group">
                      <label htmlFor='subCategory'>Sub category:</label>
                      <select {...register('subCategory')} className="form-control">
                        {subCategory.map((dt) => {
                          return (<option value={dt._id}>{dt.subCategoryName}</option>)
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label htmlFor='user'>User:</label>
                      <select {...register('user')} className="form-control">
                        <option value={user._id}>{user.firstName}</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label htmlFor='payee'>Payee:</label>
                      <select {...register('payee')} className="form-control">
                        {payee.map((dt) => {
                          return (<option value={dt._id}>{dt.payeeName}</option>)
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 pr-1">
                    <div className="form-group">
                      <label htmlFor='transactionType'>Transaction type:</label>
                      <select {...register('transactionType')} className="form-control">
                        {transactionType.map((dt) => {
                          return (<option value={dt._id}>{dt.transactionType}</option>)
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 px-1">
                    <div className="form-group">
                      <label htmlFor='paymentType'>Payment type:</label>
                      <select {...register('paymentType')} className="form-control">
                        {paymentType.map((dt) => {
                          return (<option value={dt._id}>{dt.paymentType}</option>)
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 pl-1">
                    <div className="form-group">
                      <label htmlFor='amount'>Amount:</label>
                      <input type='text' {...register('amount')} className="form-control"></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor='description'>Description:</label>
                      <textarea {...register('description')}
                        rows={4}
                        cols={80}
                        className="form-control"
                        placeholder="Here can be your description"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor='status'>Status:</label>
                      <input type='text' {...register('status')} className="form-control"></input>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-info btn-fill pull-right">
                  Create
                </button>
                <div className="clearfix" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <h1>AddExpense</h1>

    //   <form onSubmit={handleSubmit(submitHandler)}>
    //     <div>
    //       <label htmlFor='user'>User:</label>
    //       <select {...register('user')}>
    //         <option value={user._id}>{user.firstName}</option>
    //       </select>
    //     </div>
    //     <div>
    //       <label htmlFor='payee'>Payee:</label>
    //       <select {...register('payee')}>
    //         {payee.map((dt) => {
    //           return (<option value={dt._id}>{dt.payeeName}</option>)
    //         })}
    //       </select>
    //     </div>
    //     <div>
    //       <label htmlFor='transactionDateTime'>Date-Time:</label>
    //       <input type='datetime-local' {...register('transactionDateTime')}></input>
    //     </div>
    //     <div>
    //       <label htmlFor='category'>Category:</label>
    //       <select {...register('category')}>
    //         {category.map((dt) => {
    //           return (<option value={dt._id}>{dt.categoryName}</option>)
    //         })}
    //       </select>
    //     </div>
    //     <div>
    //       <label htmlFor='subCategory'>Sub category:</label>
    //       <select {...register('subCategory')}>
    //         {subCategory.map((dt) => {
    //           return (<option value={dt._id}>{dt.subCategoryName}</option>)
    //         })}
    //       </select>
    //     </div>
    //     <div>
    //       <label htmlFor='transactionType'>Transaction type:</label>
    //       <select {...register('transactionType')}>
    //         {transactionType.map((dt) => {
    //           return (<option value={dt._id}>{dt.transactionType}</option>)
    //         })}
    //       </select>
    //     </div>
    //     <div>
    //       <label htmlFor='paymentType'>Payment type:</label>
    //       <select {...register('paymentType')}>
    //         {paymentType.map((dt) => {
    //           return (<option value={dt._id}>{dt.paymentType}</option>)
    //         })}
    //       </select>
    //     </div>
    //     <div>
    //       <label htmlFor='amount'>Amount:</label>
    //       <input type='text' {...register('amount')}></input>
    //     </div>
    //     <div>
    //       <label htmlFor='description'>Description:</label>
    //       <textarea {...register('description')}></textarea>
    //     </div>
    //     <div>
    //       <label htmlFor='status'>Status:</label>
    //       <input type='text' {...register('status')}></input>
    //     </div>
    //     <div>
    //       <input type='submit' value='submit'></input>
    //     </div>
    //   </form>

    // </div>
  )
}
