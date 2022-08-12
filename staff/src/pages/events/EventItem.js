import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Button, Card, IconButton, Portal, Provider } from 'react-native-paper';
import { format, formatDistanceToNow } from 'date-fns';
import openMap from 'react-native-open-maps';
import { useParticipateEvent } from '../../hooks/useParticipateEvent';

const EventItem = ({ event }) => {
  const participateMutation = useParticipateEvent();

  const feedDate = formatDistanceToNow(new Date(event?.createdAt));
  const startsIn = formatDistanceToNow(new Date(event?.startAt));

  const onParticipate = () => {
    participateMutation.mutate({
      eventId: event.id,
    });
  };
  return (
    <Card style={styles.cardStyle}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{feedDate}</Text>
      </View>
      <View style={styles.orgContainer}>
        <Image
          source={{ uri: event?.organization?.logo }}
          style={styles.logoStyle}
        />
        <Text style={styles.orgName}>{event?.organization?.name}</Text>
      </View>
      <Text style={styles.title}>{event?.title}</Text>
      <Text style={styles.description}>{event?.content}</Text>
      <View style={styles.optionalsContainer}>
        {event.address && (
          <View style={styles.optionItem}>
            <IconButton
              icon='map-marker'
              onPress={() => {
                openMap({
                  latitude: parseFloat(event?.latitude),
                  longitude: parseFloat(event?.longitude),
                  end: `${event?.latitude},${event?.longitude}`,
                  navigate_mode: 'navigate',
                  provider: 'google',
                });
              }}
              color='#03A9F4'
            />
            <Text style={styles.optionLabel}>address</Text>
            <Text style={styles.optionValue}>{event?.address}</Text>
          </View>
        )}

        {event.startAt && (
          <View style={styles.optionItem}>
            <IconButton icon='calendar-clock' color='#03A9F4' />
            <Text style={styles.eventStartText}>{`Börjar i ${startsIn}`}</Text>
          </View>
        )}
        {event.isUnlimited === false && (
          <View style={styles.optionItem}>
            <IconButton icon='seat' color='#03A9F4' />
            <Text style={styles.eventStartText}>
              {`${
                event.availableSeats - event?._count.participants
              } platser kvar`}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.imagesContainer}>
        <FlatList
          data={event?.images}
          keyExtractor={({ item }) => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.imageItem} />
          )}
        />
      </View>
      <View>
        <Button
          color={event.participants.length > 0 ? '#FF5722' : '#03A9F4'}
          onPress={onParticipate}
        >
          {event.participants.length > 0 ? 'avbryta deltagande' : 'Delta nu'}
        </Button>
      </View>
    </Card>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  imageItem: {
    width: 300,
    height: 200,
    margin: 10,
  },
  cardStyle: {
    margin: 10,
    padding: 20,
  },
  orgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    color: '#3c3c3c70',
  },
  imagesContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  dateContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  dateText: {
    fontSize: 10,
    color: '#3c3c3c50',
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentFormContainer: {
    flex: 1,
  },

  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    color: '#3c3c3c50',
    marginRight: 2,
  },
  optionValue: {
    color: '#3c3c3c50',
  },
  eventStartText: {
    color: '#3c3c3c50',
    fontSize: 10,
  },
});
