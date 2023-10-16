import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const inputRef = useRef();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        { text: e.target.value, completed: false, id: Date.now() },
      ]);

      inputRef.current.value = "";
    }
  };

  const handleCompleted = (id) => {
    const updatedList = todos.map(function (todo) {
      return todo.id !== id ? todo : { ...todo, completed: !todo.completed };
    });
    setTodos(updatedList);
  };

  const handleDelete = (id) => {
    const updatedList = todos.filter(function (todo) {
      return todo.id !== id;
    });
    setTodos(updatedList);
  };

  const handleUpdate = (id, newText) => {
    const updatedList = todos.map(function (todo) {
      return todo.id !== id ? todo : { ...todo, text: newText };
    });

    setTodos(updatedList);
  };

  return (
    <div className="app">
      <input
        className="todo-input"
        type="text"
        placeholder="Enter your todo here..."
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />

      {todos.map(function (todo) {
        return (
          <Item
            key={todo.id}
            {...todo}
            handleCompleted={handleCompleted}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        );
      })}
    </div>
  );
}

export default App;

const Item = ({
  text,
  completed,
  id,
  handleCompleted,
  handleDelete,
  handleUpdate,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleBlur = () => {
    setIsEdit(false);
    handleUpdate(id, editedText);
  };

  return (
    <div className="item">
      <div className="circle" onClick={() => handleCompleted(id)}>
        {completed ? <span>&#10003;</span> : ""}
      </div>
      <div
        className={completed ? "strike" : ""}
        onDoubleClick={() => {
          !completed && setIsEdit(true);
        }}
      >
        {isEdit ? (
          <input
            type="text"
            className="edit-input"
            value={editedText}
            onChange={handleTextChange}
            onBlur={handleBlur}
          />
        ) : (
          text
        )}
      </div>
      <div className="close" onClick={() => handleDelete(id)}>
        X
      </div>
    </div>
  );
};
