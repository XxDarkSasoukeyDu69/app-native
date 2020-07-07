import React, {Component} from 'react';
import {Block, Card, Text} from '../../components';
import {ScrollView, TouchableOpacity, Image} from 'react-native';
import {theme} from '../../constants';
import {array} from '../../utils';
import {travel} from '../../services/request';
import moment from 'moment';

export default class ProfileTravelScreen extends Component {
  constructor() {
    super();
    this.state = {
      travels: [],
      visitor: false,
    };
    this.deleteTravel = this.deleteTravel.bind(this);
  }

  componentDidMount() {
    if (this.props.route.params) {
      console.log(this.props.route.params.user.id_world)
      travel.getMyTravel(this.props.route.params.user.id_world).then(resp => {
        this.setState({travels: resp.data.travels});
      });
    } else {
      travel.getMyTravel().then(resp => {
        this.setState({travels: resp.data.travels});
      });
    }
  }

  deleteTravel(idTravel) {
    const {travels} = this.state;
    travel
      .deleteTravel(idTravel)
      .then(resp =>
        this.setState({travels: array.deleteElementOfArray(travels, idTravel)}),
      );
  }

  render() {
    const {travels, visitor} = this.state;
    return (
      <Block>
        <Block flex={false} margin={[theme.sizes.base, theme.sizes.base * 2]}>
          <Text h0 bold>
            Vos voyages - {travels.length}
          </Text>
        </Block>
        <Block margin={[theme.sizes.base, 0]}>
          {travels.length > 0 ? (
            <ScrollView>
              <Block flex={false}>
                {travels.map(trav => (
                  <TouchableOpacity
                    key={trav.id}
                    onPress={() => alert('test 1')}>
                    <Card
                      shadow
                      margin={[0, theme.sizes.base * 2]}
                      style={{padding: 0}}>
                      <Image
                        source={require('../../assets/images/voyage.jpeg')}
                        resizeMode={'cover'}
                        style={{width: '100%', height: 175}}
                      />
                      <Block flex={false} padding={[10, 10, 10, 10]}>
                        <Text h2 bold>
                          {trav.title}
                        </Text>
                        <Block row margin={[theme.sizes.base, 0]}>
                          <Text gray semibold>
                            {moment(trav.date_start).format('YYYY/MM/DD')} -{' '}
                            {moment(trav.date_end).format('YYYY/MM/DD')}
                          </Text>
                        </Block>
                        <Text semibold>{trav.description}</Text>
                        {visitor ? null : (
                          <TouchableOpacity
                            onPress={() => this.deleteTravel(trav.id)}
                            style={{marginTop: 30, marginBottom: 10}}>
                            <Text accent semibold>
                              Supprimer
                            </Text>
                          </TouchableOpacity>
                        )}
                      </Block>
                    </Card>
                  </TouchableOpacity>
                ))}
              </Block>
            </ScrollView>
          ) : (
            <Block middle center>
              <Block flex={false} center style={{width: 250}}>
                <Text center>Pas de voyage pour le moment</Text>
              </Block>
            </Block>
          )}
        </Block>
      </Block>
    );
  }
}
