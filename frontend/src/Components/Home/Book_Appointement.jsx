import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BackGround_img from "../../Assets/Book_Appointement_BackGround.jpeg";
import ForeGround_img from "../../Assets/Book_Appointement_ForeGround.jpeg";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import "animate.css";
import Button from "../Button";

const Book_Appointement = () => {
	const navigate = useNavigate();
	const { isLoggedIn, role } = useContext(AppContext);

	const BookHandler = () => {
		isLoggedIn ? navigate("/Book_Appointement_type") : navigate("/login");
	};

	return (
		<div className="container px-4 py-8 mx-auto">
			<div className="flex flex-col items-center justify-between lg:flex-row lg:items-start md:pl-12">
				<div className="w-full text-center lg:w-1/2 lg:text-left animate__animated animate__fadeInLeft">
					<div className="mb-6">
						<h1 className="text-3xl font-bold leading-tight text-indigo-950 sm:text-4xl md:text-5xl lg:text-6xl font-['Poppins']">
							We Are Ready to
							<span className="block text-teal-300">Help Anywhere</span>
							Anytime
						</h1>
					</div>
					<p className="mb-8 text-base leading-relaxed text-stone-600 sm:text-lg md:text-xl lg:text-2xl font-['Poppins']">
						In times like today, your health is very important, especially since
						the number of COVID-19 cases is increasing day by day, so we are
						ready to help you with your health consultation
					</p>
					{role === "Doctor" ? (
						<Button onClick={() => navigate("/Available_Appointments")}>
							Show Appointment
						</Button>
					) : (
						<Button onClick={BookHandler}>Book Appointment</Button>
					)}
					<div className="flex flex-wrap justify-center gap-8 mt-8 lg:justify-start">
						{[
							{ count: "100+", label: "Active Doctors" },
							{ count: "30000+", label: "Active Hospitals" },
							{ count: "1000+", label: "Active Users" },
						].map((item, index) => (
							<div key={index} className="text-center lg:text-left">
								<div className="text-2xl font-bold text-sky-700 sm:text-3xl font-['Poppins']">
									{item.count}
								</div>
								<div className="font-semibold text-stone-600 font-['Poppins']">
									{item.label}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="relative w-full max-w-[550px] mt-12 lg:mt-0 lg:w-1/2">
					<div className="relative w-full">
						<div className="w-[80%] max-w-[380px] mx-auto bg-gradient-to-b from-teal-300 via-cyan-700 to-sky-700 rounded-tl-full rounded-tr-full border-8 border-white overflow-hidden shadow-xl h-[650px]">
							<img
								src={ForeGround_img}
								alt="Foreground"
								className="object-cover object-top w-full h-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Book_Appointement;
