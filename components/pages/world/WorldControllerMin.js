import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface WorldControllerMin {
  onPress: () => void;
}

export default ({onPress}: WorldControllerMin) => {
  return (
    <TouchableWithoutFeedback {...{onPress}}>
      <View style={styles.container}>
        <TouchableOpacity
          styles={{...styles.left, ...styles.button}}
          alert={() => alert('alert')}>
          <Icon name="ios-arrow-back" size={20} />
        </TouchableOpacity>
        <Text center>Voyage en france</Text>
        <TouchableOpacity
          style={{...styles.right, ...styles.button}}
          onPress={() => alert('test')}>
          <Icon name="ios-arrow-forward" size={20} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    color: 'white',
  },
});
