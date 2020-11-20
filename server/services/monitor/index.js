const logger = require('../../utils/logger');

module.exports = function MonitorService(gladys) {
  const osu = require('node-os-utils')

  /**
   * @public
   * @description This function starts the ExampleService service
   * @example
   * gladys.services.example.start();
   */
  async function start() {
    logger.log('Starting Monitor service');
  }

  /**
   * @public
   * @description This function stops the ExampleService service
   * @example
   * gladys.services.example.stop();
   */
  async function stop() {
    logger.log('stopping Monitor service');
  }

  /**
   * @description Get the monitor.
   * @param {Object} options - Options parameters.
   * @example
   * gladys.services.monitor.monitor.get({
   * });
   */
  async function get(options) {

    const freecpu = await osu.cpu.free();

    const monitoring = {
      cpu: {
        count: osu.cpu.count(),
        usage: 100 - freecpu,
        free: freecpu,
        loadavg: {
          1: osu.cpu.loadavgTime(1),
          5: osu.cpu.loadavgTime(5),
          15: osu.cpu.loadavgTime(15)
        }
      },
      drive: await osu.drive.info(),
      memory: await osu.mem.info(),
      os: {
        ip: osu.os.ip(),
        uptime: osu.os.uptime(),
        platform: osu.os.platform(),
      },
      network: await osu.netstat.inOut()
    };
    return monitoring;
  }

  return Object.freeze({
    start,
    stop,
    monitor: {
      get,
    },
  });
};
