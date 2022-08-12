import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import { Card, IconButton } from 'react-native-paper';
import CommentForm from './CommentForm';
import ReactionIcons from './ReactionIcons';
import Comments from './CommentsSection';
import { formatDistanceToNow } from 'date-fns';
const FeedItem = ({ feed }) => {
  const feedDate = formatDistanceToNow(new Date(feed.createdAt));
  return (
    <Card style={styles.cardStyle}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{feedDate}</Text>
      </View>
      <View style={styles.orgContainer}>
        <Image
          source={{ uri: feed?.organization?.logo }}
          style={styles.logoStyle}
        />
        <Text style={styles.orgName}>{feed?.organization?.name}</Text>
      </View>
      <Text style={styles.title}>{feed?.title}</Text>
      <Text style={styles.description}>{feed?.content}</Text>
      <View style={styles.imagesContainer}>
        <FlatList
          data={feed?.images}
          keyExtractor={({ item }) => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.imageItem} />
          )}
        />
      </View>

      <ReactionIcons feed={feed} />
      <View style={styles.commentsContainer}>
        <View>
          <Comments feed={feed} />
        </View>
        <View style={styles.commentFormContainer}>
          <CommentForm feedId={feed.id} />
        </View>
      </View>
    </Card>
  );
};

export default FeedItem;

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
});
