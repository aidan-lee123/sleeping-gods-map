import styled from 'styled-components'
import Card from './Card'
import { useMap } from './MapProvider'
import { IconAdjustments, IconPlus } from '@tabler/icons-react'
import { ActionIcon, Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

const SidebarContainer = styled.div`
    margin: 0;
    width: 400px;
    height: 100vh;
    flex: 1;
    background-color: #3F9686;
`

function Sidebar() {
    const { quests, addQuestNoPoint } = useMap()

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <SidebarContainer>
            <ActionIcon onClick={open} style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                zIndex: 100,
            }}>
                <IconAdjustments size="1.125rem" />
            </ActionIcon>

            <ActionIcon onClick={addQuestNoPoint} style={{
                position: 'absolute',
                top: '10px',
                left: '40px',
                zIndex: 100,
            }}>
                <IconPlus size="1.125rem" />
            </ActionIcon>
            {quests.map((quest, index) => (
                <Card quest={quest} index={index} key={quest.keyword+"-card"} />
            ))}   

            <MenuModal opened={opened} close={close} />

        </SidebarContainer>
    )
}

interface IMenuModalProps {
    opened: boolean
    close: () => void
}

function MenuModal(props : IMenuModalProps) {
    const { opened, close } = props;
    const { reset } = useMap()

    return (
        <Modal opened={opened} onClose={close} withCloseButton={false}
            style={{

                position: 'absolute',
                top: '0',
                left: '0',

            }}
            title={
                "Settings"
            }
        >
            <Button onClick={() =>{
                reset()
                close()
            }}>
                Reset
                Delete Local Storage
            </Button>
        </Modal>
    )
}

export default Sidebar
