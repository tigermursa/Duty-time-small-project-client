import { WiSunrise, WiDaySunny, WiMoonrise } from "react-icons/wi";

export const SessionCard = ({ session }) => {
  const icons = {
    morning: (
      <WiSunrise className="w-8 h-8 mr-2 text-amber-500 dark:text-amber-400" />
    ),
    afternoon: (
      <WiDaySunny className="w-8 h-8 mr-2 text-orange-500 dark:text-orange-400" />
    ),
    night: (
      <WiMoonrise className="w-8 h-8 mr-2 text-indigo-500 dark:text-indigo-400" />
    ),
  };

  return (
    <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-1 rounded-lg mb-2">
      {icons[session]}
      <span className="font-semibold text-gray-700 dark:text-gray-200 capitalize">
        {session}
      </span>
    </div>
  );
};
