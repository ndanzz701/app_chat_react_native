import React, { Component } from 'react';
import { View, Text ,AsyncStorage,ActivityIndicator,TouchableOpacity,StyleSheet} from 'react-native';
import {Content,List,ListItem,Body,Container,Form,Item,Input,Card,CardItem,Button, Right,Left} from 'native-base'
import axios from 'axios'
import BASE_URL from '../base_url/url'
import Modal from "react-native-modal"
import Icon from 'react-native-vector-icons/FontAwesome'
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        token:'',
        id_user:'',
        username:'',
        dataMessage:[],
        isLoad:true,
        textMessage:'',
        isModalVisible: false,
        editText:''
    };

  }


componentDidMount(){
    AsyncStorage.multiGet(['token','id','username'], (error, result) => {
        if (result) {
          this.setState({
            token:result[0][1],
            id_user:result[1][1],
            username:result[2][1],
          })
          this.GetData()
        }
    });
    setInterval(() => this.GetData(), 500)
}
GetData = async () => {
    const response = await axios({
      method: 'get',
      headers: { 'Authorization':`Bearer ${this.state.token}` },
      url: `${BASE_URL.URL}/api/chats`,
    })
    this.setState({dataMessage:response.data,isLoad:false})

  }
SendData = async () => {
    const response = await axios({
      method: 'post',
      headers: { 'Authorization':`Bearer ${this.state.token}` },
      url: `${BASE_URL.URL}/api/chats`,
      data:{message:this.state.textMessage,from_id:this.state.id_user}
    })
    this.GetData()
    this.setState({textMessage:""})

  }
UpdateData = async (id) => {
    const response = await axios({
      method: 'patch',
      headers: { 'Authorization':`Bearer ${this.state.token}` },
      url: `${BASE_URL.URL}/api/chats`,
      data:{message:this.state.editText,id:id}
    })
    this.GetData()
    this.setState({editText:"",isModalVisible:false})

  }
DeleteData = async (id) => {
    const response = await axios({
      method: 'delete',
      headers: { 'Authorization':`Bearer ${this.state.token}` },
      url: `${BASE_URL.URL}/api/chats`,
      data:{id:id}
    })
    this.GetData()
    this.setState({isModalVisible:false})

  }
  setModalVisible(id) {
    this.setState({isModalVisible: {[id]:true}});
  }
  render() {
    if(this.state.isLoad){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
    const list=this.state.dataMessage.map(data=>{
      if (data.from_id == this.state.id_user){
        return(
          <View key={data.id} style={{alignSelf: 'flex-end'}}>
                <Modal isVisible={this.state.isModalVisible[data.id]} hasBackdrop={false}>
                  <View style={styles.content}>
                    <Item regular>
                      <Input placeholder='Edit Text' value={this.state.editText} onChangeText={(text)=>{this.setState({editText:text})}}/>
                    </Item>
                      <Button onPress={()=>{this.UpdateData(data.id)}} block iconLeft transparent >
                      <Icon name="edit" style={{fontSize:30,color:'green'}}/>
                        <Text style={{color:'green'}}> Edit</Text>
                      </Button>
                      <View style={{flexDirection: 'row'}}>
                          <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                          <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24 }}>ATAU</Text>
                          <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                      </View>
                      <Button block iconLeft transparent onPress={()=>{this.DeleteData(data.id)}} >
                        <Icon name="trash" style={{fontSize:30,color:'red'}}/>
                        <Text style={{color:'red'}}> DELETE</Text>
                      </Button>
                      <Button block iconLeft transparent onPress={()=>{this.setState({isModalVisible:false})}} >
                      <Icon name="times" style={{fontSize:30,color:'yellow'}}/>
                        <Text style={{color:'yellow'}}> Batal</Text>
                      </Button>
                  </View>
                </Modal>
                  <TouchableOpacity onLongPress={()=>{this.setModalVisible(data.id)}}>
                  <View style={{
                    margin:5,
                    padding:20,
                    borderTopEndRadius:50,
                    borderTopStartRadius:50,
                    borderBottomStartRadius:50,
                    backgroundColor:'#2095f6'
                    }}>
                    <Text note style={{color:'white',fontWeight:'bold'}}>
                      {data.username}
                    </Text>
                    <Text style={{color:'white'}}>
                      {data.message}
                    </Text>
                  </View>
                  </TouchableOpacity>
                  </View>
        )
      }else{
        return(
          <View key={data.id} style={{alignSelf: 'flex-start'}}>
                
                  <View style={{
                    margin:5,
                    padding:20,
                    borderTopEndRadius:50,
                    borderTopStartRadius:50,
                    borderBottomEndRadius:50,
                    backgroundColor:'#efefef'
                    }}>
                    <Text note style={{fontWeight:'bold'}}>
                      {data.username}
                    </Text>
                    <Text>
                      {data.message}
                    </Text>
                  </View>
                  </View>
        )
      }
    })

    return (
        <Container>
        <Content>
              {list}
          <Card transparent>
            <CardItem >
              <Body>
                
              </Body>
            </CardItem>
          </Card>
   
      </Content>
          <Item regular>
            <Input placeholder='insert message' value={this.state.textMessage} onChangeText={(text)=>{this.setState({textMessage:text})}}/>
            <Button block success onPress={()=>{this.SendData()}}>
            <Text style={{color:'white',margin:10}}>Kirim</Text>
          </Button>
          </Item>
      </Container>
    );
  }
}

const styles=StyleSheet.create({
    content: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
  })