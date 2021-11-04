import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Image,  ImageBackground,SnapshotViewIOS, Dimensions, StatusBar, Platform, ScrollView, Button, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
           FindUsername:'',
           FindPassword:'',
           ID:'',
           Username:'',
           Password:'',
        };
        this.PassInfo =this.PassInfo.bind(this);
    }

    PassInfo(){
        this.setState({
            ID:this.state.ID,
            Password:this.state.Password
        });
    }

    InsertRecord=()=>{
        console.log('InsertRecord function called');
        var FindUsername=this.state.FindUsername;
        var FindPassword=this.state.FindPassword;

        if(FindUsername.length==0||FindPassword.length==0){
            alert('Required field is missing');
        }
        else{
            var SearchAPIURL="http://10.0.2.2:80/api/search.php";

            var header={
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
            };

            var Data={
                FindUsername:FindUsername,
                FindPassword:FindPassword
            };

            fetch(
                SearchAPIURL,
                {
                    method:'POST',
                    headers:header,
                    body: JSON.stringify(Data)
                }
            )
            .then((response)=>response.json())
            .then((response)=>{
                console.log('Reach response');
                console.log(response[0].Message);
                if(response[0].Message=='Yes'){
                    console.log('response is yes');
                    //this.setState({ID:response[0].ID});
                    console.log(this.state.FindPassword);
                    console.log(this.state.ID);
                    this.props.navigation.navigate('Main',{
                        ID2:response[0].ID,
                        Password2:this.state.FindPassword
                    });
                }
                else if(response[0].Message=='No'){
                    console.log('response is no');
                    alert('Incorrect password');
                }
                else{
                    console.log('Username not found')
                    alert('Sorry, the username is not found.')
                }
            })
            .catch((error)=>{
                console.log('Reach response');
                alert('Error'+ error);
            })
        }
    }
    
    render() {
        return (
            <View>
                <ImageBackground source={require("../../assets/FoodBackground.jpg")} style={styles.BackgroundImage}>
                    <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
                    </BlurView>
                </ImageBackground>
            
                <View style={{paddingTop: Platform.OS === "android"? StatusBar.currentHeight :0, 
                flexDirection:'column'}}>
                    <View style={{flexDirection:'row', 
                        width:Dimensions.get("screen").width, 
                        justifyContent:'flex-start', 
                        backgroundColor:'white', 
                        position:'absolute',
                        paddingTop: Platform.OS === "android"? StatusBar.currentHeight :0
                        }}>       
                                <Image source={require("../../assets/logo.png")} style={styles.logo}/>         
                    </View>
                    
                    <View style={{
                            flexDirection:'column',
                            paddingTop: Platform.OS === "android"? StatusBar.currentHeight : 0, 
                            minHeight:Dimensions.get("screen").height,
                            justifyContent: 'center',
                            alignItems:'center',
                            backgroundColor:''}}>
                        <View style={{
                            flexDirection:'column',
                            justifyContent:'center',
                            backgroundColor:'white',
                            height:Dimensions.get("screen").height*0.1,
                            width:Dimensions.get("screen").width*0.9,
                            borderWidth:1,
                            borderRadius:15
                        }}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{backgroundColor:'', flex:1, justifyContent:'center'}}>
                                    <Text style={{textAlign:'center', textAlignVertical:'center'}}>
                                        Username:
                                    </Text>
                                </View>
                                <View style={{backgroundColor:'', flex:3, borderWidth:1, marginRight:2, borderRadius:6}}>
                                    <TextInput
                                        placeholder={'Type your username here'}
                                        placeholderTextColor={'black'}
                                        onChangeText={FindUsername=>this.setState({FindUsername})}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{backgroundColor:'', flex:1, justifyContent:'center'}}>
                                    <Text style={{textAlign:'center', textAlignVertical:'bottom'}}>
                                        Password:
                                    </Text>
                                </View>
                                <View style={{backgroundColor:'', flex:3, borderWidth:1, marginRight:2, borderRadius:6}}>
                                    <TextInput
                                        placeholder={'Type your password here'}
                                        placeholderTextColor={'black'}
                                        onChangeText={FindPassword=>this.setState({FindPassword})}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.ButtonBox}>
                                <TouchableOpacity  
                                    onPress={() =>{this.InsertRecord()}}
                                    activeOpacity={0.8}
                                    style={styles.Button}>
                                    <Text style={styles.ButtonText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ButtonBox: {
        //flex: 1,
        //width:Dimensions.get("screen").width*0.7,
        //backgroundColor: 'blue',
        alignItems:'flex-end',
        justifyContent: 'center',
        height:Dimensions.get("screen").height*0.05,
      },
  
      Button: {
          height:Dimensions.get("screen").height*0.04, 
          width:Dimensions.get("screen").width*0.3, 
          borderWidth:1,
          borderRadius:10, 
          backgroundColor:'#ebfff2',
          marginRight:5
      },
      ButtonText: {
          fontSize:Dimensions.get("screen").width*0.05, 
          textAlign:'center', 
          textAlignVertical:'center'
      },
      BackgroundImage:{
          height:Dimensions.get("screen").height,
          position:'absolute',
          top:Platform.OS === "android"? StatusBar.currentHeight :0,
          left:0,
          right:0,
          bottom:0
      },
      blurContainer: {
          flex: 1,
          //padding: 20,
          //justifyContent: 'center',
      },
      logo:{
          backgroundColor:'white',
          height:Dimensions.get("screen").height*0.065,
          width:Dimensions.get("screen").width*0.5,
          resizeMode:'center',
      }
  });
