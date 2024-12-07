const cron = require('node-cron');
const mailSender = require('./mailSender');

function scheduleReminderEmail(patientData, doctorData, appointmentDate) {
    const reminderDate = new Date(appointmentDate);
    reminderDate.setDate(reminderDate.getDate() - 1);
    //console.log(reminderDate);
    
    cron.schedule(reminderDate.toLocaleDateString(), async () => {
        const title = `Appointment Reminder`;
        const body = `Dear ${patientData.name},<br><p>This is a reminder for your appointment with Dr. ${doctorData.name} on ${appointmentDate} at Nehru Park, Near Gandhi Chownk, Delhi.</p>`;
        await mailSender(patientData.email, title, body);
    });
   
}


module.exports = {scheduleReminderEmail};
