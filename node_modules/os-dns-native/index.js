'use strict';
const { lookup, constants } = require('bindings')('os_dns_native');
const { promisify } = require('util');
const ipv6normalize = require('ipv6-normalize');
const nodeDns = require('dns');

function resolve(hostname, rrtype, callback) {
  switch (rrtype) {
    case 'A':
    case 'AAAA':
    case 'CNAME':
    case 'TXT':
    case 'SRV':
      lookup(hostname, constants.INTERNET, constants[rrtype], function(err, results) {
        if (err) return callback(err);
        switch (rrtype) {
          case 'A':
          case 'CNAME':
            return callback(null, results);
          case 'AAAA':
            return callback(null, results.map(addr => ipv6normalize(addr)));
          case 'TXT':
            return callback(null, results.map(val => val.split('\0')));
          case 'SRV':
            return callback(null, results.map(res => {
              const { name, port, priority, weight } = res.match(
                /^(?<name>.+):(?<port>\d+),prio=(?<priority>\d+),weight=(?<weight>\d+)$/).groups;
              return { name, port: +port, priority: +priority, weight: +weight };
            }));
        }
      });
      return;
    default:
      throw new Error(`Unknown rrtype: ${rrtype}`);
  }
}

function resolve4(hostname, cb) { return resolve(hostname, 'A', cb); }
function resolve6(hostname, cb) { return resolve(hostname, 'AAAA', cb); }
function resolveCname(hostname, cb) { return resolve(hostname, 'CNAME', cb); }
function resolveSrv(hostname, cb) { return resolve(hostname, 'SRV', cb); }
function resolveTxt(hostname, cb) { return resolve(hostname, 'TXT', cb); }

const promises = {
  resolve: promisify(resolve),
  resolve4: promisify(resolve4),
  resolve6: promisify(resolve6),
  resolveCname: promisify(resolveCname),
  resolveSrv: promisify(resolveSrv),
  resolveTxt: promisify(resolveTxt),
};

function withFallback(fn, nodeFn) {
  return function(...args) {
    const cb = args.pop();
    fn(...args, (err, result) => {
      if (err) {
        nodeFn(...args, cb);
      } else {
        cb(null, result);
      }
    });
  }
};

const withNodeFallback = {
  resolve: withFallback(resolve, nodeDns.resolve),
  resolve4: withFallback(resolve4, nodeDns.resolve4),
  resolve6: withFallback(resolve6, nodeDns.resolve6),
  resolveCname: withFallback(resolveCname, nodeDns.resolveCname),
  resolveSrv: withFallback(resolveSrv, nodeDns.resolveSrv),
  resolveTxt: withFallback(resolveTxt, nodeDns.resolveTxt),
  promises: {
    resolve: promisify(withFallback(resolve, nodeDns.resolve)),
    resolve4: promisify(withFallback(resolve4, nodeDns.resolve4)),
    resolve6: promisify(withFallback(resolve6, nodeDns.resolve6)),
    resolveCname: promisify(withFallback(resolveCname, nodeDns.resolveCname)),
    resolveSrv: promisify(withFallback(resolveSrv, nodeDns.resolveSrv)),
    resolveTxt: promisify(withFallback(resolveTxt, nodeDns.resolveTxt)),
  }
};

module.exports = {
  resolve,
  resolve4,
  resolve6,
  resolveCname,
  resolveSrv,
  resolveTxt,
  promises,
  withNodeFallback
};
