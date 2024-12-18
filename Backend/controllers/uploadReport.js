const { default: mongoose } = require("mongoose");
const cloudinary = require("../index");
const Report = require("../models/Report"); // Import the Report model

const uploadReport = async (req, res) => {
	try {
		const { patientId, doctorId, description, appointmentId } = req.body;

		// Validate input
		if (!patientId || !doctorId) {
			return res.status(400).json({
				success: false,
				message: "Either patientId or doctorId is not found",
			});
		}

		const reportFile = req.file;
		if (!reportFile) {
			return res
				.status(400)
				.json({ success: false, message: "Report file not found" });
		}

		// Ensure the uploaded file is a PDF
		if (!reportFile.mimetype || !reportFile.mimetype.includes("pdf")) {
			return res.status(400).json({
				success: false,
				message: "Uploaded file must be a PDF",
			});
		}

		// Upload to Cloudinary
		const result = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					resource_type: "auto",
					public_id: `pdfs/${Date.now()}`,
					folder: "doctorDirect/labReport",
				},
				(error, result) => {
					if (error) return reject(error);
					resolve(result);
				}
			);
			stream.end(req.file.buffer);
		});

		console.log("result: ", result);

		// Save report details to the database
		const newReport = new Report({
			appointmentId,
			patientId,
			doctorId,
			description: description || "",
			fileUrl: result.secure_url, // Save the uploaded file's URL
		});

		await newReport.save();

		res.status(201).json({
			success: true,
			message: "Report uploaded successfully",
			report: newReport,
		});
	} catch (error) {
		console.error("Error uploading report:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

const getReport = async (req, res) => {
	try {
		// Extract appointmentId from request query or params
		const { appointmentId } = req.params;

		// Validate if appointmentId is provided
		if (!appointmentId) {
			return res
				.status(400)
				.json({ success: false, message: "appointmentId is required" });
		}

		if (!mongoose.isValidObjectId(appointmentId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid appointmentId format",
			});
		}
		// Find reports with the given appointmentId
		const reports = await Report.find({ appointmentId });

		// Check if reports exist
		if (!reports || reports.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No reports found for this appointmentId",
			});
		}

		// Return the reports
		return res.status(200).json({ success: true, data: reports });
	} catch (error) {
		console.error("Error fetching reports:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error in getReport",
			error,
		});
	}
};

module.exports = { uploadReport, getReport };
