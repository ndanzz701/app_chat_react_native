import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { AsyncStorage } from 'react-native'
import axios from 'axios'
import BASE_URL from '../base_url/url'


export default class Test extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 3,
          text: 'Hello aaa',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 4,
          text: 'Hello bbb',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 5,
          text: 'Hello ccc',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 6,
          text: 'hai sayang developer',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
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
    // setInterval(() => this.GetData(), 500)
}
    GetData = async () => {
        const response = await axios({
        method: 'get',
        headers: { 'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNTYxNzgzNTg3fQ.4aIFg0nAA4CXObVqfa-VzNTjb2DGw83YrJyLxweFXSc` },
        url: `${BASE_URL.URL}/api/chats`,
        })
        console.log(response)
        // response.data.map(data=>{
        //     this.setState({
        //         messages: [
        //           {
        //             _id: data.id,
        //             text: `${data.message}`,
        //             createdAt: new Date(),
        //             user: {
        //               _id: 2,
        //               name: 'React Native',
        //               avatar: 'https://placeimg.com/140/140/any',
        //             },
        //           },
        //         ],
        //       })
        // })
        console.log(this.state.messages)
    }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}