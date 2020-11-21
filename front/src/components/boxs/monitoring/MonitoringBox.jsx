import {Component} from "preact";
import WeatherBoxComponent from "../weather/WeatherBox";
import {connect} from "unistore/preact";
import actions from "../../../actions/dashboard/boxes/weather";

const MonitoringBox = ({ children, ...props }) => (
    <div className="card">
    </div>
);


//@connect('DashboardBoxDataWeather,DashboardBoxStatusWeather', actions)
class MonitoringBoxComponent extends Component {
    componentDidMount() {
        // get the weather
        //this.props.getWeather(this.props.box, this.props.x, this.props.y);
        // refresh weather every interval
        //setInterval(() => this.props.getWeather(this.props.box, this.props.x, this.props.y), BOX_REFRESH_INTERVAL_MS);
    }
    render(props, {}) {
        return (
            <MonitoringBox
                {...props}
            />
        );
    }
}

export default MonitoringBoxComponent;
