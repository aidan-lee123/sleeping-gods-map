import styled from 'styled-components'

import CardBack from './assets/Card-Back.jpg';
import { IQuest, useMap } from './MapProvider';

interface IContainerProps {
    questNumber : number
}

const CardContainer = styled.div<IContainerProps>`
    position: absolute;
    z-index: ${(props) => props.questNumber+10};
    margin: 0;
    width: 400px;
    height: 200px;

    bottom: ${(props) => (props.questNumber )* 50}px;

    background-color: #3F9686;

    background-image: url(${CardBack});
    background-repeat: no-repeat;
    background-size: 400px 200px;

    transition: 0.3s transform;

    &:hover {
        cursor: pointer;
        transform: rotate(-5deg) translateX(50px);
    }
`

const Keyword = styled.p`
    position: absolute;
    left: 50px;
    bottom: 5px;
    width: 200px;

    color: #b9aba6;

    font-family: 'Centaur Bold';
    font-size: 23px;
    text-align: left;
    margin: 0;
`

const QuestNumber = styled.p`
    position: absolute;
    right: 20px;
    bottom: 5px;
    width: 50px;

    font-family: 'Centaur Bold';
    font-size: 18px;
    text-align: right;
    margin: 0;

    color: #998e8a;
`

interface ICardsProps {
    quest: IQuest
    index: number
}

function Card(Props : ICardsProps) {
    const {quest, index} = Props;

    const { openQuest } = useMap();

    const links = () => {
        openQuest(quest);
        //console.log(_links)
    }

    return (
        <CardContainer questNumber={index} onClick={links}>
            <Keyword>{quest.keyword}</Keyword>
            <QuestNumber>{quest.id}</QuestNumber>
        </CardContainer>
    )
}

export default Card
