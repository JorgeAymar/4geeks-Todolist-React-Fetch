import React, { useState, useEffect } from "react";

const Home = () => {
  // Definimos los estados iniciales de las tareas y del input
  const [tarea, setTareas] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // URL de la API
  const API_URL = "https://assets.breatheco.de/apis/fake/todos/user/jsanchez";

  // Función para actualizar las tareas en el servidor
  const updateTasksOnServer = async (tasks) => {
    await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
  };

  // Función para agregar una nueva tarea
  const handleAddTask = async () => {
    if (inputValue.trim() !== "") {
      let miObj = {
        label: inputValue,
        done: false,
      };

      const newTasks = [...tarea, miObj];
      setTareas(newTasks);
      setInputValue("");

      // Actualizamos las tareas en el servidor
      await updateTasksOnServer(newTasks);
    }
  };

  // Función para eliminar una tarea existente
  const handleDeleteTask = async (index) => {
    const newTasks = tarea.filter((_, i) => i !== index);
    setTareas(newTasks);

    // Actualizamos las tareas en el servidor
    await updateTasksOnServer(newTasks);
  };

  // Función para eliminar todas las tareas
  const handleClearTasks = async () => {
    setTareas([]);

    // Actualizamos las tareas en el servidor
    await updateTasksOnServer([]);
  };

  // Función para actualizar el estado del input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Obtener las tareas de la API cuando se carga la página por primera vez
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setTareas(data))
      .catch((error) => console.log("error:", error));
  }, []);

  // Renderizamos el componente
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
            {/* Mapeamos cada tarea para renderizarla en la lista */}
            {tarea.map((ele, index) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                {/* Mostramos el nombre de la tarea */}
                {ele?.label}

                {/* Agregamos un botón para eliminar la tarea */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTask(index)}
                >
                  Eliminar tarea
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Agregamos un botón para eliminar todas las tareas */}
      <div className="text-center mt-4">
        <button className="btn btn-warning" onClick={handleClearTasks}>
          Eliminar todas las tareas
        </button>
      </div>
    </div>
  );
};

export default Home;
