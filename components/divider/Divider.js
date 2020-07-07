import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import Block from '../block/Block';
import {theme} from '../../constants';

export default class Divider extends Component {
  render() {
    const {color, style, width, height, ...props} = this.props;
    const dividerStyles = [
      style,
      height && {height: height},
      color && {backgroundColor: color},
      width && {width: width},
    ];
    return <Block flex={false} style={dividerStyles} {...props} />;
  }
}

export const styles = StyleSheet.create({
  divider: {
    height: 0,
    margin: theme.sizes.base * 2,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
