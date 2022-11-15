import React, { useState } from "react";
import "./App.css";

export const App: React.FC = () => {
  const [newItem, setNewItem] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<string>>([]);
  const [doneList, setDoneList] = useState<Array<string>>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editingValue, setEditingValue] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newItem) {
      setTodoList([...todoList, newItem]);
      setNewItem("");
    }
  };
  const handleDone = (index: number) => {
    setDoneList([todoList[index], ...doneList]);
    setTodoList(todoList.filter((item, i) => i !== index));
  };

  const handleUndo = (index: number) => {
    setTodoList([doneList[index], ...todoList]);
    setDoneList(doneList.filter((item, i) => i !== index));
  };

  const handleDelete = (index: number, arrayName: string) => {
    if (arrayName == "todo") {
      setTodoList(todoList.filter((item, i) => i !== index));
    } else if (arrayName == "undo") {
      setDoneList(doneList.filter((item, i) => i !== index));
    }
  };

  const handleEdit = (index: number, itemValue: string) => {
    setIsEdit(true);
    setEditIndex(index);
    setEditingValue(itemValue);
  };

  const handleEditChange = (value: string) => {
    setEditingValue(value);
  };

  const handleSave = (index: number) => {
    if (editingValue) {
      setTodoList(
        todoList.map((item, ind) => (ind == index ? editingValue : item))
      );
      setEditIndex(null);
      setIsEdit(false);
    }
  };

  return (
    <div className="app">
      <div>
        <div className="header">Todo Items</div>
        <form onSubmit={handleSubmit} className="todo_form">
          <input
            type="text"
            value={newItem}
            placeholder="Add items here ..."
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button type="submit" className="button">
            Add Todo
          </button>
        </form>
        <div className="todo_list">
          {todoList?.map((item, i) => (
            <div key={i} className="list_item">
              <span className="span_item">
                {isEdit && editIndex == i ? (
                  <span>
                    {i + 1}.
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => handleEditChange(e.target.value)}
                    />
                  </span>
                ) : (
                  <span>
                    {i + 1}. {item}
                  </span>
                )}

                <div>
                  {!isEdit && (
                    <button onClick={() => handleDone(i)}>Done</button>
                  )}

                  {!isEdit && (
                    <button onClick={() => handleEdit(i, item)}>Edit</button>
                  )}

                  {isEdit && editIndex == i && (
                    <button onClick={() => handleSave(i)}>Save</button>
                  )}

                  {!isEdit && (
                    <button onClick={() => handleDelete(i, "todo")}>
                      Delete
                    </button>
                  )}
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        {doneList.length > 0 && <div className="header"> Done Items</div>}
        <div className="todo_list">
          {doneList?.map((item, i) => (
            <div key={i} className="list_item">
              <span className="span_item">
                {i + 1}. {item}
                <div>
                  <button onClick={() => handleUndo(i)}>Undo</button>
                  <button onClick={() => handleDelete(i, "undo")}>
                    Delete
                  </button>
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
