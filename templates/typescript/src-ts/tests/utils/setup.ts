import * as AWS from 'aws-sdk';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import chaiLike = require('chai-like');
import factories = require('chai-factories');
import chaiThing = require('chai-things');
import { createDb } from './createLocalDB';
import { deleteTables } from './deleteLocalDB';

chai.should();
chai.use(chaiHttp);
chai.use(factories);
chai.use(chaiThing);
chai.use(chaiLike);

// Configure the DynamoDB for the local endpoint and region
const dynamoDB = new AWS.DynamoDB({
    endpoint: 'http://localhost:8000', //👈 Cannot use process.env.DYNAMO_DB_ENDPOINT because the npm test doesn't set node process variables
    region: 'local',
});

const params: { TableName: string } = {
    TableName: 'local-Master', //👈 Cannot use process.env.TABLE_NAME because the npm test doesn't set node process variables
};

before(async () => {
    // Check if the table already exists
    dynamoDB.waitFor('tableExists', params, async (err) => {
        // an error occurred
        if (err) {
            console.log(err, err.stack);
            return;
        } else {
            await deleteTables();
            await createDb();
            return Promise.resolve();
        }
    });

    // If the table doesn't exist we don't need to delete it
    dynamoDB.waitFor('tableNotExists', params, async (err, data) => {
        // an error occurred
        if (err) {
            console.log(err, err.stack);
            return;
        }
        // Table does not exist so create it
        else {
            await createDb();
            return Promise.resolve();
        }
    });
});

after(async () => {
    // Check if the table already exists
    dynamoDB.waitFor('tableExists', params, async (err) => {
        // an error occurred
        if (err) {
            console.log(err, err.stack);
            return;
        } else {
            await deleteTables();
            return Promise.resolve();
        }
    });
});

export default chai;
