import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Image, SnapshotViewIOS, Dimensions, StatusBar, Platform, ScrollView, Button, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

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
            <View style={{paddingTop: Platform.OS === "android"? StatusBar.currentHeight :0}}>
                <View>
                    <Text style={{fontSize:Dimensions.get("screen").width*0.1, textAlign: 'center'}}>Register</Text>
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
                            onChangeText={Username=>this.setState({Username})}
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
                            onChangeText={Password=>this.setState({Password})}
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity  
                        onPress={() =>{this.Register()}}
                        activeOpacity={0.8}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}