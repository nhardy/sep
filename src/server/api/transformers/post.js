export default function postTransformer({ location: { coordinates: [latitude, longitude] }, ...post }) {
  return {
    ...post,
    location: {
      latitude,
      longitude,
    },
  };
}
