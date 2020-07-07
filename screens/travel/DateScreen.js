import React, {Component} from 'react';
import {Block, Button, Text} from '../../components';
import {theme} from '../../constants';
import date from '../../utils/date';
import {
  Modal,
  Alert,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import travelService from '../../services/travelService';

const {height} = Dimensions.get('window');

export default class DateScreen extends Component {
  constructor() {
    super();
    this.state = {
      validButton: false,
      modalVisible: false,
      date: 'chosissez une date ',
      markedDates: new Date(),
    };
    this.onDayPress = this.onDayPress.bind(this);
    this.validForm = this.validForm.bind(this);
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  onDayPress(day) {
    var dateRange = date.getRange(this.state.markedDates, day);
    this.setState({markedDates: dateRange});
    this.setState({
      date: `${Object.keys(dateRange)[0]} - ${
        Object.keys(dateRange)[Object.keys(dateRange).length - 1]
      }`,
    });
  }

  validForm() {
    const {markedDates} = this.state;
    const {navigation} = this.props;
    travelService
      .setDate(markedDates)
      .then(r => navigation.navigate('InformationScreen'));
  }

  render() {
    const {modalVisible, markedDates} = this.state;
    return (
      <Block middle margin={[0, theme.sizes.base * 2]}>
        <Block flex={false} style={{width: 300}}>
          <Block flex={false} margin={[theme.sizes.base * 2, 0, 0]}>
            <Text h3 gray>
              Etape 2
            </Text>
          </Block>
          <Block flex={false}>
            <Text body>Définisser les dates de votre voyage</Text>
          </Block>
        </Block>
        <Block
          flex={false}
          margin={[theme.sizes.base * 2, 0, 0]}
          style={{height: 100}}>
          <Button
            style={styles.textInput}
            onPress={() => this.setModalVisible(true)}>
            <Text>{this.state.date}</Text>
          </Button>
        </Block>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <Block>
            <Block flex={false} style={{height: height - 100}}>
              <CalendarList
                markedDates={markedDates}
                markingType={'period'}
                pastScrollRange={12}
                futureScrollRange={0}
                scrollEnabled={true}
                showScrollIndicator={true}
                maxDate={new Date()}
                onDayPress={this.onDayPress}
              />
            </Block>
            <Block flex={false} style={{height: 200}}>
              <TouchableHighlight
                style={styles.hideModal}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}>
                <Text h2 bold white>
                  Valider !
                </Text>
              </TouchableHighlight>
            </Block>
          </Block>
        </Modal>
        <Block flex={false}>
          <Button
            disabled={this.state.validButton}
            rounded={50}
            gradient
            startColor={'#4164a8'}
            endColor={'#628AD9'}
            medium
            style={{width: 125}}
            onPress={() => {
              this.validForm();
            }}>
            <Text h3 center white semibold>
              Continuer
            </Text>
          </Button>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  hideModal: {
    backgroundColor: theme.colors.royalblue,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    paddingLeft: 20,
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    backgroundColor: theme.colors.gray3,
    color: theme.colors.black,
    fontSize: 16,
    borderRadius: 60,
  },
});
