const Doctor_appointment = require("../models/Doctor_Appointement");
const mailSender = require('../utilities/mailSender');
const User = require('../models/User');


exports.rejectAppointement = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Provide ID",
      });
    }

    const appointmentToUpdate = await Doctor_appointment.findById(id);

    if (!appointmentToUpdate) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointmentToUpdate.status = "Rejected";

    const updatedAppointment = await appointmentToUpdate.save();

    const patientData = await User.findById(appointmentToUpdate.patient);
    const doctorData = await User.findById(appointmentToUpdate.doctor);

    const title = `Appointment Rejection Mail`;
    const body = `Sorry, ${patientData.name} <br> <p>Your Appointment with Doctor ${doctorData.name} on ${appointmentToUpdate.date}  has been rejected </p>`
    //email,title,body

    await mailSender(patientData.email,title,body);
    return res.status(200).json({
      success: true,
      message: `Appointment Updated Sucessfully`,
      appointment: appointmentToUpdate,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error in Booking Appointment",
    });
  }
};
