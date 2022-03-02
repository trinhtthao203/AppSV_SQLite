
import React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import {Picker} from'@react-native-picker/picker';
import Mybutton from '../components/myButton';
import ActivityScreen from './ActivityScreen';
import * as SQLite from 'expo-sqlite'

var db = SQLite.openDatabase('db_SV.db');

class AddHOC extends React.Component {
    static navigationOpition={
        title:'Học'
    };

    constructor(props){
      super(props);
      this.state={
          isLoading:true,
          dataHOC:[],
          mssv:'',dataSV:[],
          MAMH:'',dataMH:[]
      }
  }
  UNSAFE_componentWillMount(){
    this.fetchSV();
    this.fetchMH();
  }

//Lấy sinh viên theo mssv nếu không tồn tại sẽ báo lỗi
  
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
//Hàm lấy Môn học theo mã môn nếu không tồn tại sẽ báo lỗi
fetchMH(){
  var query = "SELECT * FROM MONHOC";
  var params=[];
  db.transaction((tx)=>{
    tx.executeSql(query,params,(tx,results)=>{
      var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          this.setState({dataMH:temp,isLoading:false})
    },function(tx,err){
      Alert.alert("WARNING",err.message)
    });
  });
}

handleADD(){
    const {mssv,MAMH}=this.state;
    if(mssv==""||MAMH==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      this.insert(mssv,MAMH);
    }
  }
//Lưu học vào csdl
  insert(mssv,MAMH){
    var query = "INSERT INTO HOC (id,mssv,MAMH)VALUES(?,?,?);";
    var params=[,mssv,MAMH];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        Alert.alert("Success","Thêm thành công "+ mssv +" học " +MAMH);        
      },function(tx,err){
        Alert.alert("WARIRNING",err.message)
      });
    });
    this.props.navigation.state.params.refresh();
  }   
    
  render() {
    if(this.state.isLoading){
        return<ActivityScreen/>
      }
    return (
      <View style={styles.container}>
              <Text style={styles.textTitle}>MSSV *:</Text>
              <Picker
                selectedValue={this.state.mssv}
                style={styles.myPicker}
                onValueChange={(itemValue,itemIndex)=>
                this.setState({mssv:itemValue})
              }>
                {
                this.state.dataSV.map((val,index)=>
                <Picker.Item label={val.hten} value={val.mssv} key={index}/>)
                }
              </Picker>              
               <Text style={styles.textTitle}>Môn học *:</Text>
              <Picker selectedValue={this.state.MAMH}
                style={styles.myPicker}
                onValueChange={(itemValue,itemIndex)=>
                this.setState({MAMH:itemValue})
              }>
                {
                this.state.dataMH.map((val,index)=>
                <Picker.Item label={val.TENMH} value={val.MAMH} key={index}/>)
                }
              </Picker>
              <Mybutton title='ADD' onClick={()=>{this.handleADD()}}/>
            </View>
      );
    }
  }
export default AddHOC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textPicker:{
    marginVertical:20,
    fontSize:17,
    color:'#34495e'
  },
  pickerContainer:{
    backgroundColor:'#fff',
    width:'100%',
    height:'20%',
    position:'absolute',
    top:10
  },
  myPicker:{
    height:50,
    width:'100%',
    marginVertical:10
  },
  textTitle:{
    fontSize:20,
    paddingLeft:10,
    paddingVertical:15,
    height:60,
    color:'#000',
    backgroundColor:'#f1f2f6'
  },
  containerInput:{
    height:110
  }
});