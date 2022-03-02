import { Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const myRefresh = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.onClick}>
      <Icon name='refresh'/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    color: '#3498db',
    padding: 5,
    marginTop:5
  },
  text: {
    color: '#ffffff',
  },
});

export default myRefresh;