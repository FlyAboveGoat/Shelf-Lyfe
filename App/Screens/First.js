import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Image,ImageBackground, SnapshotViewIOS, Dimensions, StatusBar, Platform, ScrollView, Button, TouchableOpacity } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { BlurView } from 'expo-blur';

export default class First extends Component {
    state = {  }
    render() {
        return (
            <View>
                <ImageBackground source={require("../../assets/FoodBackground.jpg")} style={styles.BackgroundImage}>
                    <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
                    </BlurView>
                </ImageBackground>
                <View style={{flexDirection:'column', paddingTop: Platform.OS === "android"? StatusBar.currentHeight :0, backgroundColor:''}}>
                    <View style={{flexDirection:'row', 
                    width:Dimensions.get("screen").width, 
                    justifyContent:'flex-start', 
                    backgroundColor:'white', 
                    position:'absolute',
                    paddingTop: Platform.OS === "android"? StatusBar.currentHeight :0}}>       
                            <Image source={require("../../assets/logo.png")} style={styles.logo}/>         
                    </View>
                    <View style={{
                            flexDirection:'column',
                            paddingTop: Platform.OS === "android"? StatusBar.currentHeight : 0, 
                            minHeight:Dimensions.get("screen").height,
                            justifyContent: 'center'}}>
                        <View style={styles.ButtonBox}>
                            <TouchableOpacity style={styles.Button}
                            onPress={() =>{this.props.navigation.navigate('Login')}}
                            activeOpacity={0.8}>
                                <Text style={styles.ButtonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ButtonBox}>
                            <TouchableOpacity style={styles.Button} 
                            onPress={() =>{this.props.navigation.navigate('Register')}}
                            activeOpacity={0.8}>
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
      //backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      height:Dimensions.get("screen").height*0.1,
    },

    Button: {
        height:Dimensions.get("screen").height*0.055, 
        width:Dimensions.get("screen").width*0.4, 
        borderWidth:1,
        borderRadius:10, 
        backgroundColor:'#f5fffb'
    },
    ButtonText: {
        fontSize:Dimensions.get("screen").width*0.075, 
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

