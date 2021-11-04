import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, SnapshotViewIOS, Dimensions, StatusBar, Platform, ScrollView, Button, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
           Username:'',
           Password:'',
        };
      }
    
    Register=()=>{
        console.log(this.state.Username);
        console.log(this.state.Password);

        console.log('updated4');
        var Username=this.state.Username;
        var Password=this.state.Password;

        if (Username.length==0||Password.length==0){
            alert ('Required feild is missing');
        }
        else{
            var InsertAPIURL='http://10.0.2.2:80/api/insert.php';
            
            var headers={
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
            };

            var Data={
                Username: Username,
                Password: Password
            };

            fetch(InsertAPIURL,
            {
                method:'POST',
                headers:headers,
                body: JSON.stringify(Data)
            }
            )
            .then((response)=> response.json())
            .then((response)=>
            {
                alert(response[0].Message);
                console .log('reach response');
                this.props.navigation.navigate('First');
            })
            .catch((error)=>
            {
                alert("Error"+error);
                console .log('reach error');
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
                                        onChangeText={Username=>this.setState({Username})}
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
                                        onChangeText={Password=>this.setState({Password})}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.ButtonBox}>
                                <TouchableOpacity  
                                    onPress={() =>{this.Register()}}
                                    activeOpacity={0.8}
                                    style={styles.Button}>
                                    <Text style={styles.ButtonText}>Register</Text>
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