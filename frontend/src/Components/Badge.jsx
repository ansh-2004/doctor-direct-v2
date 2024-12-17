import React from "react";

const Badge = ({ status }) => {
	const getStatusClass = () => {
		switch (status) {
			case "Scheduled":
				return "bg-blue-500 text-white";
			case "Completed":
				return "bg-green-500 text-white";
			case "Pending":
				return "bg-yellow-500 text-white";
			case "Rejected":
				return "bg-red-500 text-white";
			default:
				return "bg-gray-500 text-white";
		}
	};

	return (
		<span
			className={`inline-block px-3 py-1 h-auto rounded-full text-xs font-semibold ${getStatusClass()}`}
		>
			{status}
		</span>
	);
};

export default Badge;
