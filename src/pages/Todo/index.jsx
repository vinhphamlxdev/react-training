import React, { useState } from "react";
import {
  addNewTodo,
  deleteTodo,
  updateStatusTodo,
  updateTodo,
} from "../../store/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@mui/material";
import styled from "styled-components";
export default function Todo() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const [value, setValue] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);
  const handleOnChange = (e) => {
    const { value } = e.target;
    if (currentTodo) {
      handleEditTodo(value);
    } else {
      setValue(value);
    }
  };

  const handleChangeStatus = (e, todoId) => {
    const newStatus = e.target.checked;
    dispatch(updateStatusTodo({ id: todoId, status: newStatus }));
    console.log(e.target.checked);
  };
  const handleAddNewTodo = () => {
    const newTodo = {
      id: crypto.randomUUID(),
      text: value,
      status: false,
    };
    dispatch(addNewTodo(newTodo));
    setValue("");
  };
  const handleSubmitTodo = (e) => {
    console.log("call");

    e.preventDefault();

    if (currentTodo) {
      if (!currentTodo.text.trim()) return;
      finishEditTodo();
      setValue("");
    } else {
      if (!value.trim()) {
        return;
      }
      handleAddNewTodo();
    }
  };
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleEditTodo = (newName) => {
    setCurrentTodo((prev) => ({
      ...prev,
      text: newName,
    }));
  };
  const startEditTodo = (id) => {
    const existTodo = todos.find((todo) => todo.id === id);
    if (existTodo) {
      setCurrentTodo(existTodo);
    }
  };
  const finishEditTodo = () => {
    dispatch(updateTodo({ id: currentTodo.id, text: currentTodo.text }));
    setCurrentTodo(null);
  };
  return (
    <StyledTodo className="p-3 flex justify-center bg-white">
      <div className="container max-w-[550px] p-3 rounded-md bg-[#f7f8fa]">
        <div className="flex flex-col gap-y-7">
          <form className="flex gap-x-3 items-center">
            <div className="p-3 rounded-md w-[400px]">
              <input
                value={currentTodo ? currentTodo.text : value}
                onChange={handleOnChange}
                placeholder="Type in here"
                className="input-value w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:border-yellow-500"
                type="text"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmitTodo}
              className="btn-add bg-green-500 rounded-md uppercase btn text-white h-[42px] w-[88px] flex items-center justify-center"
            >
              <i className="bi bi-plus leading-[0px] text-[30px]"></i>
              <span> {currentTodo ? "Edit" : "Add"}</span>
            </button>
          </form>
          <div className="flex flex-col gap-y-2">
            {todos?.length > 0 &&
              todos.map((todo) => {
                return (
                  <div
                    key={todo.id}
                    className="todo-item  shrink-0 rounded-md min-h-14 pr-6 overflow-hidden flex flex-col select-none shadow-md border-[#f3a952] border-l-8"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="todo-item__content overflow-hidden flex-1 flex gap-x-3 items-center">
                        <div className="flex justify-center shrink-0 w-10 checkbox-box h-7 rounded-full items-center">
                          <Checkbox
                            checked={todo.status}
                            onChange={(e) => handleChangeStatus(e, todo.id)}
                          />
                        </div>
                        <div className="task-content   todo__content-name whitespace-wrap text-base font-medium ">
                          {todo.text}
                        </div>
                      </div>
                      <div className="todo-item__content shrink-0 ml-2 gap-x-2 flex items-center">
                        <i
                          onClick={() => startEditTodo(todo.id)}
                          className="bi cursor-pointer text-green-500 bi-pencil text-xl edit-btn"
                        />
                        <i
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="bi text-red-500 cursor-pointer delete-btn bi-trash text-xl icon-trash"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </StyledTodo>
  );
}
const StyledTodo = styled.div`
  .MuiInput-sizeSm {
    border-radius: 4px;
    background-color: hsla(0, 0%, 100%, 0.05);
    color: #fff;
    flex: 1;
    flex-shrink: 0;
    width: 238px;
  }
  .shadow__btn {
    margin-right: 4px;
    padding: 6px 12px;
    border: none;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    letter-spacing: 4px;
    font-weight: 700;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow;
  }

  .shadow__btn {
    background: #f3a952;
    box-shadow: 0 0 16px #f3a952;
  }

  .MuiCheckbox-root {
    color: #8ac926;
    /* color: #f9a825; */
    padding: 4px;
  }
  .css-zun73v.Mui-checked,
  .css-zun73v.MuiCheckbox-indeterminate,
  .MuiButtonBase-root,
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked,
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate {
    /* color: #f9a825; */
    color: #8ac926 !important;
  }
`;
