import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { useDeleteComment } from '../../hooks/useDeleteComment';
import { useStateValue } from '../../providers/StateContext';

const CommentItem = ({ comment }) => {
  const deleteMutation = useDeleteComment();
  const [{ user }] = useStateValue();

  const onDelete = () => {
    deleteMutation.mutate({
      id: comment.id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {comment?.user?.image && comment?.user?.image !== '' ? (
          <Image
            source={{ uri: comment?.user?.image }}
            style={styles.userImage}
          />
        ) : (
          <Image
            source={require('../../../assets/avatar.png')}
            style={styles.userImage}
          />
        )}

        <Text>{comment?.user?.name}</Text>
      </View>
      <View style={styles.commentContent}>
        {user?.id === comment?.user?.id && (
          <View style={styles.changeContainer}>
            <IconButton icon='close' onPress={onDelete} color='#F44336' />
          </View>
        )}
        <View style={styles.contentContainer}>
          <Text>{comment?.content}</Text>
        </View>
        <View style={styles.imagesContainer}>
          <FlatList
            keyExtractor={(item) => item}
            data={comment?.images}
            horizontal={true}
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item }} style={styles.commentImage} />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  commentContent: {
    padding: 10,
    marginTop: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  imagesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentImage: {
    width: 200,
    height: 200,
  },
  changeContainer: {
    flexDirection: 'row-reverse',
    position: 'absolute',
    right: 10,
  },
});
