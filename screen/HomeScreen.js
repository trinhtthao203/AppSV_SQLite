import { Button } from 'native-base';
import React from 'react';
import { StyleSheet, View ,Text, Image, Alert} from 'react-native';

const BLUE ='#102d66';
const ORANGE ='#ffa600';
const WHITE ='#FFFFFF';
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {  
    const {navigation} = this.props;
    return(
      <View style={styles.container}>
        <View style={{marginBottom:30}} >
          <Image source={require('../assets/logo.png')} style={{width:100, height:100}} />
        </View>
        <Button style={styles.myButton} onPress={()=>navigation.navigate('SinhVien')}><Text style={styles.textButton}>Sinh Viên</Text></Button>
        <Button style={styles.myButton} onPress={()=>navigation.navigate('MonHoc')}><Text style={styles.textButton}>Môn học</Text></Button>
        <Button style={styles.myButton} onPress={()=>navigation.navigate('Hoc')}><Text style={styles.textButton}>Sinh Viên học môn học</Text></Button>
     </View>     
    );       
    }
  }
  export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myButton:{
    backgroundColor:ORANGE,
    width:'70%',
    height:70,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:15,
    shadowColor:WHITE,
    shadowOffset:{
      width:0,
      height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
    marginBottom:10,
    marginLeft:55
  },
  textButton:{
    fontSize:20,
    fontWeight:'bold',
    color:WHITE,
  }

});