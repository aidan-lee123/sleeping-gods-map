import { FC, createContext, useContext, useEffect, useMemo, useState } from "react";
import PointCreatorModal from "./PointCreatorModal";
import { useDisclosure } from "@mantine/hooks";


import styled from 'styled-components'
import { useControls } from "react-zoom-pan-pinch";
import PointListModal from "./PointListModal";
import CardModal from "./CardModal";
import { IPointAttributes } from "./MapPoint";

const ScreenContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export interface IQuest {
    id: number;
    keyword: string;
    links: IPointAttributes[];
}

interface IMapContext {
    quests: IQuest[]
    selectedPoint: IPointAttributes
    openPoint: (point : IPointAttributes) => void
    addQuest: (keyword: string, quest_number : number, point? : IPointAttributes ) => void
    addQuestNoPoint: () => void
    getLinks: (quest_id : number) => IPointAttributes[] | undefined
    getQuest: (quest_id : number) => IQuest | undefined
    openQuest: (quest : IQuest) => void
    reset: () => void
}


const defaultState: IMapContext = {
    selectedPoint: {id: 0, x: 0, y: 0},
    quests: [],
    addQuest: (_keyword: string, _quest_number : number ) => {},
    addQuestNoPoint: () => {},
    openPoint: (_point: IPointAttributes) => {},
    getLinks: (_quest_id : number) => { return undefined },
    getQuest: (_quest_id : number) => { return undefined },
    openQuest: (_quest : IQuest) => {},
    reset: () => {}
}

const sampleQuest : IQuest = {
    id: 0,
    keyword: "",
    links: []
}

const MapContext = createContext<IMapContext>(defaultState);

type Props = {
    children?: React.ReactNode
};

export const MapProvider : FC<Props> = ({children}) => {

    const [quests, setQuests] = useState<IQuest[]>(defaultState.quests)
    const [selectedPoint, setSelectedPoint] = useState<IPointAttributes>(defaultState.selectedPoint)
    const [selectedQuest, setSelectedQuest] = useState<IQuest>(sampleQuest) //This is the quest that is selected in the card modal 
    const [linkedQuests, setLinkedQuests] = useState<IQuest[]>([]); //This is the list of quests that are linked to the selected point
    const [pointCreatorOpened, { open:  pointCreatorOpen, close: pointCreatorClose}] = useDisclosure(false);
    const [pointListOpened, { open:  pointListOpen, close: pointListClose}] = useDisclosure(false);
    const [cardModalOpened, { open:  cardModalOpen, close: cardModalClose}] = useDisclosure(false);


    useEffect(() => {
        const savedQuests = localStorage.getItem("quests");
        const tempQuests = savedQuests ? JSON.parse(savedQuests) : [];
        setQuests(tempQuests);

    }, [])

    const addQuestNoPoint = () => {
        pointCreatorOpen();
    }


    const openQuest = (quest : IQuest) => {
        console.log(quest)
        setSelectedQuest(quest);
        cardModalOpen();
    }

    
    const openPoint = (point : IPointAttributes) => {

        let temp = quests.filter((quest) => quest.links.includes(point));
        setLinkedQuests(temp);
        pointListOpen();
        setSelectedPoint(point);
        console.log(point)
    }   

    const addQuest = (keyword: string, quest_number : number, point? : IPointAttributes ) => {


        let temp = quests;
        let match = temp.findIndex((quest) => quest.id === quest_number || quest.keyword === keyword);

        if(point === undefined) {
            temp.push({
                id: quest_number,
                keyword: keyword,
                links: []
            })
            setQuests(temp);
            return;
        }

        if (match !== -1) {
            console.log("Adding new link")
            temp[match].links.push(point);
        }
        else {
            console.log("Adding new quest")
            temp.push({
                id: quest_number,
                keyword: keyword,
                links: [point]
            })
        }
        localStorage.setItem("quests", JSON.stringify(temp));
        setQuests(temp);
    }   

    const questsMemo = useMemo(() => quests, [quests]);

    const getLinks = (quest_id : number) : IPointAttributes[] | undefined => {
        let match = quests.findIndex((quest) => quest.id === quest_id);
        if (match !== -1) {
            return quests[match].links;
        }

        return undefined;
    }
    const getQuest = (quest_id : number) : IQuest | undefined => {
        let match = quests.findIndex((quest) => quest.id === quest_id);
        if (match !== -1) {
            return quests[match];
        }
        return undefined;
    }

    const reset = () => {
        localStorage.setItem("quests", JSON.stringify([]));
        setQuests([]);
    }

    return (
        <MapContext.Provider value={{
            quests: questsMemo,
            openPoint,
            addQuest,
            addQuestNoPoint,
            selectedPoint,
            getLinks,
            getQuest,
            openQuest,
            reset
        }}>
            <ScreenContainer>
                <PointCreatorModal opened={pointCreatorOpened} close={pointCreatorClose}/>
                <PointListModal opened={pointListOpened} close={pointListClose} pointCreatorOpen={pointCreatorOpen} quests={linkedQuests}/>
                <CardModal opened={cardModalOpened} close={cardModalClose} selectedQuest={selectedQuest} />
            </ScreenContainer>
            {children}
        </MapContext.Provider>
    )
}

export function useMap() {
    const context = useContext(MapContext)
    if (context === undefined) {
      throw new Error('useMap must be used within a MapProvider')
    }
    return context
}