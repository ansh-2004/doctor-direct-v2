// import React from "react";
// import Doctor_Special_Services from "../../../Assets/Doctor_Special_Services.png";
// import {
//   FaCalculator,
//   FaFlask,
//   FaFlaskVial,
//   FaHospital,
// } from "react-icons/fa6";
// import { SlCalender } from "react-icons/sl";
// import { Link } from "react-router-dom";

// const Special_Services = () => {
//   return (
//     <div>
//       <div className="flex h-[100vh] mx-[5rem] gap-[30%]">
//         <div className="my-[12rem] relative w-[25%] h-[55%] bg-gradient-to-b from-teal-300 via-cyan-700 to-sky-700 rounded-tl-full rounded-tr-full border-8 border-white shadow-xl mx-">
//           <img
//             src={Doctor_Special_Services}
//             alt="fg"
//             className="absolute top-[-32%]"
//           />
//         </div>
//         <div>
//           <div className="flex mt-[7rem] mb-[4rem]">
//             <div className="text-indigo-950 text-6xl font-bold font-['Poppins'] mr-4">
//               Our
//             </div>
//             <div className="text-teal-300 text-6xl font-bold font-['Poppins']">
//               Special Services
//             </div>
//           </div>
//           <div className="mx-9">
//             <div className="flex justify-between mb-24">
//               <div>
//                 <div className="w-full h-full bg-gradient-to-b from-teal-300 to-sky-700 rounded-[25%] flex justify-center items-center mb-4">
//                   <FaCalculator size={48} color="white" />
//                 </div>
//                 <div>BMI Calculator</div>
//               </div>
//               <div>
//                 <div className="w-full h-full bg-gradient-to-b from-teal-300 to-sky-700 rounded-[25%] flex justify-center items-center mb-4">
//                   <SlCalender size={48} color="white" />
//                 </div>
//                 <div>Period Tracker</div>
//               </div>
//             </div>
//             <div className="flex justify-between">
//               <div>
//                 <div className="w-full h-full bg-gradient-to-b from-teal-300 to-sky-700 rounded-[25%] flex justify-center items-center mb-4">
//                   <FaFlask size={48} color="white" />
//                 </div>
//                 <div>Lab Reports</div>
//               </div>

//                 <div>
//                   <Link to="/Hospital_Near_Me">
//                       <div className="w-full h-full bg-gradient-to-b from-teal-300 to-sky-700 rounded-[25%] flex justify-center items-center mb-4">
//                         <FaHospital size={48} color="white" />
//                       </div>
//                       <div>Hospital Near Me</div>
//                   </Link>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="text-5xl ml-[5rem] font-semibold text-sky-700">
//         Latest News
//       </div>
//     </div>
//   );
// };

// export default Special_Services;

import React from "react";
import "animate.css";
import Doctor_Special_Services from "../../../Assets/Doctor_Special_Services.png";
import { FaCalculator, FaFlask, FaHospital } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import useScrollAnimation from "./useScrollAnimation";

const Special_Services = () => {
	const [containerRef, isVisible] = useScrollAnimation();

	return (
		<div ref={containerRef} className="container px-4 mx-auto lg:px-12 ">
			<div
				className={`flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 min-h-screen transition-opacity duration-1000 ${
					isVisible ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="container w-full px-4 py-8 mx-auto lg:w-1/3">
					{" "}
					<div className="flex flex-col items-center justify-center mt-6 lg:flex-row">
						{" "}
						<div
							className={`w-full max-w-xs lg:max-w-md h-auto aspect-[3/4] transition-transform duration-1000 ${
								isVisible ? "animate__animated animate__fadeInLeft" : ""
							}`}
						>
							{" "}
							<div className="w-full h-full bg-gradient-to-b from-teal-300 via-cyan-700 to-sky-700 rounded-tl-[40%] rounded-tr-[40%] border-8 border-white shadow-xl overflow-hidden">
								{" "}
								<img
									src={Doctor_Special_Services}
									alt="Doctor"
									className="object-cover w-full h-full transition-transform duration-1000 ease-in-out hover:scale-110"
								/>{" "}
							</div>{" "}
						</div>{" "}
					</div>{" "}
				</div>

				{/* Services Container */}
				<div
					className={`w-full lg:w-2/3 bg-gradient-to-r from-teal-200 to-teal-500 rounded-3xl p-6 lg:p-12 ${
						isVisible ? "animate__animated animate__fadeInRight" : ""
					}`}
				>
					{/* Title */}
					<div className="flex flex-col items-center justify-center mb-8 lg:flex-row lg:mb-12">
						<h2
							className={`text-3xl lg:text-6xl font-bold font-['Poppins'] text-indigo-950 mr-0 lg:mr-4 mb-2 lg:mb-0 ${
								isVisible ? "animate__animated animate__fadeInRight" : ""
							}`}
						>
							Our
						</h2>
						<h2 className="text-3xl lg:text-5xl font-bold font-['Poppins'] text-white">
							Special Services
						</h2>
					</div>

					{/* Services Grid */}
					<div className="grid grid-cols-2 gap-6 lg:gap-12">
						<div className="space-y-6 lg:space-y-12">
							<ServiceItem
								icon={<FaCalculator size={36} color="white" />}
								text="BMI Calculator"
								isLink
								linkPath="/BMI_Calculator"
							/>
							<ServiceItem
								icon={<FaFlask size={36} color="white" />}
								text="Lab Reports"
								isLink
								linkPath="/labreport"
							/>
						</div>
						<div className="space-y-6 lg:space-y-12">
							<ServiceItem
								icon={<SlCalender size={36} color="white" />}
								text="Appointment Fee"
								isLink
								linkPath="https://buy.stripe.com/test_6oE7vTcFR6Tr4la000"
							/>
							<ServiceItem
								icon={<FaHospital size={36} color="white" />}
								text="Hospital Near Me"
								isLink
								linkPath="/Hospital_Near_Me"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const ServiceItem = ({ icon, text, isLink = false, linkPath = "" }) => {
	const content = (
		<div className="text-center">
			<div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-gradient-to-b from-teal-300 to-sky-700 rounded-[25%] flex justify-center items-center mb-4">
				{icon}
			</div>
			<div className="text-sm lg:text-base">{text}</div>
		</div>
	);

	return (
		<div className="text-center transition-all hover:scale-105">
			{isLink ? (
				linkPath.startsWith("http") ? (
					<a
						href={linkPath}
						target="_blank"
						rel="noopener noreferrer"
						className="block"
					>
						{content}
					</a>
				) : (
					<Link to={linkPath} className="block">
						{content}
					</Link>
				)
			) : (
				content
			)}
		</div>
	);
};

export default Special_Services;
