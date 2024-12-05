import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Share,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Text from 'app/components/text';
import Header from 'app/components/header';
import Button from 'app/components/button';
import SafeView from 'app/components/safe-view';
import {stories} from 'app/assets/stories';
import {useAppSelector} from 'app/store/hooks';
import {Share2} from 'lucide-react-native';
import {goBack} from 'app/navigationRef';

const Gifts: React.FC = () => {
  const [activeStory, setActiveStory] = useState('');
  const {activeLevel = 3} = useAppSelector(state => state.core);

  const shareStory = useCallback(() => {
    Share.share({
      message: activeStory,
    });
  }, [activeStory]);

  const renderItem = useCallback(
    (text: string, truncate = false) => {
      const title = text.split(':')[0];

      return (
        <View style={styles.item}>
          <Text mb={16} fontWeight="600">
            {title}
          </Text>
          <Text fontSize={14}>
            {text.slice(title.length + 2, truncate ? 150 : undefined)}...
          </Text>

          <View style={[styles.actions, {marginTop: activeStory ? 28 : 16}]}>
            <Button
              title={activeStory ? 'Close' : 'Read now'}
              color="#fff"
              style={styles.button}
              onPress={() => {
                setActiveStory(activeStory ? '' : text);

                if (activeStory) {
                  goBack();
                }
              }}
            />

            <TouchableOpacity style={styles.share} onPress={shareStory}>
              <Share2 color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [activeStory, shareStory],
  );

  const filteredStories =
    activeLevel === 3 ? [] : stories.slice(0, Math.ceil(activeLevel / 10));

  return (
    <SafeView>
      <Header />

      {activeStory && (
        <View style={styles.view} key="activeStory">
          {renderItem(activeStory)}
        </View>
      )}

      <FlatList
        data={filteredStories}
        style={[
          styles.list,
          activeStory ? styles.activeList : null,
          !activeStory ? styles.none : null,
        ]}
        ListHeaderComponent={
          <Text fontSize={26} fontWeight="800" color="#fff" ta="center">
            Your gifts
          </Text>
        }
        ListEmptyComponent={
          <Text mt={10} ta="center" color="#D9D9D9">
            You have no gifts right now
          </Text>
        }
        ListFooterComponent={
          <View style={styles.center}>
            <Button
              title="Go Home"
              bg="#F0F0F0"
              color="#FF5E23"
              onPress={goBack}
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return renderItem(item, true);
        }}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingVertical: 27,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    borderRadius: 30,
    marginTop: 25,
  },
  activeList: {
    display: 'none',
  },
  view: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  list: {
    marginTop: 20,
  },
  none: {
    display: 'flex',
  },
  button: {
    flex: 1,
    width: 'auto',
  },
  share: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF5E23',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
    justifyContent: 'space-between',
  },
});

export default Gifts;
