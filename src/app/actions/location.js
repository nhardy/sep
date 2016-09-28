import geolocate from 'app/lib/geolocation';


export const GET_LOCATION = 'GET_LOCATION';
export const SET_LOCATION = 'SET_LOCATION';

export function setLocation({ latitude = null, longitude = null } = {}, error = null) {
  return {
    type: SET_LOCATION,
    location: {
      latitude,
      longitude,
    },
    error,
  };
}

export function getLocation() {
  return (dispatch) => {
    dispatch({
      type: GET_LOCATION,
    });
    geolocate()
      .then(({ latitude, longitude }) => dispatch(setLocation({ latitude, longitude })))
      .catch(error => dispatch(setLocation(undefined, error)));
  };
}
