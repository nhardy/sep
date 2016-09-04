export default function geolocate() {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        resolve({ latitude, longitude });
      },
      (error) => reject(error),
      { timeout: 5000 }
    );
  });
}
