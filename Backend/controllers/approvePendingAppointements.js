const Doctor_appointment = require("../models/Doctor_Appointement");
const mailSender = require('../utilities/mailSender');
const User = require('../models/User');
const {scheduleReminderEmail} = require('../utilities/remindermail');
exports.approveAppointement = async (req, res) => {
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

    appointmentToUpdate.status = "Scheduled";

    const updatedAppointment = await appointmentToUpdate.save();

    const patientData = await User.findById(appointmentToUpdate.patient);
    const doctorData = await User.findById(appointmentToUpdate.doctor);

    const title = `Appointment Confirmation Mail`;
    const body = `Congratulations, ${patientData.name} <br> <p>Your Appointment with Doctor ${doctorData.name} on ${appointmentToUpdate.date} at Nehru Park , Near Gandhi Chownk , Delhi has been successfully scheduled</p>`
    //email,title,body

    await mailSender(patientData.email,title,body);
    //reminder
    //scheduleReminderEmail(patientData, doctorData, appointmentToUpdate.date);


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
