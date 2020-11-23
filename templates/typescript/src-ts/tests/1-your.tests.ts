import chai from './utils/setup';
import { headers } from './utils/utils';
const expect = chai.expect;

const server = 'http://localhost:3000';


/**
 *   API test cases
 */
describe('Create something test cases', function () {
    this.timeout(10000); // The describe max execution time is 10 sec

    it('should fail the body is empty', async () => {
        const response = await chai.request(server).post('/PATH').set(headers).send();
        expect(response).to.have.status(422);
        expect(response.body.errors[0]).to.deep.includes({ reason: 'UnprocessableEntityException' });
        expect(response.body.errors[0]).to.deep.includes({ message: 'Creation failed, the body is empty.' });
    });
});
