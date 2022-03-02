import React from 'react';
import {StyleSheet,View,Text, Alert} from 'react-native';
import {Item} from 'native-base';
import { FlatList,TouchableOpacity } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import ActivityScreen from './ActivityScreen';
import Mybutton from '../components/myButton';
import MyRefresh from '../components/myRefresh'; 
var db = SQLite.openDatabase('db_SV.db');

class MonHoc extends React.Component {
  static navigationOptions = {
    title: 'Môn Học',
  };

  state = { loading: true, dataMH: [] };

  componentDidMount() {
    
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS MONHOC (id INTEGER NOT NULL PRIMARY KEY, MAMH TEXT NOT NULL UNIQUE, TENMH TEXT NOT NULL, SOTC INTEGER NOT NULL);',
      );
    }, 
      (error) => console.log("Error" + error), 
      () => console.log("Create table success")
    );
    this.fetch();
  }
  fetch(search) {
    var query =
      "SELECT * FROM MONHOC";
    var params = [];
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          if (results.rows._array.length > 0) {
            this.setState({
              dataMH: results.rows._array,
            });
          }
        },
        function (tx, err) {
          Alert.alert('WARNING', err.message);
        },
      );
    });
  }

  handleADD() {
    this.props.navigation.navigate('AddMH', { refresh: this.refresh });
  }

  refresh = () => {
    this.fetch();
  };

  handleDEL(MAMH) {
    this.delete(MAMH);
    this.refresh();
  }
  delete(MAMH) {
    var query = 'DELETE FROM MONHOC WHERE MAMH=?;';
    var params = [MAMH];
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          Alert.alert('Success', 'Môn học đã được xóa !');
        },
        function (tx, err) {
          Alert.alert('WARIRNING', err.message);
        },
      );
    });
  }
  render() {
    if(this.state.isLoading){
      return<ActivityScreen/>
    }
    const {navigation} = this.props;  
  return(
      <View >
        <View style={styles.TextHeader}>
              <Text style={styles.maMH}>Mã môn</Text>
              <Text style={styles.tenMH}>Tên môn</Text> 
              <Text style={styles.soTC}>Số TC</Text>  
              <Mybutton title="ADD" onClick={()=>this.handleADD()} />
              <MyRefresh  onClick={()=>this.refresh()}  /> 
        </View>
        <View style={styles.box}>
            <FlatList
              data={this.state.dataMH}
              renderItem={({item})=>
              <View style={{flexDirection:'row'}}>
                 <TouchableOpacity 
                activeOpacity={0.5}
                onPress={()=>navigation.navigate('FromMH',{idMH:item.id,maMH:item.MAMH,tenMH:item.TENMH,sotcMH:item.SOTC,refresh:this.refresh})}
                >
                <Item style={{paddingBottom:5}}>
                  <Text style={styles.TextListItemMSSV}>{item.MAMH}</Text>
                  <Text style={styles.TextListItem}>{item.TENMH}</Text>           
                  <Text style={{width:60,marginTop:20}}>{item.SOTC}</Text>                         
                </Item>        
                </TouchableOpacity>
                <Mybutton title='DEL' onClick={()=>{this.handleDEL(item.MAMH)}} />
              </View>
            }
            keyExtractor={(item)=>`${item.id}`}
          />          
        </View>       
      </View>
    );  
    }
}
export default MonHoc;
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextHeader:{
    flexDirection:'row',
    backgroundColor:'#58B19F',
    fontSize:15,
    color:'#fff',
    paddingLeft:5
  },
  maMH:{
    fontSize:20,
    marginVertical:15,
    color:'#fff', 
  },
  tenMH:{
    fontSize:20,
    marginHorizontal:10,
    marginVertical:15,
    color:'#fff',
  },
  soTC:{
    fontSize:20,
    marginLeft:30,
    marginVertical:15,
    marginRight:12,
    color:'#fff',
  },
  TextListItem:{
        color:'#6F1E51',
        width:170,
        paddingTop:20,
        paddingLeft:15
   },
  TextListItemMSSV:{
        color:'#2C3A47',
        marginHorizontal:10,
        width:50,
        paddingTop:20

    }
});