const { connection, query } = require('../database/MySQL-connection');

class schedule
{
    
    constructor(email,usermedicineName,id,dose,whenToTakeValues)
    {
        this.user_email= email;
        this.medicineName = usermedicineName;
        this.id = id;
        this.dosage = dose;
        this.whenToTakeValues = whenToTakeValues;
    }

    async save()
    {
        await query('INSERT INTO schedule (table_id, email, medicineName,dosage,wtt) VALUES (?, ?, ?, ?, ?)', [this.id, this.user_email, this.medicineName, this.dosage, this.whenToTakeValues]);
    }
    
    

    





}


module.exports = schedule;
