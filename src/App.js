import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
	let list = localStorage.getItem('list');
	if(list) {
		return JSON.parse(list);
	}
	return [];
}

function App() {
	const [name, setName] = useState("");
	const [list, setList] = useState(getLocalStorage());
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [alert, setAlert] = useState({show: false, msg: '', type: ''});
	const handleSubmit = (e) => {
		e.preventDefault();
		if(!name) {
			showAlert(true, 'Please Enter Item', 'danger');
		} else if(name && isEditing) {
			setList(list.map((item) => {
				if(item.id === editId) {
					return {...item, title: name};
				}
				return item;
			}));
			setName('');
			showAlert(true, 'Item Updated', 'success');
			setIsEditing(false);
			setEditId(null);
		} else {
			let newItem = {id: new Date().getTime().toString(), title: name}
			setList([...list, newItem]);
			setName('');
			showAlert(true, 'Item Added To The List', 'success');
		}
	}
	const showAlert = (show=false, msg="", type="") => {
		setAlert({show, msg, type});
	}
	const clearItems = () => {
		showAlert(true, 'Empty List', 'danger');
		setList([]);
	}
	const removeItem = (id) => {
		showAlert(true, 'Item Removed', 'danger');
		let newList = list.filter((item) => item.id !== id);
		setList(newList);
	}
	const editItem = (id) => {
		let listItem = list.find((item) => item.id === id);
		setIsEditing(true);
		setEditId(id);
		setName(listItem.title);
	}
	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list));
	}, [list]);
	
    return (
		<React.Fragment>
			<div className="section-center">
				<form className="grocery-form" onSubmit={handleSubmit}>
					{ alert.show && <Alert {...alert} removeAlert={showAlert} list={list} /> }
					<h3>Grocery Bud</h3>
					<div className="form-control">
						<input className="grocery" type="text" placeholder="e.g. Cheese" value={name} onChange={(e) => setName(e.target.value)} />
						<button className="submit-btn" type="submit">
							{ isEditing ? 'Edit' : 'Submit'}
						</button>
					</div>
				</form>
				{ list.length > 0 && 
					<div className="grocery-container">
						<List items={list} removeItem={removeItem} editItem={editItem} />
						<button className="clear-btn" type="submit" onClick={clearItems}>Clear Items</button>
					</div>
				}
			</div>
		</React.Fragment>
	);
}

export default App
