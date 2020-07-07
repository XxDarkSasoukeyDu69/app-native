import React from 'react';
import {TouchableOpacity, ScrollView, Image, StyleSheet} from 'react-native';
import {Block, Text, Card} from '../../components';
import {theme, data} from '../../constants';

export default class NewsScreen extends React.Component {
  state = {
    notifications: [],
  };

  componentDidMount() {
    this.setState({notifications: this.props.notifications});
  }

  render() {
    const {notifications} = this.state;
    return (
      <Block style={{backgroundColor: 'white'}}>
        <Block margin={[0, theme.sizes.base * 2]}>
          <Block
            margin={[theme.sizes.base * 2, theme.sizes.base * 1]}
            flex={false}>
            <Text h0 bold>
              Notifications
            </Text>
          </Block>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingVertical: theme.sizes.base * 2}}>
            <Block flex={false} space="between">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <TouchableOpacity key={notification.id}>
                    <Card shadow row margin={[0, 10]}>
                      <Block flex={false}>
                        <Image
                          source={notification.image}
                          style={styles.image}
                        />
                      </Block>
                      <Block flex={false} margin={[0, 0, 0, 20]}>
                        <Text medium height={20}>
                          {notification.firstname} {notification.lastname}
                        </Text>
                        <Text gray caption>
                          {notification.description}
                        </Text>
                      </Block>
                    </Card>
                  </TouchableOpacity>
                ))
              ) : (
                <Block center>
                  <Text h2 color={theme.colors.gray}>
                    Vous n'avez aucune notifiacation
                  </Text>
                </Block>
              )}
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

NewsScreen.defaultProps = {
  notifications: data.notifications,
};

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderRadius: theme.sizes.base * 3,
  },
});
