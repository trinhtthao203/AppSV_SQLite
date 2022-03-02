import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const myButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.onClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#40739e',
    color: '#ffffff',
    padding: 10,
    marginTop:5,
    borderRadius:7,
    shadowColor:'#fff',
    shadowOffset:{
      width:0,
      height:2,
    }
  },
  text: {
    color: '#ffffff',
  },
});

export default myButton;