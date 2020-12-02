import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { Text, Localizer } from 'preact-i18n';
import actions from '../../../actions/dashboard/edit-boxes/editCamera';
import BaseEditBox from '../baseEditBox';

const EditMonitoringBox = ({ children, ...props }) => (
  <BaseEditBox {...props} titleKey="dashboard.boxTitle.camera">

  </BaseEditBox>
);

@connect('cameras', actions)
class EditMonitoringBoxComponent extends Component {
  updateCamera = e => {
    this.props.updateBoxConfig(this.props.x, this.props.y, {
      camera: e.target.value
    });
  };

  updateBoxName = e => {
    this.props.updateBoxConfig(this.props.x, this.props.y, {
      name: e.target.value
    });
  };

  componentDidMount() {
    this.props.getCameras();
  }

  render(props, {}) {
    return <EditMonitoringBox {...props} updateCamera={this.updateCamera} updateBoxName={this.updateBoxName} />;
  }
}

export default EditMonitoringBoxComponent;
