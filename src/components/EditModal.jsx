import React from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { WiSunrise, WiDaySunny, WiMoonrise } from "react-icons/wi";
import Swal from "sweetalert2";

const EditModal = ({ schedule, onClose, onUpdate }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: schedule,
  });

  React.useEffect(() => {
    reset(schedule);
  }, [schedule, reset]);

  const SessionIcon = ({ session }) => {
    const icons = {
      morning: <WiSunrise className="w-6 h-6 mr-2 text-amber-400" />,
      afternoon: <WiDaySunny className="w-6 h-6 mr-2 text-orange-400" />,
      night: <WiMoonrise className="w-6 h-6 mr-2 text-indigo-400" />,
    };
    return icons[session] || null;
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        `https://my-dash-backend.vercel.app/api/v11/office/update/${schedule._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Schedule updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        onUpdate();
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message || "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gradient-to-r from-indigo-700 to-purple-700 text-white rounded-t-2xl">
          <h2 className="text-2xl font-bold">Edit Schedule</h2>
          <button onClick={onClose} className="hover:text-gray-300">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-6 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                {...register("date")}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Day
              </label>
              <select
                {...register("day")}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500"
              >
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Session 1
              </label>
              <select
                {...register("session1")}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500"
              >
                {["morning", "afternoon", "night"].map((session) => (
                  <option key={session} value={session}>
                    {session.charAt(0).toUpperCase() + session.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Session 2
              </label>
              <select
                {...register("session2")}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500"
              >
                {["morning", "afternoon", "night", "none"].map((session) => (
                  <option key={session} value={session}>
                    {session === "none"
                      ? "None"
                      : session.charAt(0).toUpperCase() + session.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6 bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-200">
              Group Monitoring
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Label
                </label>
                <input
                  type="text"
                  {...register("groupMonitoring.label")}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  {...register("groupMonitoring.startTime")}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  {...register("groupMonitoring.endTime")}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Update Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
