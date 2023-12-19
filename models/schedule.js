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

    
    
    

    





}


module.exports = schedule;
