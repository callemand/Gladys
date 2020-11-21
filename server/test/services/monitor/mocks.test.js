const MockedNodeOSUtils = {
  cpu: {
    count: () => {
      return 3;
    },
    free: () => {
      return Promise.resolve(18.00);
    },
    loadavgTime: (time) => {
      return time;
    },
  },
  drive: {
    info: () => {
      return Promise.resolve({
        freeGb: '24.7',
        freePercentage: '5.3',
        totalGb: '465.6',
        usedGb: '10.5',
        usedPercentage: '2.3',
      });
    },
  },
  mem: {
    info: () => {
      return Promise.resolve({
        freeMemMb: 2832,
        freeMemPercentage: 17.29,
        totalMemMb: 16384,
        usedMemMb: 13552,
      });
    },
  },
  os: {
    ip: () => {
      return '127.0.0.0';
    },
    uptime: () => {
      return 1234567890;
    },
    platform: () => {
      return 'gladys-platform';
    },
  },
};

module.exports = MockedNodeOSUtils;
