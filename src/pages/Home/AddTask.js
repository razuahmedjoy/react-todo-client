import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../../partials/Loading';

const AddTask = () => {

    const [user, loading] = useAuthState(auth);

    const addTask = (e) => {
        e.preventDefault();
        const task = {

            name: e.target.name.value,
            description: e.target.description.value,
            user: user?.email,
            status: "new"
        }

        fetch("http://localhost:5000/task/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    e.target.reset();
                    toast.success("Task Added SuccessFully")
                }
            })
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="flex justify-center my-5">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="font-bold text-2xl text-center">Add New Task</h2>

                        <form onSubmit={addTask} className="flex flex-col gap-y-4">
                            <input type="text" name="name" placeholder="Task Name.." className="input input-bordered w-full" required />
                            <textarea name="description" placeholder="Task Description" className="textarea textarea-bordered w-full" required></textarea>

                            <input type="submit" className="btn btn-primary" value="Add" />

                        </form>

                    </div>
                </div>


            </div>

            <div className="mb-10">
                <Link className="text-center link" to="/">Go to My Task List</Link>
            </div>
        </>

    );
};

export default AddTask;