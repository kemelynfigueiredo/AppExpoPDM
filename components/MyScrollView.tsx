import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  View,
} from 'react-native';

import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ImageSourcePropType;
}>;

export default function MyScrollView({
  children,
  headerImage,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [1.5, 1, 1] // 
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}>

        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Image
            source={headerImage}
            style={styles.headerImage}
            resizeMode="cover" 
          />

          <View style={styles.overlay} />
        </Animated.View>

      
        <ThemedView style={styles.content}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },

  headerImage: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },

  content: {
    padding: 16,
    gap: 16,
  },
});