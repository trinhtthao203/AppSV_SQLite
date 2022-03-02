import React from 'react';
import {StyleSheet,View,Text, Alert} from 'react-native';
import { Header,Item, Right} from 'native-base';
import * as SQLite from 'expo-sqlite';
import ActivityScreen from './ActivityScreen';
import { FlatList,TouchableOpacity} from 'react-native-gesture-handler';
import Mybutton from '../components/myButton';
import MyRefresh from '../components/myRefresh'; 
const db = SQLite.openDatabase('db_SV.db');

db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
  console.log('Foreign keys turned on')
);

class Hoc extends React.Component {
    static navigationOpitions={
        title:'Sinh vien Hoc Mon Hoc'
    }; 
  
  state={isLoading:false,dataHOC:[],dataMSSV:[],dataSV:[]};

  componentDidMount(){
    db.transaction(tx=>{
      tx.executeSql("CREATE TABLE IF NOT EXISTS HOC (id INTEGER PRIMARY KEY, mssv TEXT, MAMH TEXT, FOREIGN KEY (mssv) REFERENCES m_sv(mssv) ,FOREIGN KEY (MAMH) REFERENCES MONHOC(MAMH));");
    }, (error) => console.log("This is transaction error: " + error), () => console.log('All transaction success'));
    this.setState({isLoading:false});
    this.fetch();
    this.fetchSV();
  }
  fetch(){
    var query = "SELECT * FROM HOC";
    var params=[];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        if(results.rows._array.length>0){
          this.setState({
            dataHOC:results.rows._array
          });
        }
      },function(tx,err){
        Alert.alert("WARNING",err.message)
      });
    });
  }
  fetchSV(){
  var query = "SELECT * FROM m_sv";
  var params=[];
  db.transaction((tx)=>{
    tx.executeSql(query,params,(tx,results)=>{
      var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          this.setState({dataSV:temp,isLoading:false})
    },function(tx,err){
      Alert.alert("WARNING",err.message)
    });
  });
}
  refresh=()=>{
    this.fetch();
  }

  handleDEL(id){
      this.delete(id);
      this.fetch();
  }  
  delete(id){
      var query = "DELETE FROM HOC WHERE id=?;";
      var params=[id];
      db.transaction((tx)=>{
        tx.executeSql(query,params,(tx,results)=>{
          Alert.alert("Success","Đã được xóa!");
        },function(tx,err){
          Alert.alert("WARIRNING",err.message)
        });
      });
      this.refresh();
    }
  handleADD(){
    this.props.navigation.navigate('AddHOC',{refresh:this.refresh});
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
            <View style={styles.Myheader}>
              <Text style={styles.TextHeader}>MSSV</Text>
            </View>
            <View style={styles.Myheader}>
              <Text style={styles.TextHeader}>Mã môn</Text>
            </View>
            <Right>
              <Mybutton title="ADD" onClick={()=>this.handleADD()}/> 
              <MyRefresh onClick={()=>this.refresh()}/>             
            </Right>
          </Header>
        </View>
        <View style={styles.box}>
            <FlatList
              data={this.state.dataHOC}
              renderItem={({item})=>
              <View style={{flexDirection:'row'}}>
                 <TouchableOpacity 
                activeOpacity={0.5}
                onPress={()=>navigation.navigate('FromHOC',
                  { idHOC:item.id,
                    msSV:item.mssv,
                    maMH:item.MAMH,
                    refresh:this.refresh}
                )}
                >
                <Item style={{paddingBottom:5}}>
                  <Text style={styles.TextListItemMSSV}>{item.mssv}</Text>
                  <Text style={styles.TextListItem}>{item.MAMH}</Text>     
                </Item>        
                </TouchableOpacity>
                <Mybutton title='DEL' onClick={()=>{this.handleDEL(item.id)}} />
              </View>             
            }
            keyExtractor={(item)=>`${item.id}`}
          />          
        </View>       
      </View>       
    );  
    }
}

export default Hoc;
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
  box:{
    marginBottom:120
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
  },
  Myheader:{
    marginLeft:0,
    marginRight:25,
    marginTop:10
  }
});