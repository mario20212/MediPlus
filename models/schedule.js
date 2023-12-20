const { connection, query } = require('../database/MySQL-connection');
const System = require('../models/system.js'); // Make sure to provide the correct path to your System class

class Schedule {
    constructor(email, usermedicineName, id, dose, whenToTakeValues) {
        this.user_email = email;
        this.medicineName = usermedicineName;
        this.id = id;
        this.dosage = dose;
        this.whenToTakeValues = whenToTakeValues;
    }
    async getAllSchedules() {
        try {
            const result = await query('SELECT * FROM schedule');
            return result;
        } catch (error) {
            console.error('Error retrieving schedules:', error);
            throw error;
        }
    }

    async save() {
        // Your save method implementation
    }

    static async checkAndSendReminder() {
        const allSchedules = await new Schedule().getAllSchedules();
        const date = new Date(); // Get the current hour (0-23)
        const currentHour = date.getHours();
        const currentMinutes = date.getMinutes();

        allSchedules.forEach(schedule => {
            try {
                if (schedule.wtt == "1beforeBreakfast" && currentHour === 9 && currentMinutes === 0) {

                    const message = `It's time to take ${schedule.dosage} pills of your medicine (${schedule.medicineName}) now.`;
                    const system = new System();
                    system.sendEmail(schedule.email, message);
                } else if (schedule.whenToTakeValues == "2afterBreakfast" && currentHour === 12 && currentMinutes === 0) {

                    const message = `It's time to take ${schedule.dosage} pills of your medicine (${schedule.medicineName}) now.`;

                    const system = new System();
                    system.sendEmail(this.user_email, message);
                } else if (schedule.whenToTakeValues == "3beforeLunch" && currentHour === 15 && currentMinutes === 0) {
                
                    const message = `It's time to take ${schedule.dosage} pills of your medicine (${schedule.medicineName}) now.`;

                    const system = new System();
                    system.sendEmail(this.user_email, message);
                } else if (schedule.whenToTakeValues == "4afterLunch" && currentHour === 18 && currentMinutes === 0) {
                    
                    const message = `It's time to take ${schedule.dosage} pills of your medicine (${schedule.medicineName}) now.`;

                    const system = new System();
                    system.sendEmail(this.user_email, message);
                } else if (schedule.whenToTakeValues == "5beforeDinner" && currentHour === 21 && currentMinutes === 0) {
            
                    const message = `It's time to take ${schedule.dosage} pills of your medicine (${schedule.medicineName}) now.`;

                    const system = new System();
                    system.sendEmail(this.user_email, message);
                }
            } catch (error) {
                console.error('Error retrieving schedules:', error);
                throw error;
            }
        });
    }

    static async continuousReminderCheck() {
        while (true) {
            await this.checkAndSendReminder();
            await new Promise(resolve => setTimeout(resolve, 31000)); 
        }
    }
}

module.exports = Schedule;