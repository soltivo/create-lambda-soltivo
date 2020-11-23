import * as AWS from 'aws-sdk';
import { getDynamoDBDocumentClient } from '../../utils/utils';

AWS.config.update({
    region: 'local',
});

const documentClient = getDynamoDBDocumentClient();

export const headers = {
    orgid: '123',
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const insert = async () => {
    const params = {
        TableName: 'local-Master', //👈 Cannot use process.env.TABLE_NAME because the npm test doesn't set node process variables
        Item: {
            // Put your attributes here to insert an object for your GET test cases use the orgid 123
        },
    };
    return documentClient.put(params).promise();
};
