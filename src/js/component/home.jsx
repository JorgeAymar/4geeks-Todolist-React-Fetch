import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {
	const [tarea, setTareas] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const handleAddTask = () => {
		if (inputValue.trim() !== '') {
		  let miObj = {
			"label": inputValue,
			"done": false
		  }

		  setTareas([...tarea, miObj]);
		  setInputValue('');
		}
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};  
 
	const HTTPs = "https://assets.breatheco.de/apis/fake/todos/user/jsanchez";

	useEffect(() => {
	  fetch(HTTPs)
		.then(response => response.json())
		.then(data => setTareas(data))
		.catch(error => console.log('error: ', error));
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
				<div className="row mx-auto" style={{width: "640px"}}>
					<ul className="list-group">
					{tarea.map((ele, index) => (
					<li className="list-group-item" key={index}> {ele?.label} </li>
					))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
