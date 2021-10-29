import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Image, SnapshotViewIOS, Dimensions, StatusBar, Platform, ScrollView, Button, TouchableOpacity } from 'react-native';

export default class First extends Component {
    state = {  }
    render() {
        return (
            <View>
                <View style={{
                        flexDirection:'column',
                        paddingTop: Platform.OS === "android"? StatusBar.currentHeight : 0, 
                        backgroundColor:'blue',minHeight:Dimensions.get("screen").height,
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
        );
    }
}

const styles = StyleSheet.create({
    ButtonBox: {
      //flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      height:Dimensions.get("screen").height*0.1,
    },

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

