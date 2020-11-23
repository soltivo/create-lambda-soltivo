import { DynamoDB } from "aws-sdk";

/**
 * @param {Object} values array of all the values that needs to be converted into lowercase
 * @param {String} key the key you want to return from the object passed
 * @description Local lambda use Flask that is changing the headers to camel-case See https://github.com/aws/aws-sam-cli/issues/1860
 */
export const getParameter = (values: Object, key: string) => {
    if (!values || !key) return null;
    let result: string = values[key];
    if (!result) result = values[key.charAt(0).toUpperCase() + key.slice(1)];
    if (!result) result = values[key.toLowerCase()];
    return result;
};

/**
 *
 * @param {Object} obj check of the data passed is an object
 * @description Useful to check if an Object is empty
 * @return {Boolean} Return a boolean to check is the object is empty or not
 */
export const isEmptyObject = (obj: Object): Boolean => {
    if (!obj) return null;
    return Object.keys(obj).length === 0;
};

/**
 * @description Return a random color from the secondary color of the design
 */
export const getRandomColor = (): String => {
    const accentColors: Array<String> = [
        // Array of all the secondary colors for the FE
        "#867AD3",
        "#DB6EA2",
        "#86B0C1",
        "#E97272",
        "#79BB87",
        "#C4C66D",
        "#A873C1",
        "#FBA85C",
    ];
    // create a random number based on the number of index in the accentColors array
    const randomNumber: number = Math.floor(Math.random() * accentColors.length);
    return accentColors[randomNumber];
};

/**
 * @description If the environment is "local", then the code will use the local DB
 * @return Return a new DynamoDB DocumentClient with the URL depending upon the current environment
 */
export const getDynamoDBDocumentClient = () => {
    if (isLocalEnvironment()) {
        const dbURL = process.env.DYNAMO_DB_ENDPOINT || "http://localhost:8000";
        console.info("NOTE: Using local dynamoDB !!!", dbURL);
        return new DynamoDB.DocumentClient({ endpoint: dbURL });
    }
    return new DynamoDB.DocumentClient();
};

/**
 * @description Return a bool to check if the current env is local or not
 * @return {Boolean} Return a boolean to check rather or not the current env is "local"
 */
export const isLocalEnvironment = (): Boolean => {
    return getEnvironment() === "local";
};

/**
 * @description Useful to get the environment of where the code is running
 * @return {String} Return the environment set in the env file or "local"
 */
export const getEnvironment = (): String => {
    return process.env.ENVIRONMENT || "local";
};
