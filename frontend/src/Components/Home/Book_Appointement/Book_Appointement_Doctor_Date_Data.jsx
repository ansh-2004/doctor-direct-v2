import React, { useContext, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";

export default function StaticDatePickerLandscape() {
	const { setDoctorDate, doctor, doctorDate, Uid } = useContext(AppContext);
	const [tempDate, setTempDate] = useState(null);
	const navigate = useNavigate();

	const handleDateChange = async () => {
		if (!tempDate) {
			toast.error("Please select a date");
			return;
		}

		const formattedDate = dayjs(tempDate).format("YYYY-MM-DD");
		setDoctorDate(formattedDate);

		const data = {
			doctorId: doctor,
			patientId: Uid,
			date: formattedDate,
		};

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/Set_doctor_Appointement`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				const errorMessage = await response.json();
				toast.error(errorMessage.message);
				return;
			}

			const responseData = await response.json();
			toast.success(responseData.message);
			navigate("/view_Appointments");
		} catch (error) {
			console.error("Error:", error);
			toast.error("An unexpected error occurred");
		}
	};

	return (
		<div className="container max-w-md px-4 py-6 mx-auto">
			<div className="overflow-hidden bg-white rounded-lg shadow-lg">
				<div className="p-4 bg-gradient-to-r from-teal-300 to-sky-700">
					<h2 className="text-2xl font-bold text-center text-white">
						Select Appointment Date
					</h2>
				</div>

				<div className="p-4 space-y-4">
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<StaticDatePicker
							className="w-full"
							orientation="portrait"
							minDate={dayjs()}
							value={tempDate}
							onChange={(newValue) => setTempDate(newValue)}
							slotProps={{
								actionBar: {
									actions: [],
								},
								toolbar: {
									hidden: false,
								},
							}}
							sx={{
								"& .MuiPickersCalendarHeader-root": {
									marginBottom: "8px",
								},
								"& .MuiPickersDay-root": {
									borderRadius: "8px",
								},
							}}
						/>
					</LocalizationProvider>

					<div className="flex flex-col space-y-3">
						{tempDate && (
							<div className="font-medium text-center text-gray-700">
								Selected Date: {dayjs(tempDate).format("MMMM D, YYYY")}
							</div>
						)}

						<Button
							onClick={handleDateChange}
							className="w-full"
							disabled={!tempDate}
							size="lg"
						>
							{tempDate ? "Book Appointment" : "Select a Date"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
