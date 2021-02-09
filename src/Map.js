import React from 'react'
import Axios from 'axios'
import {
  useMapEvents,
    MapConsumer,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'
import { Icon } from 'leaflet'
// import * as parkData from './data/data.json'

function MapExport(){
    // let mapRef = React.useMap()
    // React.useEffect(() => {
    //     console.log(mapRef)
    // }, [mapRef])
    // function MyComponent() {
    //   const map = useMapEvent('click', () => {
    //     map.setCenter([50.5, 30.5])
    //   })
    //   return null
    // }

    // function MyComponent() {
    //   const map = useMapEvents({
    //     click: (e) => {
    //       const { lat, lng } = e.latlng
    //       console.log(e.latlng)
    //       L.marker([lat, lng]).addTo(map)
    //       return (<Marker position={e.latlng}>
          
    //         <Popup>Casablanca</Popup>
    //       </Marker>)
    //     },
    //   })
    //   return null
    // }

    function LocationMarker() {
      const [position, setPosition] = React.useState(null)
      // React.useEffect(() => {
      //   if (Object.keys(position).length !== 0){
      //     Axios.get(
      //       `https://api.opencagedata.com/geocode/v1/json?q=${position.lat}+${position.lng}&key=292b5efd6196403abb6bc01c3a2c0f8a`
      //     ).then(res => {
      //       console.log(res)
      //     })
      //   }
      // }, [position])
      const map = useMapEvents({
        click: (e) => {
          console.log(e)
          // const { lat, lng } = e.latlng
          // console.log(lat)
          // L.marker([lat, lng]).addTo(map)
          setPosition(e.latlng)
        },
        // click() {
        //   map.locate()
        // },
        // locationfound(e) {
        //   setPosition(e.latlng)
        //   map.flyTo(e.latlng, map.getZoom())
        // },
      })
      Axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${position.lat}+${position.lng}&key=292b5efd6196403abb6bc01c3a2c0f8a`
      ).then((res) => {
        res.data.results[0].components.city
          ? console.log(res.data.results[0].components.city)
          : console.log(res.data.results[0].components.village)
      })
      return position === null ? null : (
        <Marker position={position}>
          <Popup>
            {/* {JSON.stringify(position.lat)} */}

          </Popup>
        </Marker>
      )
    }
        

    const MyMarker = props => {
      const initMarker = ref => {
        if (ref) {
          ref.leafletElement.openPopup();
        }
      };

      return <Marker ref={initMarker} {...props} />;
    };


    const location = [33.562, -7.36126]
    const zoom = 12
    return (
      <div>
        <MapContainer center={location} zoom={zoom} Icon={Icon}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* <Marker position={location}>
            <Popup>Casablanca</Popup>
          </Marker> */}
          <LocationMarker />
        </MapContainer>

        {/* <MapConsumer>
            {(map) => {
              console.log('map center:', map.getCenter())
              return null
            }}
          </MapConsumer> */}
        {/* {parkData.features.map((park) => (
                <Marker
                key={park.properties.PARK_ID}
                position={[
                    park.geometry.coordinates[1],
                    park.geometry.coordinates[0],
                ]}
                onClick={() => {
                    console.log('test')
                    setActivePark(park)
                }}
                />
            ))} */}
      </div>
    )
}

export default MapExport