export default function postTransformer({ location: { coordinates: [longitude, latitude] }, ...post }) {
  return {
    ...post,
    location: {
      latitude,
      longitude,
    },
  };
}
