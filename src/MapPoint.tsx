import styled from 'styled-components'
import { useMap } from './MapProvider';


interface IMapPoint {
  x: number;
  y: number;
  parent_name: string;
}

interface IMapPointProps {
    x: number;
    y: number;
    parent_name: string;
    id: number;
}

const MapPoint = styled.div<IMapPoint>`
    position: absolute;
    top: ${(props) => props.y + parseInt(props.parent_name.split('-')[1]) * 1067}px;
    left: ${(props) => props.x + parseInt(props.parent_name.split('-')[2]) * 2000}px;
    width: 42px;
    height: 42px;
    background-color: #FDBC89;
    border-radius: 50%;

    border: 5px solid #B50003;

    text-align: center;
    vertical-align: middle;
    color: black;
    font-size: 20px;

    font-family: 'DemiTasse';

    transition: 0.3s;

    &:hover {
        scale: 1.5;
        cursor: pointer;
    }
`


export interface IPointAttributes {
    id: number;
    x: number;
    y: number;
    name?: string;
    market?: boolean;
    port?: boolean;
}

function Point(props : IMapPointProps) {
    const {id, parent_name, x, y} = props;
    const { openPoint } = useMap();
    
    const add = () => {
        openPoint({
            id: id,
            x: (parseInt(parent_name.split('-')[1]) * 1067) + x,
            y: (parseInt(props.parent_name.split('-')[2]) * 2000) + y,
        })
    }


    return (

        <MapPoint parent_name={parent_name} x={x} y={y} onClick={add} id={"point-"+id}>
            {id}
        </MapPoint>


    )
}

export default Point
