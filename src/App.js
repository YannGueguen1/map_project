import { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import logo from "./logo.svg";
import "./App.css";
import Photo from "./components/Photo";

function App() {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;
  // console.log(process.env.REACT_APP_MAPBOX);
  const [url, setUrl] = useState(
    "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  );

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div className="App">
      <p>This is our map project</p>
      <div ref={mapContainer} className="map-container" />
      <div>
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <input
          type="submit"
          value="Submit"
          onClick={() => {
            fetch("http://localhost:3001/images", {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({ url }), // body data type must match "Content-Type" header
            }).then((response) => console.log(response));
          }}
        />
      </div>
      <Photo url={url} alt="Snowy Chicago"></Photo>
    </div>
  );
}

export default App;
