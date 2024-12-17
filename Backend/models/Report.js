const { default: mongoose } = require("mongoose");

const reportSchema = new mongoose.Schema(
	{
		patientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		doctorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		reportType: {
			type: String,
		},
		description: {
			type: String,
		},
		fileUrl: {
			type: String, // Path to the uploaded file (cloud or local)
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
