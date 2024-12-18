import React from "react";
import Logo_Image from "../Assets/HealthConnectLogo.png"; // Ensure the correct path to your image
import { useNavigate } from "react-router-dom";

const Logo = () => {
	const navigate = useNavigate();
	return (
		<img
			src={Logo_Image}
			alt="Logo"
			loading="lazy"
			className="w-auto h-16 cursor-pointer "
			onClick={() => navigate("/")}
		/>
	);
};

export default Logo;
