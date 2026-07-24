const { promisify } = require('util');
const childProcess = require('child_process');

const logger = require('../../utils/logger');

const execAsync = promisify(childProcess.exec);

// Ask systemd-logind (over the system DBus) to power off the host machine.
// Same requirements as rebootHost: systemd host + system DBus socket reachable.
// `boolean:false` = non-interactive (no polkit prompt).
const POWER_OFF_COMMAND =
  'dbus-send --system --print-reply --dest=org.freedesktop.login1 ' +
  '/org/freedesktop/login1 org.freedesktop.login1.Manager.PowerOff boolean:false';

/**
 * @description Power off the host machine through systemd-logind (DBus).
 * @returns {Promise} Resolve when the power off command was sent.
 * @example
 * await system.shutdownHost();
 */
async function shutdownHost() {
  logger.info('System: powering off host through systemd-logind');
  await execAsync(POWER_OFF_COMMAND);
}

module.exports = {
  shutdownHost,
};
