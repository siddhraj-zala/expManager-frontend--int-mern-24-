import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

export const AddGoal = () => {

    const [user, setuser] = useState(null);
    const [goal, setgoal] = useState([]);
    var [count, setcount] = useState(0); // to call useEffect whenever the form is submitted

    useEffect(() => {
        const userId = sessionStorage.getItem("id");
        setuser(userId) // to access userId in form

        getGoalsByUserId(userId);

    }, [count]);

    const getGoalsByUserId = async (userId) => {
        try {
            const goalData = await axios.get("http://localhost:4000/goal/getGoalByUserId/" + userId);
            //console.log("user goals...", goalData);
            setgoal(goalData.data.data);

        } catch (err) {
            console.log("getGoalsByUserId error :", err);
        }
    }

    const { register, handleSubmit } = useForm();
    const submitHandler = async (data) => {
        try {
            const res = await axios.post("http://localhost:4000/goal/createGoal", data);
            //console.log("createGoal res.", res);
            if (res.status === 201) {
                alert("goal created successfully");
                count ++;
                setcount(count);
            }

        } catch (err) {
            console.log("goal creation error :", err);
        }

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Create New Goal</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>

                                <div className="row">
                                    <div className="col-md-2 pr-1">
                                        <div className="form-group">
                                            <label htmlFor='goalName'>Goal:</label>
                                            <input
                                                type='text' {...register('goalName')}
                                                className="form-control"
                                                disabled=""
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-2 pr-1">
                                        <div className="form-group">
                                            <label htmlFor='goalAmount'>Max-Expenditure:</label>
                                            <input
                                                type='text' {...register('goalAmount')}
                                                className="form-control"
                                                disabled=""
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-2 pr-1">
                                        <div className="form-group">
                                            <label htmlFor='startDate'>Starting-Date:</label>
                                            <input
                                                type='datetime-local' {...register('startDate')}
                                                className="form-control"
                                                disabled=""
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-2 pr-1">
                                        <div className="form-group">
                                            <label htmlFor='endDate'>Ending-Date:</label>
                                            <input
                                                type='datetime-local' {...register('endDate')}
                                                className="form-control"
                                                disabled=""
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-2 pr-1">
                                        <div className="form-group">
                                            <label htmlFor='transactionDateTime'>User</label>
                                            <select {...register("user")} className="form-control">
                                                <option value={user}>logged-in user({user})</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-info btn-fill">
                                    Create Goal
                                </button>
                                <div className="clearfix" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card card-plain table-plain-bg">
                        <div className="card-header ">
                            <h4 className="card-title">My Goals</h4>
                            {/* <p className="card-category">Here is a subtitle for this table</p> */}
                        </div>
                        <div className="card-body table-full-width table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>user</th>
                                        <th>goal</th>
                                        <th>max-expenditure</th>
                                        <th>start date</th>
                                        <th>end date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {goal.map((tr) => {
                                        return (
                                            <tr>
                                                <td>{tr.user.firstName}</td>
                                                <td>{tr.goalName}</td>
                                                <td>{tr.goalAmount}</td>
                                                <td>{tr.startDate}</td>
                                                <td>{tr.endDate}</td>
                                                
                                                {/* <td><Link to={`/user/updateExpense/${tr._id}`} className='btn btn-round btn-primary'>update</Link>
                                                    <button onClick={() => { deleteTransaction(tr._id) }} className='btn btn-round btn-danger'>delete</button>
                                                </td> */}
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
