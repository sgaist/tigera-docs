const releasesCalico = require('./src/releases/releases-calico.json');
const releasesCalicoCloud = require('./src/releases/releases-calico-cloud.json');
const releasesCalicoEnterprise = require('./src/releases/releases-calico-enterprise.json');

const getVersion = (releases) => {
  return releases[0].title === 'master' ? 'master' : releases[0].calico.minor_version;
};

const OPEN_SOURCE_VERSION = getVersion(releasesCalico);
const CLOUD_VERSION = getVersion(releasesCalicoCloud);
const ENTERPRISE_VERSION = getVersion(releasesCalicoEnterprise);

const getPPARepoName = (version) => {
  return version === 'master' ? 'master' : `calico-${version.slice(1)}`;
};

const getChartVersionName = (releases) => {
  const helmRelease = releases[0].helmRelease ? `-${releases[0].helmRelease}` : '';

  return `${releases[0].title}${helmRelease}`;
};

const variables = {
  // This is an example of how to override variables. Bear in mind that 1) the
  // 'docsPathPrefix' is necessary, except for 'global' object. And, 2) the
  // order is important as the first objects listed here will take precedence
  // over the objects listed further down, as long as the paths match.
  //
  // override: {
  // 	docsPathPrefix: ["/docs/calico-cloud/new-folder-example/"],
  // 	nodecontainer: 'cnx-node-override'
  // },
  cloud: {
    prodname: 'Calico Cloud',
    prodnamedash: 'calico-cloud',
    version: CLOUD_VERSION,
    baseUrl: '/docs/calico-cloud', // or e.g. /docs/calico-cloud/archive/v3.23
    docsPathPrefix: ['/docs/calico-cloud/', '/docs/_includes/calico-cloud/'],
    prodnameWindows: 'Calico Enterprise for Windows',
    rootDirWindows: 'C:\\TigeraCalico',
    nodecontainer: 'cnx-node',
    noderunning: 'calico-node',
    ppa_repo_name: getPPARepoName(CLOUD_VERSION),
    chart_version_name: getChartVersionName(releasesCalicoCloud),
    clouddownloadurl: 'https://installer.calicocloud.io/manifests/v3.14.1-1',
    clouddownloadbase: 'https://installer.calicocloud.io',
    releases: releasesCalicoCloud,
    registry: 'quay.io/',
  },
  enterprise: {
    prodname: 'Calico Enterprise',
    prodnamedash: 'calico-enterprise',
    version: ENTERPRISE_VERSION,
    baseUrl: '/docs/calico-enterprise', // or e.g. /docs/calico-enterprise/archive/v3.23'
    docsPathPrefix: ['/docs/calico-enterprise/', '/docs/_includes/calico-enterprise/'],
    prodnameWindows: 'Calico Enterprise for Windows',
    downloadsurl: 'https://downloads.tigera.io',
    nodecontainer: 'cnx-node',
    noderunning: 'calico-node',
    rootDirWindows: 'C:\\TigeraCalico',
    registry: 'gcr.io/unique-caldron-775/cnx/',
    ppa_repo_name: getPPARepoName(ENTERPRISE_VERSION),
    chart_version_name: getChartVersionName(releasesCalicoEnterprise),
    tigeraOperator: {
      image: 'tigera/operator',
      version: 'master',
      registry: 'quay.io',
    },
    releases: releasesCalicoEnterprise,
  },
  openSource: {
    prodname: 'Calico',
    prodnamedash: 'calico',
    version: OPEN_SOURCE_VERSION,
    baseUrl: '/docs/calico', // or e.g. /docs/calico/archive/v3.23
    docsPathPrefix: ['/docs/calico/', '/docs/_includes/calico/'],
    prodnameWindows: 'Calico for Windows',
    nodecontainer: 'calico/node',
    noderunning: 'calico-node',
    rootDirWindows: 'C:\\CalicoWindows',
    ppa_repo_name: getPPARepoName(OPEN_SOURCE_VERSION),
    chart_version_name: getChartVersionName(releasesCalico),
    releases: releasesCalico,
    registry: 'quay.io/',
    vppbranch: 'master',
    imageNames: {
      'calico/node': 'calico/node',
      typha: 'calico/typha',
      'calico/cni': 'calico/cni',
      'calico/apiserver': 'calico/apiserver',
      'calico/kube-controllers': 'calico/kube-controllers',
      'calico-upgrade': 'calico-upgrade',
      'calico/windows': 'calico/windows',
      flannel: 'docker.io/flannelcni/flannel',
      flannelMigration: 'calico/flannel-migration-controller',
      'calico/dikastes': 'calico/dikastes',
      'pilot-webhook': 'calico/pilot-webhook',
      flexvol: 'calico/pod2daemon-flexvol',
      'csi-driver': 'calico/csi',
    },
  },
  global: {
    orchestrators: {
      All: 'All',
      Kubernetes: 'Kubernetes',
      OpenShift: 'OpenShift',
      OpenStack: 'OpenStack',
      HostProtection: 'host protection',
      'host protection': 'host protection',
    },
    url: 'http://localhost:3000',
  },
};

module.exports = variables;
