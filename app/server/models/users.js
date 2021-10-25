const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.matricNumber = matricNumber
        this.program = program
        this.graduationYear = graduationYear
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`
    }
}

class Users extends DataModel {

    constructor(errors){
        super(errors)
    }

    authenticate(email, password) {
        let user = this.data.find( item => (item.email === email) && (item.password === password))
        

            if (user) {
                
                return true
            } else{
                return false
            }
            
        
    }

    getByEmail(email) {
        for (let index = 0; index < this.data.length; index++) {
            const item = this.data[index];

            if (email === item.email) {
                return item
            }
        }
        return null
    }

    getByMatricNumber(matricNumber) {
        for (let index = 0; index < this.data.length; index++) {
            const item = this.data[index];

            if (matricNumber === item.matricNumber) {
                return item
            }
        }
        return null
    }

    validate(obj) {
        this.errors = [];
        let msg;
        let isEmpty, userEmail, userMatric, passNot;
        //Check for empty values
        for (const x in obj) {
            if (Object.hasOwnProperty.call(obj, x)) {
                const item = obj[x];
                if (item == "") {
                    isEmpty = true;
                    msg = x + " should not be empty"
                    this.errors.push(msg)
                }
            }
        }

        //Check if email exists
        for (let index = 0; index < this.data.length; index++) {
            const item = this.data[index];

            if (obj.email == item.email) {
                userEmail = true;
                msg = "A user with specified email address already exists"
                this.errors.push(msg)
            }
        }

        //check if matricNumber is in use
        for (let index = 0; index < this.data.length; index++) {
            const item = this.data[index];

            if (obj.matricNumber == item.matricNumber) {
                userMatric = true;
                msg = "A user with specified matric number already exists";
                this.errors.push(msg);
            }
        }

        //Check Valid password
        if (obj.password.length < 7){
            passNot = true;
         msg = "Password should have at least 7 characters"   
         this.errors.push(msg);
        }
        
        if (isEmpty || userEmail || userMatric || passNot){
            return false} else {
                return true;
            }
        }
    }


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};
