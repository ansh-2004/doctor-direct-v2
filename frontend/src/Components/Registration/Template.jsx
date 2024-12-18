import React from "react";
import Login_Image from "../../Assets/Login_Image.webp";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { FcGoogle } from "react-icons/fc";

const Template = ({ formType }) => {
	return (
		<div className="flex flex-col md:flex-row w-full min-h-screen p-4 md:p-8 lg:p-12 gap-8 md:gap-12 lg:gap-16 max-w-[1160px] mx-auto justify-center md:justify-between items-center">
			{/* Image container */}
			<div className="w-full max-w-md md:w-1/2">
				<img
					src={Login_Image}
					alt="Earth"
					className="object-contain w-full h-auto"
				/>
			</div>

			{/* Form container */}
			<div className="w-full md:w-1/2 max-w-[450px] border border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 bg-white shadow-sm">
				{formType === "signup" ? <SignupForm /> : <LoginForm />}
			</div>
		</div>
	);
};

export default Template;
