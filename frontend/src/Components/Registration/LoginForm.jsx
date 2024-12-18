import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const LoginForm = () => {
	const { isLoggedIn, setAndCheckExpiration, setUid, role, setRole } =
		useContext(AppContext);
	const { name, setName } = useContext(AppContext);
	const navigate = useNavigate();
	const { Uid } = useContext(AppContext);
	const [appointments, setAppointments] = useState([]);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric", // Adjust formatting options as needed
		});
	};
	const [showPassword, setShowPassword] = useState(false);

	function changeHandler(event) {
		const { name, value } = event.target;
		if (name === "email") {
			const emailRegex = /^[A-Za-z0-9@.]+$/;
			if (value === "" || emailRegex.test(value)) {
				setFormData((prevData) => ({
					...prevData,
					[name]: value,
				}));
				//console.log("email passes");
			}
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	}
	const fetchAppointments = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/viewAllDoctorAppointementForPatient?id=${Uid}`,
				{
					method: "GET",
					header: {
						"content-type": "application/json",
					},
				}
			);

			if (!response.ok) {
				const data = await response.json();

				throw new Error(`Error fetching Appointments: ${response.status}`);
			}
			const data = await response.json();
			setAppointments(data);

			// if (data && data.Data) {
			//   const appointmentsWithdoctorDetails = await Promise.all(
			//     data.Data.map(async (appointment) => {
			//       const doctorDetails = await fetchdoctorDetails(appointment.doctor);
			//       return { ...appointment, doctorDetails };
			//     })
			//   );
			//   setAppointments(appointmentsWithdoctorDetails);
			// } else {
			//   // console.error("Error: Appointments not found");
			// }
		} catch (err) {
			console.error("Error fetching Appointments:", err);
		} finally {
			// Ensure loading state is set to false even on errors
		}
	};
	useEffect(() => {
		fetchAppointments();
	}, []);
	async function submitHandler(event) {
		event.preventDefault();
		//handling with backend part
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			const errormess = await response.json();
			//console.log(typeof errormess.message);
			toast.error(errormess.message);
			return;
		}

		if (response.ok) {
			const data = await response.json();
			//console.log(data);
			toast.success(data.message);
			//console.log(appointments);

			// const reminder= (appointments?.Data[0]?.date?formatDate(appointments.Data[0].date):'No Appointments');
			const reminder = appointments?.Data?.[0]?.date
				? formatDate(appointments.Data[0].date)
				: "No Appointments";

			//console.log(reminder);

			toast.success(`Reminder: ${reminder}`);
			setName(data.name);
			setUid(data.id);
			setRole(data.role);
			setAndCheckExpiration(true);

			// Check the role after it's been set
			if (data.role === "Doctor") {
				navigate("/Doctor_UI");
			} else {
				navigate("/");
			}
			//console.log("role is " + data.role);
		}
	}

	useEffect(() => {
		//console.log("Effect triggered. isLoggedIn:", isLoggedIn);
		if (isLoggedIn) {
			if (role === "patient") navigate("/");
			else navigate("/Doctor_UI");
		}
	}, [isLoggedIn, navigate]);

	return (
		<form
			onSubmit={submitHandler}
			className="flex flex-col w-full max-w-md p-4 mx-auto gap-y-6"
		>
			<label className="w-full">
				<p className="text-[0.75rem] md:text-sm mb-2 leading-normal text-gray-700">
					Email Address <sup className="text-red-500">*</sup>
				</p>
				<input
					required
					type="Email"
					value={formData.email}
					onChange={changeHandler}
					placeholder="Enter Email id"
					name="email"
					className="bg-grey-900 rounded-lg w-full p-2.5 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
				/>
			</label>

			<label className="relative w-full">
				<p className="text-[0.75rem] md:text-sm mb-2 leading-normal text-gray-700">
					Password <sup className="text-red-500">*</sup>
				</p>
				<input
					required
					type={showPassword ? "text" : "password"}
					value={formData.password}
					onChange={changeHandler}
					placeholder="Enter Password"
					name="password"
					className="rounded-lg w-full p-2.5 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200 pr-10"
				/>
				<span
					className="absolute right-3 top-[60%] transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
					onClick={() => setShowPassword((prev) => !prev)}
				>
					{showPassword ? (
						<AiOutlineEyeInvisible className="w-5 h-5" />
					) : (
						<AiOutlineEye className="w-5 h-5" />
					)}
				</span>

				<Link to="/Forget">
					<p className="mt-2 ml-auto text-sm font-semibold text-blue-500 transition-colors hover:text-blue-600 max-w-max">
						Forget Password
					</p>
				</Link>
			</label>

			<button className="bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white px-6 py-2.5 transition-colors duration-200 mt-2 w-full md:w-auto md:self-start">
				Sign in
			</button>
		</form>
	);
};

export default LoginForm;
