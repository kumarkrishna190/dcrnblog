import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import ArticleList from './ArticleList'

export default class App extends React.Component {
  state={
    email:"",
    password:"",
    username:"",
    warning:"",
    loggedIn: false,
  }



  featureWarning = () => {
    this.setState({warning:'This Feature is yet to be implimented.'});
    setTimeout(function(){
         this.setState({warning:''});
    }.bind(this),2000);
  }

  loginPress = async () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(this.state.email).toLowerCase())){
      try {
        let response = await fetch('https://examples.com/data.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            "user":{
              "username": this.state.username,
              "email": this.state.email,
              "password": this.state.password,
            }
        })
        }).then((response) => {
          console.log('loggedIn response')
          this.setState({loggedIn:true})
          })
      }catch (error) {
        console.log(error)
        this.setState({warning:error})
        setTimeout(function(){
          this.setState({warning:''});
        }.bind(this),2000);
      }
    }else{
      this.setState({warning:'Invalid Email'})
      setTimeout(function(){
        this.setState({warning:''});
      }.bind(this),2000);
    }
  }


  render(){
    if (!this.state.loggedIn){
      return (
        <View style={styles.container}>
          <Text style={styles.logo}>DC</Text>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Username" 
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({username:text})}/>
          </View>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Email" 
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({email:text})}/>
          </View>
          <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Password" 
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({password:text})}/>
          </View>
          <Text style={[styles.forgot],{color:'red'}}>{this.state.warning ? this.state.warning : ''}</Text>
          <TouchableOpacity onPress={()=>{this.featureWarning()}}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.loginPress()}} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.featureWarning()}}>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>

    
        </View>
      );
    }else{
      return(
        <ArticleList />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030303',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#ffffff",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#000000"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});