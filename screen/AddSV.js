import React from 'react';
import {Alert, Text} from 'react-native';
import { Container, Content, Form, Item, Input, Label ,Button} from 'native-base';
import * as SQLite from 'expo-sqlite'

var db = SQLite.openDatabase('db_SV.db');

class AddSV extends React.Component {
    static navigationOpition={
        title:'Thêm sinh viên'
    };

  state={loading:true,mssv:'',hten:''};

  async UNSAFE_componentWillMount(){
    this.setState({loading:false});
  }

  handleSave(){
    const {mssv}=this.state;
    const {hten}=this.state;
    if(mssv==""||hten==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      this.insert(mssv,hten);
    }
    this.props.navigation.state.params.refresh();
  }

  insert(mssv,hten){
    var query = "INSERT INTO m_sv (id,mssv,hten)VALUES(?,?,?);";
    var params=[,mssv,hten];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        Alert.alert("Success","Thêm thành công: "+ hten);
        this.setState({mssv:'',hten:''});
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
          <Content>
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
                <Text style={{ fontSize:20,color:'#dff9fb'}}>Thêm</Text>
              </Button>
              <Label style={{color:'red'}}>*Bắt buộc</Label>
            </Form>
          </Content>
        </Container>
      );
    }
  }
  export default AddSV;
 