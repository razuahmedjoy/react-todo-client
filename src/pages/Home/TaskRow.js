import React, { useState } from 'react';
import toast from 'react-hot-toast';

const TaskRow = ({ task, index, refetch }) => {
    const { name, description,status } = task

    const [loading, setLoading] = useState(false)


    const markComplete = () => {
        setLoading(true)

        fetch(`https://radiant-hamlet-16277.herokuapp.com/task/update/${task._id}`, {
            method: "PUT",

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    
                    toast.success("Completed the task");
                    refetch()
                    setLoading(false)

                }
            })
    }

    
    const deleteTask = () => {

        fetch(`https://radiant-hamlet-16277.herokuapp.com/task/delete/${task._id}`,{
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount) {
                toast.success("Deleted the task");
                refetch()
            }
        })

    }


    return (
        <tr>
            <th>{index + 1}</th>
            {
                status === "new" ?
                    <td>{name}</td>

                    :

                    <td><del>{name}</del></td>


            }
            <td>{description}</td>

            <td className="flex gap-1">
                <button onClick={deleteTask} className="btn btn-xs btn-error">Delete</button>
                {status !== 'completed' && <button onClick={markComplete} className="btn btn-xs btn-info">Completed</button>
}
            </td>
        </tr>
    );
};

export default TaskRow;