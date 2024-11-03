"use client";
import { getMonth } from "@/app/utils/Helpers";
import React, { FC, useState } from "react";
import Day from "./Day";
import { useAppDispatch, useAppSelector } from "@/app/services/state/store";
import {
  removeTask,
  updateTaskTitle,
} from "@/app/services/state/features/taskSlice";

import { CiEdit } from "react-icons/ci";
import { FaCheckSquare } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "sonner";
import {
  addDoneDate,
  removeDoneDate,
} from "@/app/services/state/features/doneDateSlice";

type TaskCardProps = {
  Task_id: number | undefined;
  title: string | undefined;
  task: object;
};

const TaskCard: FC<TaskCardProps> = ({ Task_id, title, task }) => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [taskDone, setTaskDone] = useState(false);
  const [editingTaskTitle, setEditingTaskTitle] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const TodaysDate = dayjs().format("DD-MM-YY");

  const state = useAppSelector((state) => state.doneDate.doneDates);

  // Final doneDates in array
  const doneDates = state.filter((date: any) => date.Task_id === Task_id);
  const finalDoneDates = doneDates.map((item) => item.Task_doneDate);

  const diamondsState = useAppSelector((state) => state.diamonds.diamonds);

  const dispatch = useAppDispatch();

  const handleTaskDone = () => {
    if (taskDone === true) {
      axios
        .post("http://localhost:3000/api/deleteDoneDate", {
          Task_id,
          TodaysDate,
        })
        .then((res) => {
          if (res.status === 200) {
            setTaskDone(!taskDone);
            dispatch(
              removeDoneDate({
                Task_id,
                Task_doneDate: dayjs().format("DD-MM-YY"),
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:3000/api/addDoneDate", {
          Task_id,
          TodaysDate,
        })
        .then((res) => {
          if (res.status === 200) {
            axios.get("http://localhost:3000/api/getDoneDates").then((res) => {
              localStorage.setItem("doneDates", JSON.stringify(res.data));
            });
            setTaskDone(!taskDone);
            dispatch(
              addDoneDate({
                Task_id,
                Task_doneDate: dayjs().format("DD-MM-YY"),
              })
            );
          }
        })
        .catch((err) => {
          toast.success("Something went wrong");
        });
    }
  };

  const handleNewTaskTitle = () => {
    dispatch(updateTaskTitle({ ...task, Task_title: newTaskTitle }));
    setEditingTaskTitle(!editingTaskTitle);
    axios.post("http://localhost:3000/api/updateTask", {
      newTaskTitle,
      Task_id,
    });
  };

  const handleRemoveTask = () => {
    axios
      .post("http://localhost:3000/api/removeAllDoneDates", { Task_id })
      .then((res) => {
        if (res.status === 200) {
          axios
            .post("http://localhost:3000/api/removeTask", { Task_id })
            .then((res) => {
              if (res.status === 200) {
                dispatch(removeTask(task));
              } else {
                toast.error("Something went wrong");
              }
            });
        }
      });
  };

  return (
    <div
      className="card max-w-[220px] vsm:max-w-[290px] sm:max-w-[250px] lg:max-w-[300px] xl:max-w-[500px] bg-[#30343F] shadow-sm text-xl text-white pb-2"
      key={Task_id}
    >
      <div className="p-1 sm:p-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CiEdit
            className="text-2xl cursor-pointer"
            onClick={() => setEditingTaskTitle(!editingTaskTitle)}
          />
          {editingTaskTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="w-[60%] text-black pl-2 text-xs sm:text-md"
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <FaCheckSquare
                className="text-xl md:text-2xl cursor-pointer text-green-400"
                onClick={handleNewTaskTitle}
              />
            </div>
          ) : (
            <h2 className="card-title cursor-default text-sm md:text-xl">
              {title}
            </h2>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-sec checked:bg-sec checked:before:bg-sec hover:before:opacity-10"
            onClick={handleTaskDone}
          />
          <SlOptionsVertical
            className="cursor-pointer hover:text-gray-400 duration-300 text-sm sm:text-md"
            onClick={() => setShowDeleteOption(!showDeleteOption)}
          />
          {showDeleteOption ? (
            <button
              className="text-[12px] sm:text-md text-red-500"
              onClick={handleRemoveTask}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
      {currentMonth.map((row, i) => (
        <React.Fragment key={i}>
          <div className="flex justify-between" key={i}>
            {row.map((day, idx) => (
              <Day day={day} rowIdx={i} key={idx} doneDates={finalDoneDates} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TaskCard;
