import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Badge, IconButton } from 'react-native-paper';
import Comments from './Comments';

const CommentsSection = ({ feed }) => {
  const [displayComments, setDisplayComments] = useState(false);
  return (
    <View>
      <View style={styles.iconContainer}>
        {feed?._count?.comments > 0 && (
          <View size={20} style={styles.badge}>
            <Text style={styles.badgeText}>{`${feed?._count?.comments}`}</Text>
          </View>
        )}

        <IconButton
          icon='comment'
          color='#3c3c3c50'
          onPress={() => setDisplayComments(!displayComments)}
          size={20}
        />
      </View>
      {displayComments && <Comments feed={feed} />}
    </View>
  );
};

export default CommentsSection;

const styles = StyleSheet.create({
  iconContainer: {},
  badge: {
    bottom: 0,
    right: 20,
    position: 'absolute',
  },
  badgeText: {
    color: '#3c3c3c50',
  },
});
