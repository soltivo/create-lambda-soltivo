import * as chai from 'chai';
import chaiHttp = require('chai-http');
import chaiSubset = require('chai-subset');
import { createTables } from './createLocalDB';
import { deleteTables } from './deleteLocalDB';

chai.use(chaiHttp);
chai.use(chaiSubset);

beforeEach(async function() {
    await deleteTables();
    //console.log('Tables deleted.');

    await createTables();
    //console.log('Tables created.');
});

export default chai;
