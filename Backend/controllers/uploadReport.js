const cloudinary = require("../index");
const Report = require("../models/Report"); // Import the Report model

const uploadReport = async (req, res) => {
	try {
		const { patientId, doctorId, description } = req.body;

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

module.exports = uploadReport;
