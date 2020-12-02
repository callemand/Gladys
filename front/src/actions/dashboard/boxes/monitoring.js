import {RequestStatus} from '../../../utils/consts';
import {WEBSOCKET_MESSAGE_TYPES} from '../../../../../server/utils/constants';
import createBoxActions from '../boxActions';

const BOX_KEY = 'Monitoring';

function createActions(store) {
    const boxActions = createBoxActions(store);

    const actions = {
        initialize(state, box, x, y) {
            boxActions.updateBoxStatus(state, BOX_KEY, x, y, RequestStatus.Getting);
            state.session.dispatcher.addListener(
                WEBSOCKET_MESSAGE_TYPES.MONITOR.UPDATED,
                (payload) => {
                    boxActions.updateBoxStatus(state, BOX_KEY, x, y, RequestStatus.Success);
                    this.valuesChanged(payload)
                }
            );
        },

        valuesChanged(state, values){
            console.log(values);
            values.cpu = values.cpu.toFixed(2);
            values.memory = values.memory / 1024 / 1024
            values.memory = values.memory.toFixed(0);
            values.requestsPerSecond = values.requestsPerSecond.toFixed(2);

            store.setState({
                monitoringValues: values
            });
        }

    };
    return Object.assign({}, actions);
}

export default createActions;
