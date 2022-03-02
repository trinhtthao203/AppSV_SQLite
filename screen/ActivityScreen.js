import { Spinner } from 'native-base';
import React from 'react';

import { View} from 'react-native';
class ActivityScreen extends React.Component {
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignContent:'center',backgroundColor:'#fff'}} >
        <Spinner color='gray'/>
      </View>
    );
  }
}

export default ActivityScreen;
