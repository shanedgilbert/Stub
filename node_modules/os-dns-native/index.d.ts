import type * as dns from 'dns';
declare let osDns: typeof dns & { withNodeFallback: typeof dns };
export = osDns;
