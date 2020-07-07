import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../constants';

class Button extends Component {
  render() {
    const {
      height,
      rounded,
      medium,
      small,
      large,
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      height && {height: height},
      rounded && {borderRadius: rounded},
      medium && styles.medium,
      small && styles.small,
      large && styles.large,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
      style,
    ];

    if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity}
          {...props}>
          <LinearGradient
            start={start}
            end={end}
            colors={[startColor, endColor]}
            style={buttonStyles}>
            {children}
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}>
        {children}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  startColor: theme.colors.royalblue,
  endColor: theme.colors.accent,
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: theme.colors.white,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  medium: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  large: {
    paddingTop: 1,
    paddingRight: 1,
    paddingBottom: 1,
    paddingLeft: 1,
  },
  small: {
    paddingTop: 1,
    paddingRight: 1,
    paddingBottom: 1,
    paddingLeft: 1,
  },
  rounded: {
    borderRadius: 360,
  },
  accent: {backgroundColor: theme.colors.accent},
  primary: {backgroundColor: theme.colors.primary},
  secondary: {backgroundColor: theme.colors.secondary},
  tertiary: {backgroundColor: theme.colors.tertiary},
  black: {backgroundColor: theme.colors.black},
  white: {backgroundColor: theme.colors.white},
  gray: {backgroundColor: theme.colors.gray},
  gray2: {backgroundColor: theme.colors.gray2},
  gray3: {backgroundColor: theme.colors.gray3},
  gray4: {backgroundColor: theme.colors.gray4},
});
