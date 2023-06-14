import styled from 'styled-components'
import { 
    Modal, 
    TextInput, 
    Group,
    Button,
    Paper,
    Text,
    LoadingOverlay,
    useMantineTheme,
    
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMap } from './MapProvider';
import { useState } from 'react';



  
interface IPointCreatorModalProps {
    opened: boolean
    close: () => void
}

function PointCreatorModal(props : IPointCreatorModalProps) {
    const { opened, close } = props;
    const { addQuest, selectedPoint} = useMap();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            keyword: '',
            number: 0,
        },
    });

    const handleSubmit = () => {
        setLoading(true)
        setError("");
        addQuest(
            form.values.keyword, 
            parseInt(form.values.number.toString()), //Have to do this for some reason as its getting passed as a string from the form values?
            selectedPoint
        );
        form.reset();
        setLoading(false);
        close();
      };
    
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
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        <Text size="sm" mt="l">Please type the Keyword and Quest Number linked to this map point. </Text>
          <Group grow>
            
            <TextInput
              data-autofocus
              required
              placeholder="Keyword"
              label="Keyword"
              {...form.getInputProps('keyword')}
            />

            <TextInput
              required
              type='number'
              placeholder="Number"
              label="Number"
              {...form.getInputProps('number')}
            />
          </Group>
        {error && (
          <Text color="red" size="sm" mt="sm">
            {error}
          </Text>
        )}

        
          <Group position="apart" mt="xl">

            <Button color="blue" type="submit">
              Add
            </Button>
          </Group>
        
      </form>
    </Paper>

    
            </Modal>

    )
}

export default PointCreatorModal
