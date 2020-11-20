const { expect } = require('chai');
const proxyquire = require('proxyquire').noCallThru();

const MonitorService = proxyquire('../../../services/monitor/index', {});


describe('MonitorService lifecycle', () => {
  const monitorService = MonitorService();
  it('should start the service', async () => {
    await monitorService.start();
  });
  it('should stop the service', async () => {
    await monitorService.stop();
  });
  it('should return monitoring', async () => {
    await monitorService.start();
    const monitoring = await monitorService.monitor.get({});
    expect(monitoring).to.deep.equal({});
  });
});
