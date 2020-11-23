import { RequestStatus, GetWeatherStatus } from '../../../utils/consts';
import { ERROR_MESSAGES } from '../../../../../server/utils/constants';
import createBoxActions from '../boxActions';
import get from 'get-value';

const BOX_KEY = 'Monitoring';

function createActions(store) {
    const boxActions = createBoxActions(store);

    const actions = {
        async getMonitorValues(state, box, x, y) {
            //boxActions.updateBoxStatus(state, BOX_KEY, x, y, RequestStatus.Getting);
            try {
                const systemInfos = await state.httpClient.get(`/api/v1/system/info`);
                systemInfos.memoryUsage = ((get(systemInfos, 'freemem') / get(systemInfos, 'totalmem')) * 100).toFixed(2);

                boxActions.mergeBoxData(state, BOX_KEY, x, y, {
                    systemInfos
                });
                boxActions.updateBoxStatus(state, BOX_KEY, x, y, RequestStatus.Success);
            } catch (e) {
                boxActions.updateBoxStatus(state, BOX_KEY, x, y, RequestStatus.Error);
            }
        }
    };
    return Object.assign({}, actions);
}

export default createActions;
