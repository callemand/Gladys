const { expect } = require('chai');
const proxyquire = require('proxyquire').noCallThru();
const NodeOSUtils = require('./mocks.test');

const MonitorService = proxyquire('../../../services/monitor/index', {
  'node-os-utils': NodeOSUtils
});


describe('MonitorService lifecycle', () => {
  const monitorService = MonitorService();
  it('should start the service', async () => {
    await monitorService.start();
  });
  it('should stop the service', async () => {
    await monitorService.stop();
  });
  it('should return empty monitoring values because values aren\'t grabbed', () => {
    const monitoring = monitorService.monitor.get({});
    expect(monitoring).to.deep.equal({});
  });
  it('should return monitoring values', async () => {

    await monitorService.grabMonitoringValues();
    const monitoring = monitorService.monitor.get({});
    expect(monitoring).to.deep.equal({
      cpu: {
        count: 3,
        free: '18.00',
        loadavg: {
          1: '1.00',
          5: '5.00',
          15: '15.00'
        },
        usage: '82.00'
      },
      drive: {
        freeGb: '24.7',
        freePercentage: '5.3',
        totalGb: '465.6',
        usedGb: '10.5',
        usedPercentage: '2.3',
      },
      memory: {
        freeMemMb: 2832,
        freeMemPercentage: 17.29,
        totalMemMb: 16384,
        usedMemMb: 13552,
      },
      os: {
        ip: '127.0.0.0',
        platform: 'gladys-platform',
        uptime: 1234567890
      }
    });
  });
});
