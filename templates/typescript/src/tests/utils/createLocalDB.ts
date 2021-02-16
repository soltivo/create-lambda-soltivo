import * as AWS from 'aws-sdk';
import { MASTER_DEFINITION } from './databaseDefinition';

const DB = new AWS.DynamoDB({
    endpoint: 'http://localhost:8000',
    region: 'local',
});

export const createTables = async () => {
    try {
        await DB.createTable(MASTER_DEFINITION).promise();
        return Promise.resolve();
    } catch (error) {
        console.log('Table creation failed', error);
        return Promise.reject(error);
    }
};
