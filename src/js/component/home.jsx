import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

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
		<div className="container">
			<div className="row text-center">

				<h1 className="p-5">Todo List</h1>
				<div className="bg-info w-50 mx-auto" style={{height: "150px"}}>
					<input className="form-control input input__lg p-3"  type="text" id="todo-input" value={inputValue} onChange={handleInputChange} name="text" autoComplete="off"/>
         	 		<button className="btn btn-primary p-2" type="button" onClick={handleAddTask}>Agregar tarea</button>
				</div>

				<div>
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
