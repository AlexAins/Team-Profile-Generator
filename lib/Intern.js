const Employee = require("./Employee.js");

class Intern extends Employee{
    constructor(employeeName, id, email, school){
        super(employeeName, id, email);

        this.school = school;
    }

    getSchool(){
        return this.school;
    }

    getRole(){
        return 'Intern';
    }
}

module.exports = Intern;