import { useState } from "react"
import "./App.css"
import TaskForm from "./components/task-form"
import TaskList from "./components/task-list"

export type Task = {
  title: string
  description: string
  priority: Priority
  deadline: Date
  completed: boolean
}

export type Priority = "high" | "medium" | "low"

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }

  const taskCompletionHandle = (index: number, completed: boolean) => {
    const tempTasks = [...tasks]
    tempTasks[index].completed = completed
    setTasks([...tempTasks])
  }

  const editTask = (index: number, task: Task) => {
    const tempTasks = [...tasks]
    tempTasks[index] = { ...task }
    setTasks([...tempTasks])
  }

  const deleteTask = (index: number) => {
    const tempTasks = [...tasks]
    tempTasks.splice(index, 1)
    setTasks([...tempTasks])
  }

  return (
    <div className="App">
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        taskCompletionHandle={taskCompletionHandle}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </div>
  )
}

export default App
