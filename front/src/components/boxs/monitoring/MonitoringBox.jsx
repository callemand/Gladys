import {Component} from "preact";
import { connect } from 'unistore/preact';
import {DASHBOARD_BOX_DATA_KEY, DASHBOARD_BOX_STATUS_KEY, RequestStatus} from "../../../utils/consts";
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
        {props.boxStatus === RequestStatus.Getting && !props.monitoringValues && (
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
                <ul className="list-unstyled list-separated" style={zeroMarginBottom}>
                    {props.monitoringValues.map(monitoringValue => (
                        <li className="list-separated-item">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <span>{monitoringValue.name}</span>
                                </div>
                                <div className="col-4">
                                    <Text id="global.percentValue" fields={{value: monitoringValue.value}}/>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);


@connect('DashboardBoxDataMonitoring,DashboardBoxStatusMonitoring', actions)
class MonitoringBoxComponent extends Component {
    componentDidMount() {
        this.props.getMonitorValues(this.props.box, this.props.x, this.props.y);
        // refresh weather every interval
        setInterval(() => this.props.getMonitorValues(this.props.box, this.props.x, this.props.y), BOX_REFRESH_INTERVAL_MS);
    }
    render(props, {}) {
        const boxData = get(props, `${DASHBOARD_BOX_DATA_KEY}Monitoring.${props.x}_${props.y}`);
        const boxStatus = get(props, `${DASHBOARD_BOX_STATUS_KEY}Monitoring.${props.x}_${props.y}`);


        const systemInfos = get(boxData, 'systemInfos');

        let monitoringValues;

        if(systemInfos !== undefined){
            monitoringValues = [
                {
                    name: 'MemoryUsage',
                    value: systemInfos.memoryUsage
                },
                {
                    name: 'Toto',
                    value: systemInfos.memoryUsage
                }

            ];
        }


        return (
            <MonitoringBox
                {...props}
                boxStatus={boxStatus}
                monitoringValues={monitoringValues}
            />
        );
    }
}

export default MonitoringBoxComponent;
