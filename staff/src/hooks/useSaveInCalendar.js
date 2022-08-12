import Toast from 'react-native-toast-message';
import React, { useEffect } from 'react';

import * as Calendar from 'expo-calendar';

export const useSaveInCalendar = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Events Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Events Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }

  async function addEventToCalendar({
    startDate,
    endDate,
    title,
    id,
    location,
    notes,
    timeZone = 'UTC+2',
  }) {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Events Calendar' };

    const added = await Calendar.createEventAsync(defaultCalendarSource.id, {
      startDate,
      endDate,
      title,
      id,
      alarms: [],
      allDay: false,
      availability: 'FREE',
      calendarId: defaultCalendarSource.id,
      location,
      notes,
      recurrenceRule: null,
      status: 'CONFIRMED',
      timeZone,
    });

    Toast.show({
      type: 'success',
      text1: 'Save calendar event',
      text2: 'Event added successfully',
    });
  }
  return {
    createCalendar,
    addEventToCalendar,
  };
};
