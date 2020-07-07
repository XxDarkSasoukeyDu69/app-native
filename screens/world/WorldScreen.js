import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {clamp, onGestureEvent, timing, withSpring} from 'react-native-redash';
import {World} from '../../components';
import {theme} from '../../constants';
import WorldControllerMin from '../../components/pages/world/WorldControllerMin';
import WorldControllerMax from '../../components/pages/world/WorldControllerMax';

const {height} = Dimensions.get('window');
const TABBAR_HEIGHT = 110;
const MINIMIZED_PLAYER_HEIGHT = 62;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;
const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};
const {
  Clock,
  Value,
  cond,
  useCode,
  set,
  block,
  not,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;

export default () => {

  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const offset = new Value(SNAP_BOTTOM);
  const goUp: Animated.Value<0 | 1> = new Value(0);
  const goDown: Animated.Value<0 | 1> = new Value(0);
  const gestureHandler = onGestureEvent({
    state,
    translationY,
    velocityY,
  });
  const translateY = withSpring({
    value: clamp(translationY, SNAP_TOP, SNAP_BOTTOM),
    velocity: velocityY,
    offset,
    state,
    snapPoints: [SNAP_TOP, SNAP_BOTTOM],
    config,
  });
  const translateBottomTab = interpolate(translateY, {
    inputRange: [SNAP_TOP, SNAP_BOTTOM],
    outputRange: [TABBAR_HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolate(translateY, {
    inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity2 = interpolate(translateY, {
    inputRange: [
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 2,
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT,
    ],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const clock = new Clock();
  useCode(
    block([
      cond(goUp, [
        set(
          offset,
          timing({
            clock,
            from: offset,
            to: SNAP_TOP,
          }),
        ),
        cond(not(clockRunning(clock)), [set(goUp, 0)]),
      ]),
      cond(goDown, [
        set(
          offset,
          timing({
            clock,
            from: offset,
            to: SNAP_BOTTOM,
          }),
        ),
        cond(not(clockRunning(clock)), [set(goDown, 0)]),
      ]),
    ]),
    [],
  );



  return (
    <>
      <World />
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[styles.playerSheet, {transform: [{translateY}]}]}>
          <WorldControllerMax onPress={() => goDown.setValue(1)} />
          <Animated.View
            pointerEvents="none"
            style={{
              opacity: opacity2,
              backgroundColor: '#272829',
              ...StyleSheet.absoluteFillObject,
            }}
          />
          <Animated.View
            style={{
              opacity,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: MINIMIZED_PLAYER_HEIGHT,
            }}>
            <WorldControllerMin style={styles.containerMinPlayer} onPress={() => goUp.setValue(1)} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  playerSheet: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.white,
  },
  container: {
    backgroundColor: '#272829',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TABBAR_HEIGHT,
    flexDirection: 'row',
    borderTopColor: 'black',
    borderWidth: 1,
  },
  containerMinPlayer: {
    height: TABBAR_HEIGHT,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});
