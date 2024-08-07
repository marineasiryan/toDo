import React, { useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import './task.css';

interface TaskProps {
	isChecked: boolean;
	taskName: string;
	handleDeleteTask: (isChecked: boolean) => void;
	handleTaskChecked: (isChecked: boolean) => void;
}

const Task: React.FC<TaskProps> = ({ taskName, isChecked, handleDeleteTask, handleTaskChecked }) => {
	const [localIsChecked, setLocalIsChecked] = useState(isChecked);

	const handleCheckboxChange = () => {
		const newIsChecked = !localIsChecked;
		setLocalIsChecked(newIsChecked);
		handleTaskChecked(newIsChecked);
	};

	const handleDelete = () => {
		handleDeleteTask(isChecked);
	};

	return (
		<div className='task_root'>
			<div className='task_name'>
				<input
					type="checkbox"
					checked={isChecked}
					onChange={handleCheckboxChange}
				/>
				<p className={isChecked ? 'line_through' : ''}>
					{taskName}
				</p>
			</div>
			<button className='deleteBtn' onClick={handleDelete}>
				<MdOutlineDeleteForever
					color="#f54848"
					size="30px"
				/>
			</button>
		</div>
	);
};

export default Task;
