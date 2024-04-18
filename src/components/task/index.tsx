import React, { useEffect, useState } from "react"
import { Task } from "../../App"

type Props = {
  task: Task
  index: number
  markTaskComplete: (e: React.ChangeEvent<HTMLInputElement>) => void
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDel: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}

const TaskItem: React.FC<Props> = (props) => {
  const [priorityColor, setPriorityColor] = useState<string>("")

  useEffect(() => {
    if (props.task.priority === "high") {
      setPriorityColor("text-red-600")
    } else if (props.task.priority === "medium") {
      setPriorityColor("text-yellow-600")
    } else {
      setPriorityColor("text-green-600")
    }
  }, [props.task])

  return (
    <div
      className="task bg-white rounded-lg w-full flex flex-col space-y-6 p-6 hover:scale-105"
      style={{
        border: `4px solid ${props.task.completed ? "green" : "grey"}`,
        order: props.task.completed ? 2 : 1
      }}
    >
      <div className="title-bar flex justify-between">
        <h2 className="title text-2xl">
          {props.task.title}{" "}
          <span className={priorityColor}>({props.task.priority})</span>
        </h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="complete text-md">Completed</label>
          <input
            type="checkbox"
            name="complete"
            id="complete"
            className="w-6 h-6 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={props.task.completed}
            data-index={props.index}
            onChange={props.markTaskComplete}
          />
        </div>
      </div>
      <p className="description w-3/4 text-left text-lg">
        {props.task.description}
      </p>
      <div className="action-bar flex justify-between items-center">
        <span className="deadline">
          Due Date: {props.task.deadline.toDateString()}
        </span>
        <div className="action-btns w-1/4 flex space-x-5 justify-end">
          <button
            className="edit-btn cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-md text-lg block w-20 p-2.5"
            onClick={() => {
              props.setSelectedIndex(props.index)
              props.setOpenEdit(true)
            }}
          >
            Edit
          </button>
          <button
            className="del-btn cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-md text-lg block w-20 p-2.5"
            onClick={() => {
              props.setSelectedIndex(props.index)
              props.setOpenDel(true)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
