import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './App.css'

import Map01 from './assets/SMap-0-1.jpg';
import Map01Data from './data/Map-0-1.json';

import Map10 from './assets/SMap-1-0.jpg';
import Map11 from './assets/SMap-1-1.jpg';
import Map12 from './assets/SMap-1-2.jpg';
import Map10Data from './data/Map-1-0.json';
import Map11Data from './data/Map-1-1.json';
import Map12Data from './data/Map-1-2.json';

import Map20 from './assets/SMap-2-0.jpg';
import Map21 from './assets/SMap-2-1.jpg';
import Map22 from './assets/SMap-2-2.jpg';
import Map20Data from './data/Map-2-0.json';
import Map21Data from './data/Map-2-1.json';
import Map22Data from './data/Map-2-2.json';

import Map30 from './assets/SMap-3-0.jpg';
import Map31 from './assets/SMap-3-1.jpg';
import Map32 from './assets/SMap-3-2.jpg';
import Map30Data from './data/Map-3-0.json';
import Map31Data from './data/Map-3-1.json';
import Map32Data from './data/Map-3-2.json';

import Map40 from './assets/SMap-4-0.jpg';
import Map41 from './assets/SMap-4-1.jpg';
import Map42 from './assets/SMap-4-2.jpg';
import Map40Data from './data/Map-4-0.json';  
import Map41Data from './data/Map-4-1.json';
import Map42Data from './data/Map-4-2.json';

import MapComponent from './MapComponent';
import styled from 'styled-components';

import "./fonts/DemiTasse_Regular.ttf";
import "./fonts/Centaur.ttf";
import "./fonts/Centaur_Bold.otf";
import Sidebar from "./Sidebar";
import { MapProvider } from "./MapProvider";
import { MantineProvider } from "@mantine/core";


const AppContainer = styled.div`
  display: flex;
`

const MapContainer = styled.div`
    display: grid;
    overflow: hidden;
    width: fit-content;
    height: fit-content;
    grid-template-rows: auto;
    grid-template-columns: 2000px 2000px 2000px;
    grid-template-areas: 
      ". 0-1 ."
      "1-0 1-1 1-2"
      "2-0 2-1 2-2"
      "3-0 3-1 3-2"
      "4-0 4-1 4-2"
      ;
`
function App() {

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <TransformWrapper 
      limitToBounds={false}
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
    >
    <MapProvider>
      <AppContainer>
        <Sidebar />

          <TransformComponent
          >
          <MapContainer>
              <div style={{gridArea: '.'}}/>
              <MapComponent src={Map01} name={"Map-0-1"} data={Map01Data} />
              <div style={{gridArea: '.'}}/>

              <MapComponent src={Map10} name={"Map-1-0"} data={Map10Data} />
              <MapComponent src={Map11} name={"Map-1-1"} data={Map11Data} />
              <MapComponent src={Map12} name={"Map-1-2"} data={Map12Data} />

              <MapComponent src={Map20} name={"Map-2-0"} data={Map20Data} />
              <MapComponent src={Map21} name={"Map-2-1"} data={Map21Data} />
              <MapComponent src={Map22} name={"Map-2-2"} data={Map22Data} />

              <MapComponent src={Map30} name={"Map-3-0"} data={Map30Data} />
              <MapComponent src={Map31} name={"Map-3-1"} data={Map31Data} />
              <MapComponent src={Map32} name={"Map-3-2"} data={Map32Data} />

              <MapComponent src={Map40} name={"Map-4-0"} data={Map40Data} />
              <MapComponent src={Map41} name={"Map-4-1"} data={Map41Data} />
              <MapComponent src={Map42} name={"Map-4-2"} data={Map42Data} />

          </MapContainer>
          </TransformComponent>

      </AppContainer>
    </MapProvider>
    </TransformWrapper>
    </MantineProvider>
  )
}

export default App
