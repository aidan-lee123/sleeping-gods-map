import styled from 'styled-components'
import { 
    Modal, 
    Group,
    Button,
    Paper,
    Text,
    useMantineTheme,
    
} from '@mantine/core';
import { IQuest, useMap } from './MapProvider';
import { useControls, useTransformContext, useTransformEffect, useTransformInit } from 'react-zoom-pan-pinch';

const ListCard = styled.div`
    width:100%;
    height: 50px;
    background-color: #4b4b4b;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.75);
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin: 10px 0;

    &:hover {
        cursor: pointer;
        background-color: #5b5b5b;
    }
`

  
interface ICardModalProps {
    opened: boolean
    close: () => void
    selectedQuest: IQuest
}

function PointCreatorModal(props : ICardModalProps) {
    const { opened, close, selectedQuest } = props;
    const { zoomToElement, setTransform } = useControls();
    const context = useTransformEffect((state) => {
        console.log(state)
    })
    const theme = useMantineTheme();

    const onClick = (index : number) => {
        setTransform(
            selectedQuest.links[index].x / -0.4 ,
            selectedQuest.links[index].y / -1.35, 
            1.3
        );
        //zoomToElement("point-"+selectedQuest.links[index].id, 2);
        close();
    }

    return (
    <Modal opened={opened} onClose={close} withCloseButton={false} centered={true}
        style={{

            position: 'absolute',
            top: '0',
            left: '0',

        }}
        title={
            "Associated Map Points"
        }
    >
        <Paper
      p={'lg'}
      shadow={'sm'}
      sx={{
        position: 'relative',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      }}
    >


        <Text size="sm" mt="l">This quest is associated with these map points : </Text>
            <Group >
                {selectedQuest.links.length === 0 || selectedQuest.links[0].id === 0 ? 
                <ListCard key={"no-quest-list-modal-card"}><Text size="sm" mt="l">No linked map points</Text></ListCard>
                :
                selectedQuest.links.map((link, index) => (
                    <ListCard key={link+"-list-modal-card"} onClick={() =>onClick(index)}>
                        <Text size="sm" mt="l">{link.id}</Text>
                    </ListCard>
                ))}
            </Group>
            <Group position="apart" mt="xl">

            <Button color="blue" onClick={() => {
                close();
            }}>
              Add a Map Point
            </Button>
          </Group>
    </Paper>

    
    </Modal>

    )
}

export default PointCreatorModal
