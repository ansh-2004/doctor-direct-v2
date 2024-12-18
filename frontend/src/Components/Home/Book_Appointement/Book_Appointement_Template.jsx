import React from "react";
import { FcApproval, FcPlus, FcPlanner, FcComments } from "react-icons/fc";
import Book_Appointement_State_Data from "./Book_Appointement_State_Data";
import Book_Appointement_District_Data from "./Book_Appointement_District_Data";
import Book_Appointement_Hospital from "../../../Pages/Book_Appointement/Book_Appointement_Hospital";
import Book_Appointement_HospitalData from "./Book_Appointement_HospitalData";
import { useLocation, useNavigate } from "react-router-dom";
import Book_Appointement_SelectType from "./Book_Appointement_SelectType";
import Book_Appointement_DepartType from "./Book_Appointement_DepartType";
import Book_Appointement_Mode from "./Book_Appointement_Mode";
import Book_Appointement_Doctors from "../../../Pages/Book_Appointement/Book_Appointement_Doctors";
import Book_Appontement_DoctorsData from "./Book_Appontement_DoctorsData";
import Book_Appointement_Doctor_Date_Data from "./Book_Appointement_Doctor_Date_Data";
import Button from "../../Button";

// ... other imports remain the same

const Book_Appointement_Template = ({ type }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const prevhandler = () => {
		navigate(-1);
	};

	const starthandler = () => {
		navigate("/Book_Appointement_type");
	};

	const renderMainContent = () => {
		const components = {
			State: Book_Appointement_State_Data,
			District: Book_Appointement_District_Data,
			Hospital: Book_Appointement_HospitalData,
			Select_Type: Book_Appointement_SelectType,
			Depart: Book_Appointement_DepartType,
			Mode: Book_Appointement_Mode,
			Doctors: Book_Appontement_DoctorsData,
			Doctor_Date: Book_Appointement_Doctor_Date_Data,
		};

		const Component = components[type];
		return Component ? <Component /> : null;
	};

	return (
		<div className="min-h-screen px-4 py-6 bg-gray-50 md:px-8 md:py-10">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col gap-8 md:flex-row md:gap-12">
					{/* Left Side - Steps */}
					<AppointmentSteps />

					{/* Right Side - Content */}
					<div className="w-full md:w-[50%] flex flex-col">
						<div className="flex-1 mb-6 bg-white shadow-md rounded-xl">
							{renderMainContent()}
						</div>

						{location.pathname !== "/Book_Appointement_Type" && (
							<div className="flex flex-col justify-center gap-4 sm:flex-row">
								<Button onClick={prevhandler} className="w-full px-8 sm:w-auto">
									Previous
								</Button>
								<Button
									onClick={starthandler}
									className="w-full px-8 sm:w-auto"
								>
									Start Over
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const AppointmentSteps = () => {
	const steps = [
		{ icon: <FcApproval />, text: "Select Type" },
		{ icon: <FcApproval />, text: "Select State" },
		{ icon: <FcApproval />, text: "Select District" },
		{ icon: <FcPlus />, text: "Select Hospital" },
		{ icon: <FcPlus />, text: "Select Department" },
		{ icon: <FcPlanner />, text: "Select Date of Appointment" },
		{ icon: <FcComments />, text: "Confirmation Message" },
	];

	return (
		<div className="w-full md:w-[45%] bg-white rounded-xl shadow-md overflow-hidden">
			<div className="p-6 bg-gradient-to-r from-teal-500 to-blue-600">
				<h2 className="text-2xl font-bold text-center text-white md:text-3xl">
					Need an Appointment?
				</h2>
			</div>

			<div className="p-6">
				<p className="mb-8 text-sm text-center text-gray-600 md:text-base md:text-left">
					Follow these Simple Steps to Book Your Appointment Online
				</p>

				<div className="space-y-5">
					{steps.map((step, index) => (
						<div
							key={index}
							className="flex items-center gap-4 p-3 transition-colors rounded-lg hover:bg-gray-50 group"
						>
							<div className="text-xl md:text-2xl">{step.icon}</div>
							<span className="font-medium text-gray-700 transition-colors group-hover:text-teal-600">
								{step.text}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Book_Appointement_Template;
