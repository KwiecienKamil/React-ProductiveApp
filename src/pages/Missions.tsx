import { useEffect, useState } from "react";

import axios from "axios";
import Navbar from "../components/Navbar";
import Quests from "../components/Quests";
import DailyStreak from "../components/DailyStreak";

const Missions = () => {
  const [finishedMissions, setFinishedMissions] = useState([]);
  const currentUser = localStorage.getItem("user");
  const currentUserId = JSON.parse(currentUser!);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/getMissions`, {
        User_id: currentUserId.id,
      })
      .then((res) => {
        setFinishedMissions(res.data);
      });
  }, []);

  const totalMissionValue = finishedMissions.reduce(
    (sum, mission: any) => sum + mission.missionValue,
    0
  );
  localStorage.setItem("User Diamonds", totalMissionValue.toString());

  return (
    <div className="h-screen px-[2px] vsm:px-[2rem] flex pt-8 font-inter text-black bg-gradient-to-r from-[#FBAB7E] to-[#F7CE68] overflow-hidden">
      <Navbar />
      <div className="max-h-screen w-full xsm:w-[90%] px-1 vsm:px-6 pt-2 text-xl">
        <h1 className="text-sec font-bold text-[14px]">Missions</h1>
        <div className="pt-6 flex flex-col sm:flex-row md:gap-6 gap-4 lg:gap-8">
          <Quests finishedMissions={finishedMissions} />
          <DailyStreak />
        </div>
      </div>
    </div>
  );
};

export default Missions;