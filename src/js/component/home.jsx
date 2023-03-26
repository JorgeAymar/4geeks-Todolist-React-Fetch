import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [tareas, setTareas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const API_URL = "https://assets.breatheco.de/apis/fake/todos/user/jsanchez";

  const updateTasksOnServer = async (tasks) => {
    await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
  };

  const handleAddTask = async () => {
    if (inputValue.trim() !== "") {
      let miObj = {
        label: inputValue,
        done: false,
      };
      const newTasks = [...tareas, miObj];
      setTareas(newTasks);
      setInputValue("");
      await updateTasksOnServer(newTasks);
    }
  };

  const handleDeleteTask = async (index) => {
    const newTasks = tareas.filter((_, i) => i !== index);
    setTareas(newTasks);
    await updateTasksOnServer(newTasks);
  };

  const handleClearTasks = async () => {
    setTareas([]);
    await updateTasksOnServer([]);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setTareas(data))
      .catch((error) => console.log("error:", error));
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <h1 className="text-center mb-5">Todo List</h1>
            <div className="form-group bg-info p-3">
              <input
                className="form-control mb-3"
                type="text"
                id="todo-input"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                name="text"
                autoComplete="off"
                placeholder="Ingrese una tarea"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleAddTask}
              >
                Agregar tarea
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mx-auto" style={{ width: "640px" }}>
          <ul className="list-group">
            {tareas.map((ele, index) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                {ele?.label}
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  color="#BDBDBD"
                  onClick={() => handleDeleteTask(index)}
                  style={{ cursor: "pointer" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-warning" onClick={handleClearTasks}>
          Eliminar todas las tareas
        </button>
      </div>
    </div>
  );
};
export default Home;