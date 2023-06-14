import styled from 'styled-components'
import { 
    Modal, 
    Group,
    Button,
    Paper,
    Text,
    useMantineTheme,
    
} from '@mantine/core';
import { IQuest } from './MapProvider';

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
`

  
interface IPointListModalProps {
    opened: boolean
    close: () => void
    quests: IQuest[]
    pointCreatorOpen: () => void
}

function PointCreatorModal(props : IPointListModalProps) {
    const { opened, close, quests, pointCreatorOpen } = props;


    const theme = useMantineTheme();

    return (
    <Modal opened={opened} onClose={close} withCloseButton={false} centered={true}
        style={{

            position: 'absolute',
            top: '0',
            left: '0',

        }}
        title={
            "Add Quest"
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


        <Text size="sm" mt="l">You have added these keywords to this point: </Text>
            <Group >
                {quests.length === 0 ? 
                <ListCard key={"no-quest-list-modal-card"}><Text size="sm" mt="l">No keywords added yet</Text></ListCard>
                :
                quests.map((quest) => (
                    <ListCard key={quest.keyword+"-"+quest.id+"-list-modal-card"}>
                        <Text size="sm" mt="l">{quest.keyword}</Text> <Text size="sm" mt="l">   {quest.id}</Text>
                    </ListCard>
                ))}
            </Group>
            <Group position="apart" mt="xl">

            <Button color="blue" onClick={() => {
                close();
                pointCreatorOpen();
            }}>
              Add a Keyword
            </Button>
          </Group>
    </Paper>

    
    </Modal>

    )
}

export default PointCreatorModal
