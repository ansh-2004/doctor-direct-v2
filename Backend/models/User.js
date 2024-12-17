const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		age: {
			type: Number,
			required: true,
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"],
			required: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			required: true,
		},
		speciality: {
			// Field for doctor's speciality
			type: String,
			default: null, // Default value is null if not provided
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
