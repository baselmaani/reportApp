import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { useSaveFeedReaction } from '../../hooks/useSaveFeedReaction';
import { useStateValue } from '../../providers/StateContext';
const ReactionIcons = ({ feed }) => {
  const addReaction = useSaveFeedReaction();
  const [{ user }] = useStateValue();

  const onAdd = (value) => {
    addReaction.mutate({
      feedId: feed.id,
      value,
    });
  };

  const userReactions = feed?.feedReactions
    ? feed?.feedReactions?.filter((c) => c.userId === user.id)
    : [];
  return (
    <View style={styles.reactionsStyle}>
      <View>
        <IconButton
          icon='heart'
          color={
            userReactions?.find((c) => c.value === 'heart')
              ? '#E91E63'
              : '#3c3c3c50'
          }
          onPress={() => onAdd('heart')}
        />
        <Text style={styles.count}>
          {feed?.feedReactions.filter((c) => c.value === 'heart').length}
        </Text>
      </View>
      <View>
        <IconButton
          icon='thumb-up'
          color={
            userReactions?.find((c) => c.value === 'thumb-up')
              ? '#03A9F4'
              : '#3c3c3c50'
          }
          onPress={() => onAdd('thumb-up')}
        />
        <Text style={styles.count}>
          {feed?.feedReactions.filter((c) => c.value === 'thumb-up').length}
        </Text>
      </View>
      <View>
        <IconButton
          icon='thumb-down'
          color={
            userReactions?.find((c) => c.value === 'thumb-down')
              ? '#FFC107'
              : '#3c3c3c50'
          }
          onPress={() => onAdd('thumb-down')}
        />
        <Text style={styles.count}>
          {feed?.feedReactions.filter((c) => c.value === 'thumb-down').length}
        </Text>
      </View>
    </View>
  );
};

export default ReactionIcons;

const styles = StyleSheet.create({
  reactionsStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  count: {
    textAlign: 'center',
    color: '#3c3c3c50',
  },
});
