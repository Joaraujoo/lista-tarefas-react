
import { useState } from "react"
import "./app.css"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function App() {

  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState<string[]>([])

  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  })

  function handleRegister() {

    if(!input){
      toast.warn("Digite alguma tarefa!")
      return
    }

    if (tasks.includes(input)) {
      toast.info("Tarefa já adicionada")
      setInput("")
      return
    }

    if(editTask.enabled){
      handleSaveEdit()
      return
    }

    setTasks(tarefas => [...tarefas, input])
    setInput("")
  }

  function handleDelete(item: string){
    const removeTask = tasks.filter( task => task !== item )
    setTasks(removeTask)
  }

  function handleEdit(item: string) {
    setInput(item)
    setEditTask({
      enabled: true,
      task: item
    })
  }

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex(task => task === editTask.task)
    const allTasks = [...tasks]
    allTasks[findIndexTask] = input
    setTasks(allTasks)

    setEditTask({
      enabled: false,
      task: ""
    })

    setInput("")
  }

  return(
    <div className="container">
      <div className="d-flex justify-content-center mt-5 flex-column">
      <div className="input-group">
          <input
          className="form-control sem-brilho"
          type="text"
          placeholder="digite uma tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleRegister} className="btn btn-success" type="button">{editTask.enabled ? "Atualizar Tarefa" : "Adicionar Tarefa"}</button>

        </div>
      </div>

        <div className="mt-4">
        {tasks.map((item) => (
            <section className="d-flex flex-row align-items-center mt-3">
              <span>{item}</span>
              <button onClick={() => handleEdit(item)}  className="btn btn-warning btn-sm ">Editar</button>
              <button onClick={() => handleDelete(item)} className="btn btn-danger btn-sm ">Exluir</button>
            </section>
           ))}
        </div>

        <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}