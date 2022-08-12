import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import CommentItem from './CommentItem';
import { useFeedComments } from '../../hooks/useFeedComments';
import { Button } from 'react-native-paper';

const Comments = ({ feed }) => {
  const [limit, setLimit] = useState(2);

  const { data, isLoading } = useFeedComments({ feedId: feed.id, limit });
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => <CommentItem comment={item} />}
      />
      {feed._count.comments - limit > 0 && (
        <View>
          <Button onPress={() => setLimit(limit + 2)}>{`ladda mer ${
            feed._count.comments - limit
          }`}</Button>
        </View>
      )}
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({});
