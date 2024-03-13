import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const UpdateGoal = () => {

    const [user, setuser] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem("id");
        setuser(userId);

    }, []);

    const { register, handleSubmit } = useForm();
    const goalId = useParams().id;
    const submitHandler = async (data) => {
        try {
            const res = await axios.put("http://localhost:4000/goal/updateGoalById/" + goalId, data);

            if (res.status === 200) {
                alert("goal updaated successfully");
            }

        } catch (err) {
            console.log("goal updation error :", err);
        }

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Update Goal</h4>
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
                                    Update Goal
                                </button>
                                <div className="clearfix" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
