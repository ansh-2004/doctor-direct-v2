import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Components/Context/AppContext";
import Button from "../Components/Button";
import {
	FaUser,
	FaFileUpload,
	FaFileMedical,
	FaHeartbeat,
} from "react-icons/fa";

function Patient() {
	const { id } = useParams();
	const [patient, setPatient] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState("");
	const [uploadStatus, setUploadStatus] = useState(null);
	const { Uid } = useContext(AppContext);

	useEffect(() => {
		const fetchPatientDetails = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND_URL}/get_User_Details?id=${id}`
				);
				if (!response.ok) throw new Error("Failed to fetch patient details");

				const data = await response.json();
				setPatient(data.data);
				setLoading(false);
			} catch (err) {
				setError("Unable to fetch patient details");
				setLoading(false);
			}
		};

		fetchPatientDetails();
	}, [id]);

	const handleFileChange = (e) => {
		e.preventDefault();
		setFile(e.target.files[0]);
	};

	const handleUploadReport = async (e) => {
		e.preventDefault();
		if (!file) {
			setUploadStatus("Please select a file to upload");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);
		formData.append("doctorId", Uid);
		formData.append("patientId", id);
		formData.append("description", description);

		try {
			setUploadStatus("Uploading...");
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/uploadReport`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) throw new Error("Failed to upload report");

			const data = await response.json();
			setUploadStatus("Report uploaded successfully");
		} catch (err) {
			setUploadStatus("Failed to upload report");
		}
	};

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
				<div className="p-6 text-center animate-pulse">
					<FaUser className="w-16 h-16 mx-auto mb-4 text-blue-500" />
					<p className="text-xl font-semibold text-gray-700">Loading...</p>
				</div>
			</div>
		);

	if (error)
		return (
			<div className="flex items-center justify-center min-h-screen bg-red-50">
				Error
			</div>
		);

	return (
		<div className="w-full min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-blue-100 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto overflow-hidden transition-all duration-300 transform bg-white rounded-xl ">
				{/* Patient Header */}
				<div className="p-6 bg-gradient-to-r from-blue-500 to-teal-400">
					<h1 className="flex items-center justify-center text-3xl font-extrabold text-center text-white">
						<FaUser className="w-8 h-8 mr-3" />
						Patient Details
					</h1>
				</div>

				{/* Patient Information */}
				<div className="p-6 space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="p-4 rounded-lg shadow-inner bg-blue-50">
							<h2 className="flex items-center mb-2 text-lg font-bold text-blue-700">
								<FaUser className="w-5 h-5 mr-2" /> Personal Info
							</h2>
							<div className="space-y-2">
								<p>
									<strong className="text-gray-600">Name:</strong>{" "}
									{patient.name}
								</p>
								<p>
									<strong className="text-gray-600">Email:</strong>{" "}
									{patient.email}
								</p>
								<p>
									<strong className="text-gray-600">Gender:</strong>{" "}
									{patient.gender}
								</p>
								<p>
									<strong className="text-gray-600">Age:</strong> {patient.age}
								</p>
							</div>
						</div>

						{/* Medical History */}
						<div className="p-4 rounded-lg shadow-inner bg-blue-50">
							<h2 className="flex items-center mb-2 text-lg font-bold text-blue-700">
								<FaHeartbeat className="w-5 h-5 mr-2" /> Medical History
							</h2>
							{patient.medicalHistory?.length > 0 ? (
								<ul className="space-y-2">
									{patient.medicalHistory.map((entry, index) => (
										<li
											key={index}
											className="p-2 transition-all duration-200 bg-white rounded-md shadow-sm hover:bg-blue-100"
										>
											{entry.condition}
											<span className="block text-sm text-gray-500">
												Diagnosed:{" "}
												{new Date(entry.diagnosisDate).toLocaleDateString()}
											</span>
										</li>
									))}
								</ul>
							) : (
								<p className="italic text-gray-500">
									No medical history available.
								</p>
							)}
						</div>
					</div>

					{/* Upload Report Section */}
					<div className="p-6 mt-6 rounded-lg shadow-inner bg-blue-50">
						<h2 className="flex items-center mb-4 text-lg font-bold text-blue-700">
							<FaFileUpload className="w-5 h-5 mr-2" /> Upload Medical Report
						</h2>
						<form onSubmit={handleUploadReport} className="space-y-4">
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-700">
									Description
								</label>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder="Enter report description"
									className="w-full px-3 py-2 transition duration-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-700">
									Report File
								</label>
								<input
									type="file"
									required
									name="file"
									onChange={handleFileChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white file:px-4 file:py-2 hover:file:bg-blue-600"
								/>
							</div>
							<Button isLoading={loading} type="submit">
								Upload Report
							</Button>
						</form>
						{uploadStatus && (
							<div
								className={`mt-4 text-center font-semibold ${
									uploadStatus.includes("success")
										? "text-green-600 bg-green-50"
										: "text-red-600 bg-red-50"
								} p-2 rounded-md`}
							>
								{uploadStatus}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Patient;
