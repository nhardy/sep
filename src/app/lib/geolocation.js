export default function geolocate() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      resolve({ latitude, longitude });
    });
  });
}
