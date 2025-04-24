import { useState } from "react";
import {
  FiCalendar,
  FiVideo,
  FiCopy,
  FiCheck,
  FiExternalLink,
} from "react-icons/fi";

const MeetLinks = () => {
  const [copiedLinks, setCopiedLinks] = useState({
    support: false,
    daily: false,
    instructor: false,
    helpdesk: false,
  });

  const links = [
    {
      id: "support",
      title: "Support Season",
      icon: <FiVideo className="w-5 h-5" />,
      url: "https://meet.google.com/",
    },
    {
      id: "daily",
      title: "Daily Scrum",
      icon: <FiCalendar className="w-5 h-5" />,
      url: "https://meet.google.com/",
    },
    {
      id: "instructor",
      title: "Instructor Dashboard",
      icon: <FiExternalLink className="w-5 h-5" />,
      url: "https://web.programming-hero.com",
    },
    {
      id: "schedule",
      title: "Web L1 Schedule",
      icon: <FiExternalLink className="w-5 h-5" />,
      url: "https://docs.google.com/",
    },
  ];

  const copyToClipboard = async (text, linkId) => {
    await navigator.clipboard.writeText(text);
    setCopiedLinks((prev) => ({ ...prev, [linkId]: true }));
    setTimeout(() => {
      setCopiedLinks((prev) => ({ ...prev, [linkId]: false }));
    }, 2000);
  };

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">Useful Links</h2>
      {links.map((link) => (
        <div
          key={link.id}
          className="group relative bg-gray-800 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700 "
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-3 bg-indigo-500 rounded-lg">
              {link.icon}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-100 truncate">
                {link.title}
              </p>
              <p className="text-sm text-gray-400 truncate">
                {link.url.replace("https://", "")}
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(link.url, link.id)}
              className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
              aria-label={`Copy ${link.title} link`}
            >
              {copiedLinks[link.id] ? (
                <FiCheck className="w-5 h-5 text-green-400" />
              ) : (
                <FiCopy className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500 rounded-lg pointer-events-none transition-all duration-300" />
        </div>
      ))}
    </div>
  );
};

export default MeetLinks;
