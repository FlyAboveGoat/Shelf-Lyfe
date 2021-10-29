import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Image, SnapshotViewIOS, Dimensions, StatusBar, Platform, ScrollView, Button, TouchableOpacity } from 'react-native';


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
            <View style={{paddingTop: Platform.OS === "android"? StatusBar.currentHeight :0}}>
                <View>
                    <Text style={{fontSize:Dimensions.get("screen").width*0.1, textAlign: 'center'}}>Login</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'blue'}}>
                        <Text style={{textAlign:'center', textAlignVertical:'bottom'}}>
                            Username:
                        </Text>
                    </View>
                    <View style={{backgroundColor:'red'}}>
                        <TextInput
                            placeholder={''}
                            placeholderTextColor={'black'}
                            onChangeText={FindUsername=>this.setState({FindUsername})}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'blue'}}>
                        <Text style={{textAlign:'center', textAlignVertical:'bottom'}}>
                            Password:
                        </Text>
                    </View>
                    <View style={{backgroundColor:'red'}}>
                        <TextInput
                            placeholder={''}
                            placeholderTextColor={'black'}
                            onChangeText={FindPassword=>this.setState({FindPassword})}
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity  
                        onPress={() =>{this.InsertRecord()}}
                        activeOpacity={0.8}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Button: {
        backgroundColor:'green',
        height:Dimensions.get("screen").height*0.055, 
        width:Dimensions.get("screen").width*0.4, 
        borderWidth:1, borderRadius:10, 
        backgroundColor:'#ace8c4'
    },
    ButtonText: {
        fontSize:Dimensions.get("screen").width*0.075, 
        textAlign:'center', 
        textAlignVertical:'center'
    }
  });
