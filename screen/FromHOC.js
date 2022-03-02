import React from 'react';
import {Alert,Text,StyleSheet} from 'react-native';
import { Container,Form, Item, Input, Label ,Button} from 'native-base';
import * as SQLite from 'expo-sqlite'
import ActivityScreen from './ActivityScreen';
import {Picker} from'@react-native-picker/picker';
var db = SQLite.openDatabase('db_SV.db');

class FromHOC extends React.Component {
    static navigationOpition={
        title:'Thêm Quan He Hoc'
    };

    constructor(props){
      super(props);
      this.state={
          isLoading:true,
          dataHOC:[],dataMH:[]
      }
  }
  UNSAFE_componentWillMount(){
   this.fetchMH();
  }
 
  componentDidMount(){
    const {navigation} = this.props;
    const id= navigation.getParam('idHOC'); 
    const mssv= navigation.getParam('msSV');  
    const MAMH= navigation.getParam('maMH');   
    this.get_data(id,mssv,MAMH);
  }  
  get_data(id,mssv,MAMH){
    this.setState({
      id:id,
      mssv:mssv,
      MAMH:MAMH
    })
  }
  /*=====Them MON HOC==== */
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

  handleSave(){
    const {id,mssv,MAMH}=this.state;
    if(MAMH==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      this.update(id,mssv,MAMH);
    }
    this.props.navigation.state.params.refresh();
  }

  update(id,mssv,MAMH){
    var query = "UPDATE HOC SET mssv=?,MAMH=? WHERE id=?;";
    var params=[mssv,MAMH,id];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        Alert.alert("Success","Đã được thay đổi");
      },function(tx,err){
        Alert.alert("WARIRNING",err.message)
      });
    });
    this.props.navigation.state.params.refresh();
  }
    
  render() {
    if(this.state.loading){
      return<ActivityScreen/>
    }
    return (
      <Container>
          <Form>
            <Item stackedLabel>
                <Label>MSSV*</Label>
                <Input editable={false} onChangeText={(val)=>this.setState({mssv:val})} value={this.state.mssv} />
              </Item>
            <Picker selectedValue={this.state.MAMH}
                style={styles.myPicker}
                onValueChange={(itemValue,itemIndex)=>
                this.setState({MAMH:itemValue})
              }>
                {
                this.state.dataMH.map((val,index)=>
                <Picker.Item label={val.MAMH} value={val.MAMH} key={index}/>)
                }
              </Picker>
            <Button block style={{backgroundColor:'#40739e'}} onPress={()=>this.handleSave()}>
              <Text style={{ fontSize:20,color:'#dff9fb'}}>Thêm</Text>
            </Button>
            <Label style={{color:'red'}}>*Bắt buộc</Label>
            <Label style={{color:'red'}}>Lưu ý: Chỉ được sửa mã môn học</Label>
          </Form>
      </Container>
    );
  }
}
export default FromHOC;
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
  }
});