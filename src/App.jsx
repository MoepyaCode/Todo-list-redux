import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  completeTask,
  deleteTask,
  updateTask,
} from "./features/tasks";
import "./styles/index.css";

export default function App() {
  const taskRef = useRef();
  const [completeCount, setCompleteCount] = useState(0);
  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskRef.current.value) {
      return -console.error("No entry was made");
    }

    const id = crypto.randomUUID();
    const task = taskRef.current.value;
    const complete = false;
    dispatch(addTask({ id, task, complete }));
    e.target.reset();
  }

  function handleUpdate({ e, task }) {
    const data = { ...task, task: e.target.value };
    dispatch(updateTask(data));
  }

  function handleComplete({ e, task }) {
    const data = { ...task, complete: e.target.checked };
    dispatch(completeTask(data));
  }

  function handleDelete({ e, task }) {
    e.preventDefault();

    dispatch(deleteTask(task));
  }

  useEffect(() => {
    setCompleteCount(
      tasks.reduce((total, task) => (task.complete ? total + 1 : total), 0)
    );
  }, [tasks]);

  return (
    <div className="todo_container">
      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          ref={taskRef}
          type="text"
          name="task"
          id="task"
          autoComplete="off"
          placeholder="Add your new todo"
        />
        <button type="submit">Add Task</button>
      </form>

      {tasks.map((task) => {
        return (
          <div
            key={task.id}
            className={task.complete ? "task complete" : "task"}
          >
            <input
              onChange={(e) => handleComplete({ e, task })}
              type="checkbox"
              name="checkbox"
              id="checkbox"
            />
            <input
              type="text"
              name="task"
              id="task"
              defaultValue={task.task}
              onChange={(e) => handleUpdate({ e, task })}
            />

            <button
              className="delete"
              onClick={(e) => handleDelete({ e, task })}
            >
              Delete
            </button>
          </div>
        );
      })}

      <pre>
        <p className="count">
          Completed Tasks: <span>{completeCount}</span>
        </p>
      </pre>
    </div>
  );
}
