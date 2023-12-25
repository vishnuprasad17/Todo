import React, { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef("null");
  const [editId, setEditId] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  });

  const addTodo = () => {
    if (todo.trim() !== "") {
      if (editId) {
        const updatedTodos = todos.map((item) =>
          item.id === editId ? { ...item, list: todo } : item
        );
        setTodos(updatedTodos);
        setEditId(0);
        setTodo("");
      } else {
        setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
        setTodo("");
      }
      setErrorMessage(""); // Clear error message when successfully adding todo
    } else {
      setErrorMessage("Please enter a non-empty todo.");
    }
  };

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.list);
    setEditId(id);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>
      {errorMessage && <p style={{ fontStyle: "italic", color: "red" }}>{errorMessage}</p>}
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items" key={to.id}>
              <div className={`list-item-list ${to.status ? "completed" : ""}`}>
                {to.list}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(to.id)}
                />
                <FiEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(to.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;