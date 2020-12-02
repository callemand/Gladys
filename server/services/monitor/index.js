const logger = require('../../utils/logger');
const { EVENTS, WEBSOCKET_MESSAGE_TYPES } = require('../../utils/constants');

module.exports = function MonitorService(gladys) {
  const pidusage = require('pidusage');
  const collection = require('measured-core').createCollection();


  let interval;

  /**
   * @public
   * @description This function grab monitoring value
   * @example
   * gladys.services.monitor.grabMonitoringValues();
   */
    async function grabMonitoringValues() {

    const meterValues = collection.toJSON();
    const pidUsageValues = await pidusage(process.pid);

    const stats = {
        cpu: pidUsageValues.cpu,
        memory: pidUsageValues.memory,
      requestsPerSecond: 0,
    };
    if(meterValues.requestsPerSecond !== undefined){
      stats.requestsPerSecond = meterValues.requestsPerSecond.mean;
    }

    gladys.event.emit(EVENTS.WEBSOCKET.SEND_ALL, {
      type: WEBSOCKET_MESSAGE_TYPES.MONITOR.UPDATED,
      payload: stats
    });
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
    interval = setInterval(grabMonitoringValues, 3000);
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
   * @description Get the collection.
   * @return Object.
   * @example
   * gladys.services.monitor.getCollection();
   */
  function getCollection() {
    return collection;
  }


  return Object.freeze({
    start,
    stop,
    grabMonitoringValues,
    getCollection,
  });
};
