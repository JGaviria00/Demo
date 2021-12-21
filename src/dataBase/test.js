const logger = require('@condor-labs/logger');

try {
    const logger = require('@condor-labs/logger');
    console.log('-------------------');
    logger.debug({ y: 1, z: 2 });
    console.log('-------------------');
    logger.info({ a: 1, b: 2 });
    console.log('-------------------');
    logger.warn('My text...');
    console.log('-------------------');
    logger.err(Error("my error"));
    console.log('-------------------');
    console.log('-- Support multiple arguments --');
    console.log('-------------------');
    logger.log('THIS IS SIMPLE TEXT', {name: "my name", country:"Colombia"}, Error("This is an error"));
    console.log('-------------------');
} catch (error) {
    console.error(error)
}