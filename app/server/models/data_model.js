class DataModel {
    constructor() {
        this.data = [];
        this.errors = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        for (let index = 0; index < this.data.length; index++){
            const item = this.data[index];
            if (id === item.id){
                return item;
            }
        }
                return null;
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        for (let index = 0; index < this.data.length; index++){
            const item = this.data[index];
            if (item.id === id){
                for (const key in obj) {
                    if (Object.hasOwnProperty.call(obj, key)) {
                        const item = obj[key];
                        this.data[index][key] = item
                        
                    }
                }
                    return true;
            }
        }
                    return false;
    }

    delete(id) {
        for (let index = 0; index < this.data.length; index++){
            const item = this.data[index]
            if (item.id === id){
                this.data.splice(index, 1)
                return true;
            }
        }
                return false;
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;