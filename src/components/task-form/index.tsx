import { useEffect, useRef } from "react"
import { Task, Priority } from "../../App"

type AddProps = {
  addTask: (task: Task) => void
}

type EditProps = {
  editTask: (index: number, task: Task) => void
  task: Task
  selectedIndex: number
}

type Props = AddProps | EditProps

const TaskForm: React.FC<Props> = (props) => {
  const title = useRef<string>("")
  const description = useRef<string>("")
  const priority = useRef<Priority>("high")
  const deadline = useRef<string>("")
  const titeRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const priorityRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if ("editTask" in props) {
      title.current = props.task.title
      description.current = props.task.description
      deadline.current = props.task.deadline.toISOString().split("T")[0]
      priority.current = props.task.priority
    }
  }, [])

  const titleHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    title.current = e.target.value
  }

  const descriptionHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    description.current = e.target.value
  }

  const priorityHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    priority.current = e.target.value as Priority
  }

  const deadlineHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (new Date(e.target.value).getTime() > new Date().getTime()) {
      deadline.current = e.target.value
    } else {
      alert("Deadline must be in the future")
      if (dateRef.current) dateRef.current.value = ""
    }
  }

  const submissionHandle = (e: React.FormEvent) => {
    e.preventDefault()
    if ("addTask" in props) {
      props.addTask({
        title: title.current,
        description: description.current,
        priority: priority.current,
        deadline: new Date(deadline.current),
        completed: false
      })
    } else {
      props.editTask(props.selectedIndex, {
        ...props.task,
        title: title.current,
        description: description.current,
        priority: priority.current,
        deadline: new Date(deadline.current)
      })
    }
    if (titeRef.current) titeRef.current.value = ""
    if (descriptionRef.current) descriptionRef.current.value = ""
    if (dateRef.current) dateRef.current.value = ""
    if (priorityRef.current) priorityRef.current.value = ""
  }

  return (
    <div
      className={`space-y-10 ${
        "editTask" in props ? "w-3/4" : "w-1/4"
      } flex flex-col items-center`}
    >
      <h1>{"editTask" in props ? "Edit Task" : "New Task"}</h1>
      <form
        onSubmit={submissionHandle}
        className="flex flex-col items-center space-y-7 w-full"
      >
        <div className="title w-full flex flex-col items-start">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={titleHandle}
            required
            ref={titeRef}
            defaultValue={"task" in props ? props.task.title : ""}
            className="bg-white rounded-md border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="description w-full flex flex-col items-start">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={descriptionHandle}
            required
            ref={descriptionRef}
            defaultValue={"task" in props ? props.task.description : ""}
            className="bg-white rounded-md border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="priority w-full flex flex-col items-start">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            onChange={priorityHandle}
            required
            ref={priorityRef}
            defaultValue={"task" in props ? props.task.priority : ""}
            className="bg-white rounded-md border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected hidden value="">
              select priority
            </option>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
        <div className="deadline w-full flex flex-col items-start">
          <label htmlFor="deadline">Due Date</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            onChange={deadlineHandle}
            required
            ref={dateRef}
            defaultValue={
              "task" in props
                ? props.task.deadline.toISOString().split("T")[0]
                : ""
            }
            className="bg-white rounded-md border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <input
          type="submit"
          value={"task" in props ? "Edit Task" : "Add Task"}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-md text-lg block w-full p-2.5"
        />
      </form>
    </div>
  )
}

export default TaskForm
