import React, { useEffect, useState } from "react";
import { createTodo, deleteTodo, getAllTodo } from "../../services/TodoApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
export default function Home() {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const { isError, data: dataTodo } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getAllTodo(),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {},
  });
  const { isLoading, error, isSuccess, mutate } = useMutation({
    mutationFn: (todoData) => createTodo(todoData),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      setValue("");
    },
    onError: (err) => {
      console.log("Coloi:", err);
    },
  });
  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    const todoData = {
      name: value,
      status: false,
    };
    mutate(todoData);
  };
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: (err) => {
      console.log("Coloi:", err);
    },
  });
  const handleDeleteTodo = (id) => {
    mutateDelete(id);
  };
  return (
    <div className="home-page p-10">
      <div className="grid grid-cols-2 gap-x-4">
        <div className="flex flex-col gap-y-5">
          <div className="todo-heading p-3 todo-heading--todo flex items-center gap-x-2 icon-edit text-2xl font-bold uppercase text-green-500">
            GET
          </div>
          <div className="flex flex-col gap-y-3">
            {dataTodo?.length > 0 &&
              dataTodo?.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="flex px-3 py-3 border border-green-500 rounded-sm  items-center justify-between"
                  >
                    <span className="text-gray-500 capitalize">
                      {item.name}
                    </span>
                    <div className="flex items-center">
                      <i
                        onClick={() => handleDeleteTodo(item.id)}
                        className="bi transition-all hover:opacity-75 cursor-pointer text-red-500 text-lg bi-x"
                      ></i>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="todo-heading p-3 todo-heading--todo flex items-center gap-x-2 icon-edit text-2xl font-bold uppercase text-pink-500">
            POST
          </div>
          <div className="flex flex-col gap-y-3">
            <form className="flex gap-x-3 items-center">
              <div className="p-3 rounded-md w-[400px]">
                <input
                  placeholder="Type in here"
                  className="input-value w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:border-yellow-500"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <button
                onClick={handleCreateTodo}
                type="submit"
                className="btn-add bg-green-500 rounded-md uppercase btn text-white h-[42px] w-[88px] flex items-center justify-center"
              >
                <i className="bi bi-plus leading-[0px] text-[30px]"></i>
                ADD
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
