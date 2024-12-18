import React from "react";

const Button = ({
	onClick,
	children,
	className = "",
	size = "md",
	isLoading = false,
}) => {
	const sizeClasses = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-md",
		lg: "px-8 py-4 text-lg",
	};

	return (
		<button
			onClick={onClick}
			className={`font-semibold text-white transition-all rounded-full bg-gradient-to-r from-teal-300 to-sky-700 hover:scale-110 font-['Poppins'] ${sizeClasses[size]} ${className}`}
			disabled={isLoading}
		>
			{isLoading ? (
				<svg
					className="w-5 h-5 mr-2 text-white animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
					></path>
				</svg>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
