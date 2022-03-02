import React from 'react';
import {Alert, Text} from 'react-native';
import { Container, Content, Form, Item, Input, Label ,Button} from 'native-base';

import * as SQLite from 'expo-sqlite'

var db = SQLite.openDatabase('db_SV.db');

class FromSV extends React.Component {
    static navigationOpition={
        title:'Thêm sinh viên'
    };

  state={loading:true,mssv:'',hten:'',id:''};

  async UNSAFE_componentWillMount(){
    this.setState({loading:false});
  }
 
  componentDidMount(){
    const {navigation} = this.props;
    const id= navigation.getParam('idSV');    
    this.get_data(id);
    }

  get_data(id){
    var query = "SELECT * FROM m_sv WHERE id=?;";
    var params=[id];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        if(results.rows._array.length>0){
          this.setState({
            mssv:results.rows._array[0]['mssv'],
            hten:results.rows._array[0]['hten'],
            id:id
          });
        }else{
          Alert.alert("WARNING","Khong ton tai ID")
        }
      },function(tx,err){
        Alert.alert("WARIRNING",err.message)
      });
    });
  }
  handleSave(){
    const {id,mssv,hten}=this.state;
    if(mssv==""||hten==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền !");
    }else{
      this.update(id,mssv,hten);
    }
    this.props.navigation.state.params.refresh();
  }

  update(id,mssv,hten){
    var query = "UPDATE m_sv SET mssv=?,hten=? WHERE id=?;";
    var params=[mssv,hten,id];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        Alert.alert("Success","Sinh viên đã được thay đổi!");
      },function(tx,err){
        Alert.alert("WARIRNING",err.message)
      });
    });
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
                <Input onChangeText={(val)=>this.setState({mssv:val})} value={this.state.mssv} />
              </Item>
              <Item stackedLabel>
                <Label>Họ tên sinh viên*</Label>
                <Input onChangeText={(val)=>this.setState({hten:val})} value={this.state.hten}/>
              </Item>
               <Button block style={{backgroundColor:'#40739e'}} onPress={()=>this.handleSave()}>
                <Text style={{ fontSize:20,color:'#dff9fb'}}>Lưu</Text>
              </Button>
              <Label style={{color:'red'}}>*Bắt buộc</Label>
            </Form>
        </Container>
      );
    }
  }
  export default FromSV;
 