import React from "react";
import { useForm } from "react-hook-form";

const CreatingForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://my-dash-backend.vercel.app/api/v11/office/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      await res.json();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8 space-y-8"
      >
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Office Schedule Creator
        </h2>

        {/* Date & Day Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              {...register("date")}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Day
            </label>
            <select
              {...register("day")}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            >
              <option value="">Select Day</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
        </div>

        {/* Session Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Session 1
            </label>
            <select
              {...register("session1")}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            >
              <option value="">Select Session</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Session 2
            </label>
            <select
              {...register("session2")}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            >
              <option value="">Select Session</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        {/* Group Monitoring TimeSlot */}
        <fieldset className="border-2 border-gray-200 rounded-lg p-4 space-y-4">
          <legend className="px-2 text-lg font-semibold text-gray-700 uppercase">
            Group Monitoring
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Label
              </label>
              <input
                type="text"
                {...register("groupMonitoring.label")}
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                {...register("groupMonitoring.startTime")}
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                {...register("groupMonitoring.endTime")}
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              />
            </div>
          </div>
        </fieldset>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-8">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-lg font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatingForm;
