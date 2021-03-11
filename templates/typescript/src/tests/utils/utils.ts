import * as AWS from "aws-sdk";
import { getDynamoDBDocumentClient } from "../../utils/utils";
import { Response } from "superagent";
import { MASTER } from "../../utils/database";

import * as chai from "chai";
const expect = chai.expect;

// Set up local credentials to avoid depending on OS configuration
AWS.config.update({
  region: "local",
  accessKeyId: "AKID",
  secretAccessKey: "SECRET",
});

const documentClient = getDynamoDBDocumentClient();

const testOrgId = "123";
const testUserId = "123";

export const headers = {
  orgid: testOrgId,
  userId: testUserId,
  Accept: "application/json",
  "Content-Type": "application/json",
};


export const insertEvent = async () => {
    const params = {
        TableName: 'TABLE_NAME', //👈 Cannot use process.env.TABLE_NAME because the npm test doesn't set node process variables
        Item: {
            // Put your attributes here to insert an object for your GET test cases use the orgid 123
        },
    };
    return documentClient.put(params).promise();
};

export const testResponseStructure = (res: Response, code: number): void => {
    if(code == 200) {
      testOkResponse(res);
    } else {
      testErrorResponse(res, code);
    }
}

const testOkResponse = (res: Response, code = 200) => {
    expect(res).to.have.status(code);
    expect(res.body).to.have.property('code')
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
    expect(res.body.code).to.equal(code);
};
  
const testErrorResponse = (res: Response, code = 422) => {
    expect(res).to.have.status(code);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.have.property('code');
    expect(res.body.error).to.have.property('message');
    expect(res.body.error).to.have.property('errors');
    expect(res.body.error.code).to.equal(code);
    expect(res.body.error.errors).to.be.an('array');
    res.body.error.errors.forEach((item) => {
        expect(item).to.have.property('domain');
        expect(item).to.have.property('reason');
        expect(item).to.have.property('message');
        if(code == 422) {
            expect(item).to.have.property('field');
        }
    });
};
