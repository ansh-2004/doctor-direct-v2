import React from "react";
import Logo_Image from "../Assets/HealthConnectLogo.png"; // Ensure the correct path to your image

const Logo = () => {
	return (
		<img
			src={Logo_Image}
			alt="Logo"
			loading="lazy"
			className="w-auto h-16 cursor-pointer "
		/>
	);
};

export default Logo;
