import React from 'react';
import {Alert, Text} from 'react-native';
import { Container, Content, Form, Item, Input, Label ,Button} from 'native-base';

import * as SQLite from 'expo-sqlite'

var db = SQLite.openDatabase('db_SV.db');

class AddMH extends React.Component {
    static navigationOpition={
        title:'Thêm Môn Học'
    };

  state={loading:true,MAMH:'',TENMH:'',SOTC:0};

  async UNSAFE_componentWillMount(){
    this.setState({loading:false});
  }

  handleSave(){
    const {MAMH,TENMH,SOTC}=this.state;
    if(MAMH==""||TENMH==""||SOTC==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      this.insert(MAMH,TENMH,SOTC);
    }
    this.props.navigation.state.params.refresh();
  }

  insert(MAMH,TENMH,SOTC){
    var query = "INSERT INTO MONHOC (id,MAMH,TENMH,SOTC)VALUES(?,?,?,?);";
    var params=[,MAMH,TENMH,SOTC];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        Alert.alert("Success","Thêm thành công: "+ TENMH);
        this.setState({MAMH:'',TENMH:'',SOTC:''});
      },function(tx,err){
        Alert.alert("WARNING",err.message)
      });
    });
  }

    
    render() {
       if(this.state.loading){
        return<ActivityScreen/>
      }
      return (
         <Container>
          <Content>
            <Form>
              <Item stackedLabel>
                <Label>Mã môn học*</Label>
                <Input onChangeText={(val)=>this.setState({MAMH:val})} value={this.state.MAMH} />
              </Item>
              <Item stackedLabel>
                <Label>Tên môn học*</Label>
                <Input   onChangeText={(val)=>this.setState({TENMH:val})} value={this.state.TENMH}/>
              </Item>
               <Item stackedLabel>
                <Label>Số tín chỉ*</Label>
                <Input keyboardType="numeric" onChangeText={(val)=>this.setState({SOTC:val})} value={this.state.SOTC.toString()}/>
              </Item>
               <Button block style={{backgroundColor:'#40739e'}} onPress={()=>this.handleSave()}>
                <Text style={{ fontSize:20,color:'#dff9fb'}}>Thêm</Text>
              </Button>
              <Label style={{color:'red'}}>*Bắt buộc</Label>
            </Form>
          </Content>
        </Container>
      );
    }
  }

  export default AddMH;
 