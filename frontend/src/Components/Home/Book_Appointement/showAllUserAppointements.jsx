import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { SpinningCircles } from "react-loading-icons";
import { FaFileDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import Badge from "../../Badge";
import Button from "../../Button";

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric", // Adjust formatting options as needed
	});
};

const ShowAllUserAppointements = () => {
	const { Uid } = useContext(AppContext);
	const [loading, setLoading] = useState(true);
	const [appointments, setAppointments] = useState([]);

	console.log("appointments: ", appointments);

	const fetchdoctorDetails = async (Id) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/get_User_Details?id=${Id}`
			);

			if (!response.ok) {
				throw new Error(`Error fetching patient details: ${response.status}`);
			}

			const data = await response.json();
			// console.log(data);

			if (data && data.data) {
				return data.data.name;
			} else {
				// console.error("Error: Patient name not found");
				return ""; // Set an empty string as a placeholder
			}
		} catch (err) {
			// console.error("Error fetching patient details:", err);
			return ""; // Set an empty string on error (optional)
		}
	};

	const fetchAppointments = async () => {
		setLoading(true);

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
				// console.log(data.message);

				throw new Error(`Error fetching Appointments: ${response.status}`);
			}
			const data = await response.json();
			// console.log(data);
			// console.log(data);

			if (data && data.Data) {
				const appointmentsWithdoctorDetails = await Promise.all(
					data.Data.map(async (appointment) => {
						const doctorDetails = await fetchdoctorDetails(appointment.doctor);
						return { ...appointment, doctorDetails };
					})
				);
				setAppointments(appointmentsWithdoctorDetails);
			} else {
				// console.error("Error: Appointments not found");
			}
		} catch (err) {
			// console.error("Error fetching Appointments:", err);
		} finally {
			setLoading(false); // Ensure loading state is set to false even on errors
		}
	};

	const handleDelete = async (Id) => {
		setLoading(true);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/deleteDAppoint?id=${Id}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" }, // Add headers if needed
					// body: JSON.stringify({ id: Id }), // Add body if your backend expects data
				}
			);

			if (response.ok) {
				const data = await response.json();
				toast.success(data.message);
				fetchAppointments();
				setLoading(false);
			} else {
				const data = await response.json();
				toast.error(data.message);
				setLoading(false);
			}
		} catch (error) {
			toast.error(error.toString()); // Convert error object to string
			console.error(error);
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchAppointments();
	}, []);

	return (
		<div className="m-[2rem]">
			{loading ? (
				<div className="w-100 h-[60vh] flex justify-center items-center">
					<SpinningCircles color="#4299e1" fill="#4299e1" />
				</div>
			) : (
				appointments.map((appointment, index) => (
					<AppointmentCard
						key={index}
						appointment={appointment}
						appointments={appointments}
						setAppointments={setAppointments}
					/>
				))
			)}
		</div>
	);
};

export default ShowAllUserAppointements;

const AppointmentCard = ({ appointment, appointments, setAppointments }) => {
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState(appointment.status);
	const [isReportUploaded, setIsReportUploaded] = useState(false);
	const [fileUrl, setFileUrl] = useState("");

	const fetchReport = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/getReport/${appointment._id}`
			);
			const data = await response.json();
			setIsReportUploaded(data.success);
			setFileUrl(data.data[0].fileUrl);
			console.log("report response", data);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchReport();
	}, []);

	const handleDownload = () => {
		alert(fileUrl);
		const link = document.createElement("a");
		link.href = fileUrl; // URL of the PDF
		link.download = "file.pdf"; // Specify the file name for download
		document.body.appendChild(link); // Append link to the document
		link.click(); // Trigger the download
		document.body.removeChild(link); // Clean up by removing the link
	};

	const handleDelete = async (Id) => {
		setLoading(true);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/deleteDAppoint?id=${Id}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" }, // Add headers if needed
					// body: JSON.stringify({ id: Id }), // Add body if your backend expects data
				}
			);

			if (response.ok) {
				const data = await response.json();
				toast.success(data.message);
				setAppointments(appointments.filter((el) => el._id !== Id));
				setLoading(false);
			} else {
				const data = await response.json();
				toast.error(data.message);
				setLoading(false);
			}
		} catch (error) {
			toast.error(error.toString()); // Convert error object to string
			console.error(error);
			setLoading(false);
		}
	};
	return (
		<div>
			<div className="p-4 m-4 border border-gray-500 rounded-lg cursor-pointer">
				<div className="flex items-center justify-between w-full">
					<div>
						<div>Date: {formatDate(appointment.date)}</div>
						<div>Doctor: {appointment.doctorDetails || "Name Unavailable"}</div>
					</div>
					<div className="flex items-center gap-3">
						<div>
							<Badge status={status} />
						</div>
						{status === "Pending" && (
							<Button
								isLoading={loading}
								onClick={() => handleDelete(appointment._id)}
								size="sm"
							>
								Cancel
							</Button>
						)}
						{status === "Completed" && isReportUploaded && (
							<Button
								isLoading={loading}
								onClick={() => {
									handleDownload();
								}}
								size="sm"
							>
								<div className="flex items-center justify-center gap-2">
									<FaFileDownload size={24} />
									<span>Lab Report</span>
								</div>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
