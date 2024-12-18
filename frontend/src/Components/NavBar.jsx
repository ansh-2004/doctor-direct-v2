import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import Button from "./Button";
import Logo from "./Logo";

const NavBar = () => {
	const { isLoggedIn, setAndCheckExpiration } = useContext(AppContext);
	const { name } = useContext(AppContext);

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navigate = useNavigate();

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<nav className="sticky top-0 z-50 bg-white border-teal-700 border-b-[1px]">
			<div className="container px-4 mx-auto sm:px-6 lg:px-8">
				<div className="flex items-center justify-between py-4">
					{/* Logo */}
					<Logo />

					{/* Mobile Menu Toggle */}
					<div className="lg:hidden">
						<button
							className="text-gray-700 focus:outline-none focus:text-gray-900"
							id="mobile-menu-toggle"
							onClick={toggleMobileMenu}
						>
							<svg
								className="w-6 h-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							</svg>
						</button>
					</div>

					{/* Desktop Menu */}
					<div className="items-center hidden gap-6 lg:flex">
						{/* Display for logged-out users */}
						{!isLoggedIn && (
							<>
								<Link to="/login">
									<Button>Login</Button>
								</Link>
								<Link to="/signup">
									<Button>SignUp</Button>
								</Link>
							</>
						)}

						{/* Display for logged-in users */}
						{isLoggedIn && (
							<>
								<div className="text-center font-semibold font-['Poppins'] text-gray-700">
									{name}
								</div>
								<Button
									onClick={() => {
										setAndCheckExpiration(false);
										navigate("/");
									}}
									className="w-auto h-auto px-5 py-2 rounded-full shadow bg-gradient-to-r from-teal-300 to-sky-700"
								>
									<div className="text-white font-semibold font-['Poppins'] text-sm">
										Log Out
									</div>
								</Button>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div
					id="mobile-menu"
					className="flex-col items-center bg-white border-t shadow-md lg:hidden"
				>
					{!isLoggedIn && (
						<>
							<Link to="/login">
								<div className="w-full py-3 font-semibold text-center text-teal-500 hover:bg-gray-100">
									Log in
								</div>
							</Link>
							<Link to="/signup">
								<div className="w-full py-3 font-semibold text-center text-teal-500 hover:bg-gray-100">
									Sign up
								</div>
							</Link>
						</>
					)}

					{isLoggedIn && (
						<>
							<div className="py-3 font-semibold text-center text-gray-700">
								{name}
							</div>
							<button
								onClick={() => setAndCheckExpiration(false)}
								className="w-full py-3 font-semibold text-center text-teal-500 hover:bg-gray-100"
							>
								Log Out
							</button>
						</>
					)}
				</div>
			)}
		</nav>
	);
};

export default NavBar;
