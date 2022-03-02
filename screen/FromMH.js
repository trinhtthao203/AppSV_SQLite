import React from 'react';
import {Alert, Text} from 'react-native';
import { Container, Content, Form, Item, Input, Label ,Button} from 'native-base';
import ActivityScreen from './ActivityScreen';
import * as SQLite from 'expo-sqlite'

var db = SQLite.openDatabase('db_SV.db');

class SuaMH extends React.Component {
    static navigationOpition={
        title:'Thêm sinh viên'
    };

  state={loading:true,MAMH:'',TENMH:'',SOTC:'',id:''};

  async UNSAFE_componentWillMount(){
   this.setState({loading:false});
  }
 
  componentDidMount(){
    const {navigation} = this.props;
    const id= navigation.getParam('idMH');  
    this.get_data(id);
    }

  get_data(id){
    var query = "SELECT * FROM MONHOC WHERE id=?;";
    var params=[id];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        if(results.rows._array.length>0){
          this.setState({
            MAMH:results.rows._array[0]['MAMH'],
            TENMH:results.rows._array[0]['TENMH'],
            SOTC:results.rows._array[0]['SOTC'],
            id:id
          });
        }else{
          Alert.alert("WARNING","Không tồn tại ID")
        }
      },function(tx,err){
        Alert.alert("WARNING",err.message)
      });
    });
  }
  handleSave(){
    const {id,MAMH,TENMH,SOTC}=this.state;
    if(MAMH==""||TENMH==""|SOTC==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      this.update(id,MAMH,TENMH,SOTC);
    }
    this.props.navigation.state.params.refresh();
  }

  update(id,MAMH,TENMH,SOTC){
    var query = "UPDATE MONHOC SET MAMH=?,TENMH=?,SOTC=? WHERE id=?;";
    var params=[MAMH,TENMH,SOTC,id];
    db.transaction((tx)=>{
      tx.executeSql(query,params,(tx,results)=>{
        Alert.alert("Success","Môn học đã được thay đổi");
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
                <Label>Mã môn học*</Label>
                <Input 
                  onChangeText={(val)=>this.setState({MAMH:val})} 
                  value={this.state.MAMH} 
                />
              </Item>
              <Item stackedLabel>
                <Label>Tên môn học*</Label>
                <Input 
                  onChangeText={(val)=>this.setState({TENMH:val})} 
                  value={this.state.TENMH}
                />
              </Item>
               <Item stackedLabel>
                <Label>Số tín chỉ*</Label>
                <Input 
                  keyboardType="numeric"
                  onChangeText={(val)=>this.setState({SOTC:val})} 
                  value={this.state.SOTC.toString()}
                 />
              </Item>
               <Button block style={{backgroundColor:'#40739e'}} onPress={()=>this.handleSave()}>
                <Text style={{ fontSize:20,color:'#dff9fb'}}>Lưu</Text>
              </Button>
              <Label style={{color:'red'}}>*Bắt buộc</Label>
            </Form>
          </Content>
        </Container>
      );
    }
  }

  export default SuaMH;
 