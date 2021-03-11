import chai from './utils/setup';
import { headers, testResponseStructure } from './utils/utils';
const expect = chai.expect;

const server = 'http://localhost:3000';


/**
 *   API test cases
 */
describe('Create something test cases', function () {

    it('should fail the body is empty', async () => {
        const response = await chai.request(server).post('/PATH').set(headers).send();
        testResponseStructure(response, 422);
        expect(response.body.errors[0]).to.deep.includes({ reason: 'UnprocessableEntityException' });
        expect(response.body.errors[0]).to.deep.includes({ message: 'Creation failed, the body is empty.' });
    });
});
