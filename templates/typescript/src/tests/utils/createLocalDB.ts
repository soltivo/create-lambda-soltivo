import * as AWS from 'aws-sdk';
import { MASTER_DEFINITION } from './databaseDefinition';

const DB = new AWS.DynamoDB({
    endpoint: 'http://localhost:8000',
    region: 'local',
});

export const createDb = async () => {
    try {
        await DB.createTable(MASTER_DEFINITION).promise();
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};
