import { FaPlus } from "react-icons/fa";
import NavButton from "./ui/NavButton";
import TaskCard from "./ui/TaskCard";
import { useAppDispatch, useAppSelector } from "../services/state/store";
import axios from "axios";
import { addTask } from "../services/state/features/taskSlice";

const Tasks = () => {
  const state = useAppSelector((state) => state.task.tasks);
  const CurrentUser = localStorage.getItem("user");
  const parsedUser = JSON.parse(CurrentUser!);
  const parsedUserId = parsedUser.id;
  const taskName = "Task";

  const tasksStateForCurrentUser = state.filter(
    (task: any) => task.User_id === parsedUserId
  );

  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/tasks`, {
        taskName,
        parsedUserId,
      })
      .then((res) => {
        if (res.status === 200) {
          axios.get(`${import.meta.env.VITE_API_URL}/tasks`).then((res) => {
            console.log(res.data[res.data.length - 1].Task_id);
            const addedTaskId = res.data[res.data.length - 1].Task_id;
            dispatch(
              addTask({
                Task_id: addedTaskId,
                Task_title: "Task",
                Task_isTaskDone: false,
                User_id: parsedUserId,
              })
            );
          });
        }
      });
  };

  return (
    <div className="max-h-screen overflow-scroll scrollbar scrollbar-thumb-transparent">
      <div className="flex items-center gap-4">
        <p className="font-semibold text-[12px] md:text-lg">
          {tasksStateForCurrentUser?.length} Tasks
        </p>
        <NavButton followingHref="#">
          <FaPlus className="text-sm" onClick={handleAddTask} />
        </NavButton>
      </div>
      <div className="pt-4 flex justify-center flex-wrap gap-2">
        {tasksStateForCurrentUser?.map((task: any) => (
          <TaskCard
            Task_id={task.Task_id}
            title={task.Task_title}
            task={task}
            key={task.Task_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
