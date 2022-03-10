import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";
import { Table } from "reactstrap";

const geoUrl = "/provinces-simplified-topo.json";
//const geoUrl = "/indonesia-topojson-city-regency.json";
//const geoUrl = "/indonesia-province-simple.json";
//const geoUrl = "/map-indonesia-provinsi.json";
//const geoUrl = "/indonesia-prov.json";

const colorScale = scaleLinear()
  .domain([0, 2021])
  .range(["#ffedea", "#ff5233"]);

const MapIndo = () => {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({ coordinates: [117.83252071571, -3.4143807925324428], zoom: 11 });
  const [tableHeader, setTableHeader] = useState([

  ])

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  const handleMoveEnd = (position) => {
    setPosition(position);
  }

  const generateData = () => {
    return (
      <Geographies geography={geoUrl}>
        {({ geographies }) =>{
          // Write a json syncronously
          // writeFileP.sync(`/Users/akhmadridho/Project/BPTIK/SmartDigitalCampus/magang/example_simple_maps_v1/public/output.json`, {
          //   ...geographies
          // });
          return geographies.map((geo) => {
            const d = data.find((s) => String(s.nm_propinsi).toLowerCase() === String(geo.properties.Propinsi).toLowerCase());
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={d ? colorScale(d["extgl_Lulus[0]"]) : "#F5F4F6"}
                // fill={colorScale(Math.random())}
              />
            );
          })}
        }
      </Geographies>
    )
  }

  const hederTable = () => {
    return (
      <tr>
        <th>
          No
        </th>
        <th>
          Nama
        </th>
        <th>
          Nama prodi
        </th>
        <th>
          Nama Provinsi
        </th>
        <th>
          Tahun Lulus
        </th>
      </tr>
    );
  }

  const dataTable = () => {
    let id = 0;
    let item = data.map((item, index) => {
      id += 1;
      const {nama, nm_prodi, nm_propinsi, tgl_lulus} = item;
      var extgl_Lulus = tgl_lulus.split("-");
      console.log(item);
      // return "MM";
      return (
        <tr>
          <td scope="row">
            { id }
          </td>
          <td>
            { nama }
          </td>
          <td>
            { nm_prodi }
          </td>
          <td>
            { nm_propinsi }
          </td>
          <td>
            { extgl_Lulus[0] }
          </td>
        </tr>
      );
    })
    return item;
  }

  useEffect(() => {
    csv(`Tracer Wirausaha_edit.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div>   
      <ComposableMap
        projectionConfig={{
          rotate: [-100, 0, 0],
        }}
        projection="geoMercator"
        width={window.innerWidth}
        height="600"
      >
        {/* <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          { generateData() }
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
      <div>
      <Table bordered>
        <thead>
          { hederTable() }
        </thead>
        <tbody>
          { dataTable() }
        </tbody>
      </Table>
      </div>
    </div> 
  );
};

export default MapIndo;
