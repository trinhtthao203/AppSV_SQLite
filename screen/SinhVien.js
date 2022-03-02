import React from 'react';
import {StyleSheet,View,Text, Alert} from 'react-native';
import {Body, Item, Left, Right,Header} from 'native-base';
import { FlatList,TouchableOpacity} from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import ActivityScreen from './ActivityScreen';
import Mybutton from '../components/myButton';
import MyRefresh from '../components/myRefresh'; 

var db = SQLite.openDatabase('db_SV.db');

class SinhVien extends React.Component {
  static navigationOptions = {
    title: 'Sinh Viên',
  };
  state={loading:true,dataSV:[]};

  componentDidMount(){

    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS m_sv (id INTEGER PRIMARY KEY NOT NULL, mssv TEXT NOT NULL UNIQUE, hten TEXT);`,
      );
    }, (error) => console.log("Transaction error: " + error) , () => console.log("Create table m_sv success"))

    this.fetch();
  }

  fetch(){
    var query = "SELECT * FROM m_sv";
    var params=[];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        if(results.rows._array.length>0){
          this.setState({
            dataSV:results.rows._array
          });
        }
      },function(tx,err){
        Alert.alert("WARNING",err.message)
      });
    });
  }
  refresh=()=>{
    this.fetch();
  }

  handleDEL(mssv){
      this.delete(mssv);
      this.refresh();
  } 
  handleADD(){
    this.props.navigation.navigate('AddSV',{refresh:this.refresh});
  }
  delete(mssv){
    var query = "DELETE FROM m_sv WHERE mssv=?;";
    var params=[mssv];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        Alert.alert("Success","Sinh viên đã xóa !");
      },function(tx,err){
        Alert.alert("WARIRNING",err.message)
      });
    });
  }
  render() { 
  if(this.state.isLoading){
      return<ActivityScreen/>
    }
    const {navigation} = this.props;  
    return(
      <View >
        <View>
          <Header style={{backgroundColor:'#58B19F'}}>
            <Left style={{marginRight:10}}>
              <Text style={styles.TextHeader}>MSSV</Text>
            </Left>
            <Body>
              <Text style={styles.TextHeader}>Họ tên</Text>
            </Body>
            <Right>             
              <Mybutton title="ADD" onClick={()=>this.handleADD()}/>  
              <MyRefresh  onClick={()=>this.refresh()}  />
            </Right>
          </Header>
        </View>
        <View style={{marginBottom:120}}>
            <FlatList
              data={this.state.dataSV}
              renderItem={({item})=>
              <View style={{flexDirection:'row'}}>
                 <TouchableOpacity 
                activeOpacity={0.5}
                onPress={()=>navigation.navigate('FromSV',{idSV:item.id,msSV:item.mssv,htenSV:item.hten,refresh:this.refresh})}
                >
                <Item style={{paddingBottom:5}}>
                  <Text style={styles.TextListItemMSSV}>{item.mssv}</Text>
                  <Text style={styles.TextListItem}>{item.hten}</Text>                  
                </Item>        
                </TouchableOpacity>
                <Mybutton title='DEL' onClick={()=>{this.handleDEL(item.mssv)}} />
              </View>             
            }
            keyExtractor={(item)=>`${item.id}`}
          />          
        </View>       
      </View>       
    );  
    }
}

  export default SinhVien;
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextHeader:{
    fontSize:20,
    color:'#fff'
  },
  TextListItem:{
        color:'#6F1E51',
        width:220,
        paddingTop:20
   },
    TextListItemMSSV:{
        color:'#2C3A47',
        marginHorizontal:10,
        width:70,
        paddingTop:20
    }
});