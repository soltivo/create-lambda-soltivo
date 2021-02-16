import * as AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB({
    endpoint: 'http://localhost:8000',
    region: 'local',
});

const params = {
    TableName: 'local-Master', //👈 Cannot use process.env.TABLE_NAME because the npm test doesn't set node process variables
};

export const deleteTables = async () => {
    try {
        await dynamoDB.deleteTable(params).promise();
        return Promise.resolve();
    } catch (error) {
        if(error.code == 'ResourceNotFoundException') {
            // If the table did not exists, it is a good behavior.
            //console.log('Cant delete a non existing table.');
            return Promise.resolve();
        } else {
            console.log('Table deletion failed', error);
            return Promise.reject(error);
        }
    }
};
