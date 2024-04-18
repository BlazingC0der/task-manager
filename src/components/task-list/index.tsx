import { Task } from "../../App"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import { useState } from "react"
import TaskForm from "../task-form"
import TaskItem from "../task"

type Props = {
  tasks: Task[]
  taskCompletionHandle: (index: number, completed: boolean) => void
  editTask: (index: number, task: Task) => void
  deleteTask: (index: number) => void
}

const TaskList: React.FC<Props> = (props) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDel, setOpenDel] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(NaN)

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40vw",
    height: "80vh",
    bgcolor: "background.paper",
    border: "2px solid #0000",
    boxShadow: 24,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "4px"
  }

  const markTaskComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.target.dataset.index)
    props.taskCompletionHandle(index, e.target.checked)
  }

  const editTask = (index: number, task: Task) => {
    props.editTask(index, task)
    setOpenEdit(false)
  }

  return (
    <>
      <Modal
        open={openEdit}
        onClose={() => {
          setOpenEdit(false)
        }}
      >
        <Box sx={style}>
          <TaskForm
            editTask={editTask}
            selectedIndex={selectedIndex}
            task={props.tasks[selectedIndex]}
          />
        </Box>
      </Modal>
      <Modal
        open={openDel}
        onClose={() => {
          setOpenDel(false)
        }}
      >
        <Box
          sx={{
            ...style,
            width: "40vw",
            height: "30vh",
            justifyContent: "space-around"
          }}
        >
          <p className="text-2xl">Are you sure you want to delete this task?</p>
          <div className="action-del-btns flex space-x-4">
            <button
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-md text-lg block w-20 p-2.5"
              onClick={() => {
                setOpenDel(false)
              }}
            >
              No
            </button>
            <button
              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-md text-lg block w-20 p-2.5"
              onClick={() => {
                props.deleteTask(selectedIndex)
                setOpenDel(false)
              }}
            >
              Yes
            </button>
          </div>
        </Box>
      </Modal>
      <div className="task-list w-3/4 flex flex-col items-center space-y-10">
        <h1>Tasks</h1>
        {props.tasks.map((task, index) => (
          <TaskItem
            task={task}
            index={index}
            markTaskComplete={markTaskComplete}
            setOpenEdit={setOpenEdit}
            setOpenDel={setOpenDel}
            setSelectedIndex={setSelectedIndex}
          />
        ))}
      </div>
    </>
  )
}

export default TaskList
