import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { AppRoutes } from '../constant/AppRoutes'
import Cookies from 'js-cookie'
export default function Task() {
    const { user, setUser } = useContext(AuthContext)
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState('')

    useEffect(() => { getTasks() }, [])

    const getTasks = () => {
        axios.get(AppRoutes.getTask, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then((res) => setTasks(res.data.data))
    }

    const addTasks = () => {
        axios.post(AppRoutes.addTask, { task }, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then((res) => {
            console.log(res.data)
            setTask('')
            getTasks()
        })
    }

    return (
        <div className='container mx-auto'>
            <div className='flex justify-between  my-10'>
                <h1 className='text-3xl font-semibold font-mono'>Hello {user?.fullname}</h1>

                <button className='bg-red-100 rounded p-2 px-4 '
                    onClick={() => {
                        setUser(null)
                        Cookies.set("token", null)

                    }}
                >Logout</button>
            </div>
            <div className='flex gap-3'>
                <input value={task} className='border p-3 flex-grow border-black'
                    onChange={(e) => setTask(e.target.value)}
                    placeholder='Add Task' />

                <button disabled={task.length < 4} className='bg-blue-400 rounded p-2 px-4 text-white' onClick={addTasks}>Add</button>
            </div>

            {
                tasks.map((data) => {
                    return (
                        <div key={data._id}>
                            <h1 className='font-mono font-semibold text-2xl py-4 my-2 bg-slate-50 px-2'>{data.task}</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}