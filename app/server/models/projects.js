const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id
        this.name = name
        this.abstract = abstract
        this.authors = authors
        this.tags = tags
        this.createdBy = createdBy
    }
}

class Projects extends DataModel {
    validate(obj) {
        this.errors = [];
        let msg;
        
        //Check if Authors is array
        for (let key in obj) {
            if (key == 'authors' && !Array.isArray(obj[key])) {
                msg = key + " should be an array";
                this.errors.push(msg);
                //Check if Tag is array
            } else if (key == 'tags' && !Array.isArray(obj[key])) {
                msg = key + " should be an array";
                this.errors.push(msg);
            } else if (obj[key] == '' || obj[key] == [] || obj[key] == null) {
                if (key !== 'authors' && key !== 'tags') {
                    msg = key + " should not be empty";
                    this.errors.push(msg);
                }
            }
        }

        if (this.errors.length == 0) {
            return true;
        } else {
            return false;
        }
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};