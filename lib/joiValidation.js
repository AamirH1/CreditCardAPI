const requestSchema = require('./joiSchemas');

module.exports = class Validator{

    validate(request, object){

        let schema = requestSchema[request];
        const result = schema.validate(object);
        
        if (result.error) {
            console.log("Request Validation failed.");
            throw result.error;
        } else if(result.warning){
            throw result.warning;
        }
    }
}