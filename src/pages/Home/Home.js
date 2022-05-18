import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../../partials/Loading';
import AddTask from './AddTask';
import TaskRow from './TaskRow';

const Home = () => {

    

    const [user, loading] = useAuthState(auth);

    const { isLoading, error, data:tasks, refetch } = useQuery(['tasks', user], () =>
        fetch(`http://localhost:5000/tasks/${user?.email}`).then(res =>
            res.json()
        ))



    if (loading || isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className="text-3xl py-5">My Task List</h2>
            <Link to="/add-task" className="btn btn-xs btn-success text-white">Add New Task</Link>



            <div className="max-w-2xl mx-auto mb-32 my-10 shadow-lg">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {tasks ?
                                tasks.map((task, index) => <TaskRow key={task._id} task={task} index={index} refetch={refetch} />)
                                :
                                <tr className="text-error text-center">
                                    <td colSpan="4">There is no Tasks on your list</td></tr>
                            }


                        </tbody>



                    </table>


                </div>


            </div>
        </div>
    );
};

export default Home;