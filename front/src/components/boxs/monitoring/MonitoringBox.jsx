import {Component} from "preact";
import { connect } from 'unistore/preact';
import {DASHBOARD_BOX_DATA_KEY, DASHBOARD_BOX_STATUS_KEY, RequestStatus} from "../../../utils/consts";
import {WEBSOCKET_MESSAGE_TYPES} from "../../../../../server/utils/constants"
import {Text} from "preact-i18n";
import actions from '../../../actions/dashboard/boxes/monitoring';
import get from "get-value";

const BOX_REFRESH_INTERVAL_MS = 30 * 60 * 1000;

const padding = {
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '10px',
    paddingBottom: '10px'
};

const zeroMarginBottom = {
    marginBottom: '0rem'
};

const MonitoringBox = ({ children, ...props }) => (
    <div className="card">
        <div className="card-header">
            <h3 className="card-title">
                <i className="fe fe-home"></i>
                <span className="m-1">
                    Monitoring
                </span>
            </h3>
        </div>

        {props.boxStatus === RequestStatus.Error && (
            <div className="card-alert alert alert-danger mb-0">
                <div className="card-alert alert alert-danger mb-0">
                    <span>There was a network error fetching the system informations
                        Please refresh.</span>
                </div>
            </div>
        )}
        {props.boxStatus === RequestStatus.Getting && (
            <div class="card-body">
                <div class="dimmer active">
                    <div class="loader" />
                    <div class="dimmer-content" style={padding} />
                </div>
            </div>
        )}
        {props.monitoringValues && (
            <div class="card-body o-auto" style={{
                maxHeight: '15rem',
                padding: '1rem'
            }}>
                {props.monitoringValues && (
                    <ul className="list-unstyled list-separated" style={zeroMarginBottom}>
                        <li className="list-separated-item">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <Text id="dashboard.boxes.monitoring.cpu" />
                                </div>
                                <div className="col-4">
                                    <Text id="global.percentValue" fields={{value: props.monitoringValues.cpu}}/>
                                </div>
                            </div>
                        </li>
                        <li className="list-separated-item">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <Text id="dashboard.boxes.monitoring.memory" />
                                </div>
                                <div className="col-4">
                                    <Text id="global.mbValue" fields={{value: props.monitoringValues.memory}}/>
                                </div>
                            </div>
                        </li>
                        <li className="list-separated-item">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <Text id="dashboard.boxes.monitoring.requestPerSec" />
                                </div>
                                <div className="col-4">
                                     {props.monitoringValues.requestsPerSecond}
                                </div>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        )}
    </div>
);


@connect('DashboardBoxDataMonitoring,DashboardBoxStatusMonitoring,session,monitoringValues', actions)
class MonitoringBoxComponent extends Component {

    componentDidMount() {
        this.props.initialize(this.props.box, this.props.x, this.props.y);
    }

    render(props, {}) {
        const boxStatus = get(props, `${DASHBOARD_BOX_STATUS_KEY}Monitoring.${props.x}_${props.y}`);
        console.log(`${DASHBOARD_BOX_STATUS_KEY}Monitoring.${props.x}_${props.y}`);
        console.log(props);

        return (
            <MonitoringBox
                {...props}
                boxStatus={boxStatus}
            />
        );
    }
}

export default MonitoringBoxComponent;
