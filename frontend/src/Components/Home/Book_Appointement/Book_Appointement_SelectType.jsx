import React from "react";
import { Link } from "react-router-dom";
import { MdAddBox, MdRemoveRedEye } from "react-icons/md";

const Book_Appointement_SelectType = () => {
	return (
		<div className="h-[73vh] w-full overflow-y-auto px-4 md:px-6 py-8">
			<div className="mb-8 text-2xl font-semibold text-center md:text-3xl">
				Select Type
			</div>

			<div className="flex flex-col max-w-lg gap-6 mx-auto my-8">
				<Link to="/Book_Appointement_Mode">
					<div className="flex items-center justify-center gap-2 px-6 py-4 text-center transition duration-300 border-2 border-gray-300 rounded-lg shadow-sm hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-md">
						<MdAddBox className="text-2xl" />
						<span>New Appointment</span>
					</div>
				</Link>

				<Link to="/view_Appointments">
					<div className="flex items-center justify-center gap-2 px-6 py-4 text-center transition duration-300 border-2 border-gray-300 rounded-lg shadow-sm hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-md">
						<MdRemoveRedEye className="text-2xl" />
						<span>View Appointment</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Book_Appointement_SelectType;
