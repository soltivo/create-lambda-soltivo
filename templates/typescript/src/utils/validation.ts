import { Validator } from "jsonschema";
import { ValidationError } from "jsonschema";

const validator = new Validator();

/**
 * @description Validate that the body correspond to the event object description
 * @param {String} bodyData the raw body receive from the request. So a string normally
 */
export const bodyValidation = (bodyData: string) => {
    const parsedBody = JSON.parse(bodyData);
    const schema = {
        id: "/Body",
        type: "object", // the body is parse so it's an object
        properties: {
            // Put all the attributes you need in the body here and put the right type
            // to Learn More: http://json-schema.org/understanding-json-schema/reference/type.html
            attributeName: { type: "string" },
        },
        // All the require attributes names
        required: ["attributeName"],
        // Do you accept more attributes then expected ?
        additionalProperties: false,
    };
    return validator.validate(parsedBody, schema);
};

/**
 * @description Validate if the orgid is present in the header of the request
 * @param {Object} headerData Pass the full header and the function will do the rest
 */
export const headerValidation = (headerData: Object) => {
    /** Header Keys are all Cap so to have a better validation, we convert all keys to small cap */
    let newkey: string,
        capkeys = Object.keys(headerData);
    let n = capkeys.length;
    let newHeader = {};
    while (n--) {
        newkey = capkeys[n];
        newHeader[newkey.toLowerCase()] = headerData[newkey];
    }

    const schema = {
        id: "/Header",
        type: "object",
        properties: {
            orgid: { type: "string" }, //The orgid is a UUIDV4 so a string
        },
        required: ["orgid"],
        // You need to let that to true because the header have more info then the orgid
        additionalProperties: true,
    };
    return validator.validate(newHeader, schema);
};

export const formatErrors = (errors: ValidationError[], reason = "ValidationException"): object => {
    // field: error.property === 'instance' ? error.argument : error.property.split('.')[1],
    const res = errors.map((error) => {
        const property = error.property === "instance" ? error.argument : error.property.split(".")[1];
        return {
            domain: process.env.SERVICE_NAME,
            reason: reason,
            field: property,
            message: error.message,
        };
    });

    return res;
};
