import React from 'react';
import {Block, Button, Text} from '../index';
import {Modal, Platform, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Modale extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const {children, btnLabel, btnStyle} = this.props;
    const {modalVisible} = this.state;
    return (
      <Block flex={false}>
        <TouchableOpacity
          style={btnStyle}
          onPress={() => this.setModalVisible(true)}>
          <Text>{btnLabel}</Text>
        </TouchableOpacity>
        <Modal mode="slide" transparent={false} visible={modalVisible}>
          <Block
            flex={false}
            row
            middle
            style={{
              height: 75,
              marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
            }}>
            <Button
              onPress={() => this.setModalVisible(!modalVisible)}
              style={{marginLeft: 25}}>
              <Icon name="angle-down" size={25} />
            </Button>
          </Block>
          <Block>{children}</Block>
        </Modal>
      </Block>
    );
  }
}
