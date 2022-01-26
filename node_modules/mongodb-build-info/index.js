const ATLAS_REGEX = /mongodb\.net[:/]/i;
const LOCALHOST_REGEX = /(localhost|127\.0\.0\.1)/i;
const DIGITAL_OCEAN_REGEX = /\.mongo\.ondigitalocean\.com[:/]/i;

function getDataLake(buildInfo) {
  const res = {
    isDataLake: false,
    dlVersion: null
  };

  if (buildInfo.dataLake) {
    res.isDataLake = true;
    res.dlVersion = buildInfo.dataLake.version;
  }

  return res;
}

function isEnterprise(buildInfo) {
  if (buildInfo.gitVersion && buildInfo.gitVersion.match(/enterprise/)) {
    return true;
  }

  if (buildInfo.modules && buildInfo.modules.indexOf('enterprise') !== -1) {
    return true;
  }

  return false;
}

function isAtlas(uri) {
  return !!uri.match(ATLAS_REGEX);
}

function isLocalhost(uri) {
  return !!uri.match(LOCALHOST_REGEX);
}

function isDigitalOcean(uri) {
  return !!uri.match(DIGITAL_OCEAN_REGEX);
}

function getBuildEnv(buildInfo) {
  const serverOs = buildInfo.buildEnvironment ?
    buildInfo.buildEnvironment.target_os : null;
  const serverArch = buildInfo.buildEnvironment ?
    buildInfo.buildEnvironment.target_arch : null;

  return { serverOs, serverArch };
}

function getGenuineMongoDB(buildInfo, cmdLineOpts) {
  const res = {
    isGenuine: true,
    serverName: 'mongodb'
  };

  if (cmdLineOpts) {
    if (buildInfo.hasOwnProperty('_t')) {
      res.isGenuine = false;
      res.serverName = 'cosmosdb';
    }

    if (
      cmdLineOpts.hasOwnProperty('errmsg') &&
      cmdLineOpts.errmsg.indexOf('not supported') !== -1
    ) {
      res.isGenuine = false;
      res.serverName = 'documentdb';
    }
  }

  return res;
}

module.exports = { getDataLake, isEnterprise, isAtlas, isLocalhost, isDigitalOcean, getGenuineMongoDB, getBuildEnv };
