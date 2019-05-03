import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';
// import Modal from 'react-modal';
import 'mapbox-gl/dist/mapbox-gl.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions as DeveloperModalActions } from '../../store/ducks/developerModal';

class Map extends Component {
  static propTypes = {
    developers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        avatar_url: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
      }),
    ).isRequired,
    showModal: PropTypes.func.isRequired,
  };

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = (e) => {
    const [longitude, latitude] = e.lngLat;

    /* toast.info(`Latitude: ${latitude} \nLongitude: ${longitude}`, {
      position: toast.POSITION.BOTTOM_CENTER,
    }); */

    this.props.showModal({
      latitude,
      longitude,
    });

    /* this.setState({
      modalShow: true,
      devs: [
        ...this.state.devs,
        {
          latitude,
          longitude,
          avatar_url: 'https://avatars1.githubusercontent.com/u/15911535?s=40&v=4',
        },
      ],
    }); */

    /* toast(`Latitude: ${latitude} \nLongitude: ${longitude}`);

    toast.success('Success Notification !', {
      position: toast.POSITION.TOP_CENTER,
    });

    toast.error('Error Notification !', {
      position: toast.POSITION.TOP_LEFT,
    });

    toast.warn('Warning Notification !', {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    toast.info('Info Notification !', {
      position: toast.POSITION.BOTTOM_CENTER,
    }); */
  };

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {this.props.developers.map(dev => (
          <Marker
            key={dev.id}
            latitude={dev.cordinates.latitude}
            longitude={dev.cordinates.longitude}
            onClick={this.handleMapClick}
            captureClick
          >
            <img
              alt=""
              style={{
                borderRadius: 100,
                width: 48,
                height: 48,
              }}
              src={dev.avatar_url}
            />
          </Marker>
        ))}
      </MapGL>
    );
  }
}

const mapStateToProp = ({ developers }) => ({
  developers: developers || [],
});

const mapDispatchToProps = dispatch => bindActionCreators(DeveloperModalActions, dispatch);

export default connect(
  mapStateToProp,
  mapDispatchToProps,
)(Map);
