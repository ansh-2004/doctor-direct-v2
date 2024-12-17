import React from "react";

const Button = ({ onClick, children, className = "" }) => {
	return (
		<button
			onClick={onClick}
			className={`px-10 py-3 text-lg font-semibold text-white transition-all rounded-full sm:text-xl bg-gradient-to-r from-teal-300 to-sky-700 hover:scale-110 font-['Poppins'] ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
