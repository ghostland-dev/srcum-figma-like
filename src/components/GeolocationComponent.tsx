import React, { useState, useEffect } from 'react';

const GeolocationComponent = () => {
  const [coordinates, setCoordinates] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        (err) => {
          setError(`Erreur: ${err.message}`);
        }
      );

      // Nettoyage à la fin pour éviter des écoutes inutiles
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      setError("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
  }, []); // Pas de dépendances, pour que l'effet s'exécute une seule fois

  return (
    <div>
      <h2>Ma Position</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeolocationComponent;
