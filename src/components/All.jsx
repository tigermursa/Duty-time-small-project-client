import React, { useState, useEffect } from "react";
import { MdEdit, MdDarkMode, MdLightMode } from "react-icons/md";
import { WiSunrise, WiDaySunny, WiMoonrise } from "react-icons/wi";
import { FaUsers, FaClock } from "react-icons/fa";
import EditModal from "./EditModal";
import MeetLinks from "./MeetLinks";
import { FiArrowLeft } from "react-icons/fi";
import { SessionCard } from "./SessionCard";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const formatTime = (time) =>
  time
    ? new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => (
  <button
    onClick={toggleDarkMode}
    className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
  >
    {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
  </button>
);

const All = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const fetchSchedules = async () => {
    try {
      const res = await fetch("mydash.dutyschedules.json");
      const data = await res.json();
      setSchedules(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Calculate today's date without time for comparison
  const today = new Date();
  const todayWithoutTime = new Date(today.toDateString());
  // Check if all schedules have a date that is in the past
  const allPast =
    schedules.length > 0 &&
    schedules.every((schedule) => new Date(schedule.date) < todayWithoutTime);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
      <div>
        <a
          href="https://my-dash-ten.vercel.app/"
          className="inline-flex items-center space-x-2 text-indigo-300 hover:text-indigo-500"
        >
          <FiArrowLeft className="w-5 " />
          <span>Back</span>
        </a>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {schedules.map((schedule) => {
          const scheduleDateObj = new Date(schedule.date);
          const isToday =
            scheduleDateObj.toDateString() === todayWithoutTime.toDateString();
          const isPast = scheduleDateObj < todayWithoutTime;

          return (
            <div
              key={schedule._id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:hover:shadow-lg dark:shadow-gray-700/30 
                ${
                  allPast
                    ? "border-4 border-red-500"
                    : isToday
                    ? "border-4 border-green-500"
                    : ""
                }
                ${isPast ? "opacity-50 grayscale" : ""}`}
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {formatDate(schedule.date)}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                      {schedule.day}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSchedule(schedule)}
                    className="p-2 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                  >
                    <MdEdit className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <SessionCard session={schedule.session1} />
                {schedule.session2 !== "none" && (
                  <SessionCard session={schedule.session2} />
                )}

                {schedule.groupMonitoring && (
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="flex items-center mb-3">
                        <FaUsers className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          Group Monitoring
                        </h4>
                      </div>
                      {schedule.groupMonitoring.label && (
                        <div className="flex items-center text-center text-gray-600 dark:text-gray-300 mb-2  text-sm font-medium">
                          <span className="ml-1 border p-1 rounded-4xl border-green-700">
                            {schedule.groupMonitoring.label}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-7">
                      {schedule.groupMonitoring.startTime && (
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                          <FaClock className="w-4 h-4" />
                          <span className="font-medium">Start:</span>
                          <span>
                            {formatTime(schedule.groupMonitoring.startTime)}
                          </span>
                        </div>
                      )}
                      {schedule.groupMonitoring.endTime && (
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                          <FaClock className="w-4 h-4" />
                          <span className="font-medium">End:</span>
                          <span>
                            {formatTime(schedule.groupMonitoring.endTime)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Static sixth card for MeetLinks */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:hover:shadow-lg dark:shadow-gray-700/30">
          <MeetLinks />
        </div>
      </div>

      {selectedSchedule && (
        <EditModal
          schedule={selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
          onUpdate={fetchSchedules}
        />
      )}
    </div>
  );
};

export default All;
