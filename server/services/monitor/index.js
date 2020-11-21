const logger = require('../../utils/logger');

module.exports = function MonitorService(gladys) {
  const osu = require('node-os-utils');

  let interval;
  let lastValue = {};

  /**
   * @public
   * @description This function grab monitoring value
   * @example
   * gladys.services.monitor.grabMonitoringValues();
   */
  async function grabMonitoringValues() {
    logger.debug('Grab monitoring value')
    const freeCPU = (await osu.cpu.free()).toFixed(2);

    lastValue = {
      cpu: {
        count: osu.cpu.count(),
        usage: (100 - freeCPU).toFixed(2),
        free: freeCPU,
        loadavg: {
          1: osu.cpu.loadavgTime(1).toFixed(2),
          5: osu.cpu.loadavgTime(5).toFixed(2),
          15: osu.cpu.loadavgTime(15).toFixed(2)
        }
      },
      drive: await osu.drive.info(),
      memory: await osu.mem.info(),
      os: {
        ip: osu.os.ip(),
        uptime: osu.os.uptime(),
        platform: osu.os.platform(),
      },
    };
  }

  /**
   * @public
   * @description This function starts the Monitor service
   * and start interval to grap monitoring values every second
   * @example
   * gladys.services.example.start();
   */
  async function start() {
    logger.log('Starting Monitor service');
    interval = setInterval(grabMonitoringValues, 1000);
  }

  /**
   * @public
   * @description This function stops the Monitor service
   * and clear sync interval
   * @example
   * gladys.services.example.stop();
   */
  async function stop() {
    logger.log('stopping Monitor service');
    clearInterval(interval);
  }

  /**
   * @description Get the monitor.
   * @param {Object} options - Options parameters.
   * @example
   * gladys.services.monitor.monitor.get({
   * });
   */
  function get(options) {
    return lastValue;
  }


  return Object.freeze({
    start,
    stop,
    grabMonitoringValues,
    monitor: {
      get,
    }
  });
};
