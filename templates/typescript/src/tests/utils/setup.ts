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


before(async() => {
    try {
        await createDb()
    } catch (error) {
        console.log('Table creation failed', error);
    }
    return Promise.resolve()
});

after(async() =>{
    try {
        await deleteTables()
    } catch (error) {
        console.log('Table creation failed', error);
    }
    return Promise.resolve()
})

export default chai;
