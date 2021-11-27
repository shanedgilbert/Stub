const expect = require('chai').expect;
const fixtures = require('./fixtures');
const isAtlas = require('../.').isAtlas;
const getDataLake = require('../.').getDataLake;
const isLocalhost = require('../.').isLocalhost;
const isDigitalOcean = require('../.').isDigitalOcean;
const getBuildEnv = require('../.').getBuildEnv;
const isEnterprise = require('../.').isEnterprise;
const getGenuineMongoDB = require('../.').getGenuineMongoDB;

describe('mongodb-build-info', () => {
  context('isDataLake', () => {
    it('reports on DataLake', () => {
      const isDL = getDataLake(fixtures.DATALAKE_BUILD_INFO);
      expect(isDL.isDataLake).to.be.true;
      expect(isDL.dlVersion).to.equal('v20200329');
    });

    it('does not report on 3.2', () => {
      const isDL = getDataLake(fixtures.BUILD_INFO_3_2);
      expect(isDL.isDataLake).to.be.false;
      expect(isDL.dlVersion).to.equal(null);
    });

    it('does not report on older versions', () => {
      const isDL = getDataLake(fixtures.BUILD_INFO_OLD);
      expect(isDL.isDataLake).to.be.false;
      expect(isDL.dlVersion).to.equal(null);
    });
  });

  context('isEnterprise', () => {
    it('detects enterprise module for 2.6 and 3.0', () => {
      expect(isEnterprise(fixtures.BUILD_INFO_OLD)).to.be.true;
    });

    it('detects enterprise module for >= 3.2', () => {
      expect(isEnterprise(fixtures.BUILD_INFO_3_2)).to.be.true;
    });
  });

  context('getBuildEnv', () => {
    it('returns server os and server arch', () => {
      const buildEnv = getBuildEnv(fixtures.BUILD_INFO_3_2);
      expect(buildEnv.serverOs).to.equal('osx');
      expect(buildEnv.serverArch).to.equal('x86_64');
    });
  });

  context('isAtlas', () => {
    it('reports on atlas', () => {
      expect(isAtlas('mongodb+srv://admin:catscatscats@cat-data-sets.cats.mongodb.net/admin')).to.be.true;
    });
  });

  it('isLocalhost', () => {
    it('reports on localhost', () => {
      expect(isLocalhost('localhost:27019')).to.be.true;
    });

    it('reports on localhost of type 127.0.0.1', () => {
      expect(isLocalhost('127.0.0.1:27019')).to.be.true;
    });
  });

  context('isDigitalOcean', () => {
    it('reports on digital ocean', () => {
      expect(isDigitalOcean('mongodb+srv://admin:catscatscats@dave-a1234321.mongo.ondigitalocean.com/test?authSource=admin&replicaSet=dave')).to.be.true;
    });
  });

  context('isGenuineMongoDB', () => {
    it('reports on CosmosDB', () => {
      const isGenuine = getGenuineMongoDB(fixtures.COSMOSDB_BUILD_INFO, fixtures.CMD_LINE_OPTS);
      expect(isGenuine.isGenuine).to.be.false;
      expect(isGenuine.serverName).to.equal('cosmosdb');
    });

    it('reports on DocumentDB', () => {
      const isGenuine = getGenuineMongoDB(fixtures.BUILD_INFO_3_2, fixtures.DOCUMENTDB_CMD_LINE_OPTS);
      expect(isGenuine.isGenuine).to.be.false;
      expect(isGenuine.serverName).to.equal('documentdb');
    });

    it('does not report on 3.2', () => {
      const isGenuine = getGenuineMongoDB(fixtures.BUILD_INFO_3_2, fixtures.CMD_LINE_OPTS);
      expect(isGenuine.isGenuine).to.be.true;
      expect(isGenuine.serverName).to.equal('mongodb');
    });

    it('does not report on older versions', () => {
      const isGenuine = getGenuineMongoDB(fixtures.BUILD_INFO_OLD, fixtures.CMD_LINE_OPTS);
      expect(isGenuine.isGenuine).to.be.true;
      expect(isGenuine.serverName).to.equal('mongodb');
    });
  });
});
