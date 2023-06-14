import styled from 'styled-components'
import MapPoint, { IPointAttributes } from './MapPoint';

interface IMapPart {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name: string;
  src: string;
}

interface IMapPartProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    name: string;
    src: string;
    data: IPointData;
}

interface IPointData {
    name: string;
    points: IPointAttributes[];
    ports: string[];
}


const MapPart = styled.img<IMapPart>`
    width: ${(props) => props.width ? props.width : '2000'}px;
    height: ${(props) => props.height ? props.height : '1067'}px;
    grid-area: ${(props) => props.name.split('-')[1] + '-' + props.name.split('-')[2]};
`

function MapComponent(props : IMapPartProps) {
    const {src, name, data} = props;


    return (
        <>
        <MapPart src={src} name={name} />
            <>
                {data && data.points.map((point) => {
                    return <MapPoint id={point.id} parent_name={name} x={point.x} y={point.y} key={point.id+"-map-point"} />
                    })
                }
            </>
        </>

    )
}

export default MapComponent
