import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useSaveInCalendar } from '../../hooks/useSaveInCalendar';
import { Button, Modal } from 'react-native-paper';

const SaveInCalendarModal = ({ visible, event }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { addEventToCalendar } = useSaveInCalendar();

  const onAdd = async () => {
    setIsLoading(true);
    await addEventToCalendar({
      id: event.name,
      title: event.name,
      startDate: event.startAt,
      endDate: event.endAt,
      location: event.address,
      notes: event.description,
    });
    setIsLoading(false);
  };
  return (
    <Modal
      contentContainerStyle={styles.modalStyle}
      visible={visible}
      onDismiss={() => setDisplayAdd(false)}
    >
      <View style={styles.container}>
        <Text>
          du måste ge åtkomst till din kalender för att lägga till händelse
        </Text>
        <Button
          loading={isLoading}
          disabled={isLoading}
          mode='contained'
          onPress={onAdd}
        >
          Spara
        </Button>
      </View>
    </Modal>
  );
};

export default SaveInCalendarModal;

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
  },
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
});
