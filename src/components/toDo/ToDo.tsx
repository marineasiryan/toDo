import React, { useState, useEffect } from "react";
import Task from "../task/Task";
import { FaPlus } from "react-icons/fa";

import './toDo.css';

interface TaskType {
    name: string;
    isChecked: boolean;
}

const ToDo: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [submittedTasks, setSubmittedTasks] = useState<TaskType[]>([]);
    const [completedCount, setCompletedCount] = useState(0);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        console.log('savedTasks', savedTasks);
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);
            setSubmittedTasks(parsedTasks);
            const completed = parsedTasks.filter((task: TaskType) => task.isChecked).length;
            setCompletedCount(completed);
        }
        setIsInitialLoad(false);
    }, []);

    useEffect(() => {
        if (!isInitialLoad) {
            localStorage.setItem('tasks', JSON.stringify(submittedTasks));
        }
    }, [submittedTasks, isInitialLoad]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTask = { name: taskName, isChecked: false };
        const updatedTasks = [...submittedTasks, newTask];
        setSubmittedTasks(updatedTasks);
        setTaskName('');
    };

    const handleDeleteTask = (index: number, isChecked: boolean) => {
        const updatedTasks = submittedTasks.filter((_, i) => i !== index);
        setSubmittedTasks(updatedTasks);
        if (isChecked) {
            setCompletedCount(Math.max(0, completedCount - 1));
        }
    };

    const handleTaskChecked = (index: number, isChecked: boolean) => {
        const updatedTasks = [...submittedTasks];
        updatedTasks[index].isChecked = isChecked;
        setSubmittedTasks(updatedTasks);
        setCompletedCount(isChecked ? completedCount + 1 : Math.max(0, completedCount - 1));
    };

    return (
        <div className='root'>
            <div className='header'>
                <p className='title'> Completed: {completedCount} </p>
                <form className='form' onSubmit={handleSubmit}>
                    <input
                        className='form_input'
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                        type="text"
                        placeholder="Enter task"
                    />
                    <button className='addBtn' type="submit" disabled={!taskName}>
                        <FaPlus color='white' size={20} />
                    </button>
                </form>
            </div>
            <div className='tasks'>
                {submittedTasks.map((task, index) => (
                    <Task
                        key={index}
                        taskName={task.name}
                        isChecked={task.isChecked}
                        handleDeleteTask={() => handleDeleteTask(index, task.isChecked)}
                        handleTaskChecked={(isChecked: boolean) => handleTaskChecked(index, isChecked)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ToDo;
