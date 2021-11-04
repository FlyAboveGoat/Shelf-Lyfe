import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Image, ImageBackground, SnapshotViewIOS, Dimensions, StatusBar, Platform, ScrollView, Button, TouchableOpacity } from 'react-native';
import { TabRouter } from 'react-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { BlurView } from 'expo-blur';



export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemName:'',
            NumberofItem:'',    //Number of item in a particular ID
            MaxItemNum:'',      //Largest number in the ItemID
            ID:'',
            Password:'',
            Item:[],            //received item from db
            Date:[],            //received Date from db
            Update:true,        //for datetimepicker
            date:new Date(),    //for datetimepicker
            mode:'date',        //for datetimepicker
            show:false,         //for datetimepicker
            PushDate:'',        //Unix time to be pushed to the db
            IsAdding:false,
            statusColor:[],          
            expiredColor:[],
            boxColor:[],
            DisplayTime:'',
        };
    }
    

    componentDidMount() {
        /*setInterval(() => {
            this.GenerateRandomNumber();
        }, 4000); */       
        //this.getDataSourceState();
        //this.ModeCheck();
        console.log('this is called')
        const {ID2, Password2} = this.props.route.params;
        this.setState({
            ID: ID2,
            Password:Password2,
        },()=>{
            this.GetItemNum();
            
        });
        console.log('date =' + this.state.date);
        console.log('mode =' + this.state.mode);
        console.log('show =' + this.state.show);
    }

    GetItemNum=()=>{
        console.log('---------------------');
        console.log('GetItemNum is called');
        var ID=this.state.ID;
        var Password=this.state.Password;

        var SearchAPIURL="http://10.0.2.2:80/api/count.php";

        var header={
            'Accept':'application/json, text/plain, */*',
            'Content-Type':'application/json'
        };

        var Data={
            ID:ID,
            Password:Password
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
            console.log('Reach GetItemNum response');
            console.log('Number of item from server' + response[0].Message);
            console.log('Max Item Num from server' + response[0].Message2);
            var Maxy;
            if(response[0].Message2==''){
                Maxy=-1;
            }else{
                Maxy=response[0].Message2;
            }
            this.setState({
                NumberofItem:response[0].Message,
                MaxItemNum:Maxy
            },()=>{
                    this.GetRecord();
                    console.log('Number of item: ' + this.state.NumberofItem);
                    console.log('Max Item Num:' + this.state.MaxItemNum);
            })
        })
        .catch((error)=>{
            console.log('Reach GetItemNum error');
            alert('Error'+ error);
        })
        console.log('---------------------');
        
    }
    
    GetRecord=()=>{
        console.log('GetRecord is called');
        var ID=this.state.ID;
        var Password=this.state.Password;

        var SearchAPIURL="http://10.0.2.2:80/api/data.php";

        var header={
            'Accept':'application/json, text/plain, */*',
            'Content-Type':'application/json'
        };

        var Data={
            ID:ID,
            Password:Password
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
            //console.log(response[i]);
            for(let i =0;i<this.state.NumberofItem;i++){    //Save items from database into array
                //console.log('Item'+ i +'='+response[i])
                let Item = this.state.Item;
                let Items = Item[i];
                Items = response[i].Item;
                Item[i] = Items;

                let Date = this.state.Date;
                let Dates = Date[i];
                Dates = response[i].Date;
                Date[i] = Dates;

                this.setState({
                    Items,
                    Dates
                },()=>{
                    //console.log(Item[i]);
                    //console.log(Date[i]);
                    var answer = moment.unix(this.state.Date[i]/1000).endOf('minute').fromNow().replace(/[^A-Za-z]/g, '');
                    var num = parseFloat(moment.unix(this.state.Date[i]/1000).endOf('minute').fromNow().replace(/[^0-9]/g,''));
                    if (answer== "afewsecondsago" || answer == "minutesago" || answer== "aminuteago" || answer== "hoursago" || answer== "anhourago" || answer=="daysago" || answer=="adayago" || answer=='amonthago' ||answer=='monthsago' ||answer=="ayearago"||answer=="yearsago"){
                        console.log("Item" + i + "expired");
                        let statusColor = this.state.statusColor;
                        let statusColors = statusColor[i];
                        statusColors = '';
                        statusColor[i] = statusColors;
                        
                        let boxColor = this.state.boxColor;
                        let boxColors = boxColor[i];
                        boxColors = '#b4b4b6';
                        boxColor[i] = boxColors;

                        let expiredColor = this.state.expiredColor;
                        let expiredColors = expiredColor[i];
                        expiredColors = "red";
                        expiredColor[i] = expiredColors;
                        this.setState({statusColors, boxColors, expiredColor});
                    }else if((num<=5 && answer=='indays')||answer=='inaday'||answer=='inhours'||answer=='inanhour'||answer=='inminutes'||answer=='inaminute'){
                        console.log('Item ' + i + 'less than 5 days')
                        let statusColor = this.state.statusColor;
                        let statusColors = statusColor[i];
                        statusColors = '#f73640';
                        statusColor[i] = statusColors;

                        let boxColor = this.state.boxColor;
                        let boxColors = boxColor[i];
                        boxColors = 'white';
                        boxColor[i] = boxColors;

                        let expiredColor = this.state.expiredColor;
                        let expiredColors = expiredColor[i];
                        expiredColors = "black";
                        expiredColor[i] = expiredColors;
                        this.setState({statusColors, boxColors, expiredColor});
                    }else if(num<=20 && answer=='indays'){
                        let statusColor = this.state.statusColor;
                        let statusColors = statusColor[i];
                        statusColors = '#ff9933';
                        statusColor[i] = statusColors;

                        let boxColor = this.state.boxColor;
                        let boxColors = boxColor[i];
                        boxColors = 'white';
                        boxColor[i] = boxColors;

                        let expiredColor = this.state.expiredColor;
                        let expiredColors = expiredColor[i];
                        expiredColors = "black";
                        expiredColor[i] = expiredColors;
                        this.setState({statusColors, boxColors, expiredColor});
                    }
                    else{
                        let statusColor = this.state.statusColor;
                        let statusColors = statusColor[i];
                        statusColors = '#66ff33';
                        statusColor[i] = statusColors;

                        let boxColor = this.state.boxColor;
                        let boxColors = boxColor[i];
                        boxColors = 'white';
                        boxColor[i] = boxColors;

                        let expiredColor = this.state.expiredColor;
                        let expiredColors = expiredColor[i];
                        expiredColors = "black";
                        expiredColor[i] = expiredColors;
                        this.setState({statusColors, boxColors, expiredColor});
                    }
                    console.log('type of num ' + typeof(num));
                    console.log(answer);
                });
            }
        })
        .catch((error)=>{
            console.log('Reach GetRecord error');
            alert('Error'+ error);
        })
        
    }

    AddRecord=()=>{
        //this.setState({IsAdding:true});
        //this.GetItemNum();
        console.log('---------------------');
        console.log('AddRecord is called');
        console.log('In AddRecord: Password = '+ this.state.Password);
        console.log('In AddRecord: ID = ' + this.state.ID);
        console.log('In Addrecord: Expired Date = ' + this.state.PushDate);
        console.log('In Addrecord: Max Item Num = ' + this.state.MaxItemNum);

        console.log('AddRecord called');

        var ItemName=this.state.ItemName;
        var ID=this.state.ID;
        var Password=this.state.Password;
        var MaxItemNum=this.state.MaxItemNum;
        var Date=this.state.PushDate;

        if (ItemName.length==0){
            alert ('Required feild is missing');
        }
        else{
            var InsertAPIURL='http://10.0.2.2:80/api/add.php';
            
            var headers={
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
            };

            var Data={
                ItemName:ItemName,
                ID:ID,
                Password:Password,
                MaxItemNum:MaxItemNum,
                Date:parseInt(Date),
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
                console.log('reach AddRecord response');
                //this.props.navigation.navigate('Main');
                this.GetItemNum();
                
            })
            .catch((error)=>
            {
                alert("Error"+error);
                console .log('reach AddRecord error');
            }) 
        }
    }

    onChange = (event, selectedDate) => {
        console.log(selectedDate);
        //const currentDate = selectedDate;
        this.setState({show:false});
        //setShow(Platform.OS === 'ios');
        this.setState({date:selectedDate});
        var ts = moment(selectedDate, "M/D/YYYY H:mm").valueOf();//Convert date to UNIX format
        this.setState({PushDate:ts});
        console.log('Unix: ' + ts);
        var converted_hours = moment(selectedDate).format('MMMM Do YYYY, h:mm a');
        console.log(converted_hours);
        this.setState({DisplayTime:converted_hours})
        //var unix=selectedDate+1;
        //console.log(unix);
      };
    
    showMode = (currentMode) => {
        this.setState({show:true});
        this.setState({mode:currentMode});
      };
    
    showDatepicker = () => {
        this.showMode('date');
      };
    
    showTimepicker = () => {
        this.showMode('time');
      };

    deleteItem = (i) => {
        
        //console.log('---------------------');
        //console.log('deleteItem is called');
        console.log(i)
        var ID=this.state.ID;
        var Password=this.state.Password;
        var ItemID=i;

        var SearchAPIURL="http://10.0.2.2:80/api/delete.php";

        var header={
            'Accept':'application/json, text/plain, */*',
            'Content-Type':'application/json'
        };

        var Data={
            ID:ID,
            Password:Password,
            ItemID:ItemID
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
            alert(response[0].Message);
            console.log('reach deleteItem response');
            this.GetItemNum();
        })
        .catch((error)=>{
            console.log('Reach deleteItem error');
            alert('Error'+ error);
        })
        console.log('---------------------');
    };

    ConfirmingDelete = (i) =>{
        Alert.alert(
            "Deleting an Item",
            "Are you sure you want to delete \"" + this.state.Item[i] + "\"?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => this.deleteItem(i)}
            ]
        );
    }
    
    render() {
        var RecordShown =[];
        for(let i =0;i<this.state.NumberofItem;i++){
            //if(moment.unix(this.state.Date[i]/1000).endOf('minute').fromNow())
            //console.log('Item '+ i + ' displayed')
            RecordShown.push(        
                <View style={{flexDirection:'column', alignItems:'center'}}>
                    
                    <View style={[styles.ItemBox,{backgroundColor:this.state.boxColor[i]}]}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:5, flexDirection:'column', marginLeft:3}}>
                                <View>                          
                                        <Text style={{fontWeight:'bold', fontSize:Dimensions.get("screen").width*0.04}}>
                                            {this.state.Item[i]}
                                        </Text>
                                </View>
                                <View>
                                    <Text>Expired Date: {moment.unix(this.state.Date[i]/1000).format('MMMM Do YYYY, h:mm a')}   </Text>
                                </View>
                                <View>
                                    <Text style={{color:this.state.expiredColor[i]}}>Expired {moment.unix(this.state.Date[i]/1000).endOf('minute').fromNow()}</Text>
                                </View>
                            </View>
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                                <View style={{backgroundColor:this.state.statusColor[i], 
                                height:Dimensions.get("screen").width*0.09, 
                                width:Dimensions.get("screen").width*0.09,
                                alignSelf:'center',
                                borderRadius:100,
                                borderWidth:1}}>

                                </View>
                            </View>
                        </View>
                        <View style={{alignSelf:'flex-end', marginRight:2}}>
                            <TouchableOpacity  
                                onPress={() =>{this.ConfirmingDelete(i)}}
                                activeOpacity={0.8}
                                style={styles.Button}>
                                    <Text style={styles.ButtonText}>
                                        Remove
                                    </Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    
                </View>
            )
        }

        //var date = this.state.date;
        return (
            <View style={{paddingTop: Platform.OS === "android"? StatusBar.currentHeight :0}}>
                <ImageBackground source={require("../../assets/FoodBackground.jpg")} style={styles.BackgroundImage}>
                    <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
                    </BlurView>  
                </ImageBackground>
                <ScrollView style={{backgroundColor:'#00000000'}}>
                    <View>
                        <View style={{flexDirection:'row', width:Dimensions.get("screen").width, justifyContent:'flex-start', backgroundColor:'white'}}>       
                                <Image source={require("../../assets/logo.png")} style={styles.logo}/>         
                        </View>
                        
                        <View style={styles.AddBox}>
                            <View>
                                <Text style={{fontWeight:'bold', fontSize:Dimensions.get("screen").width*0.04, marginLeft:3}}>
                                    Add a new item here
                                </Text>
                            </View>
                            <View style={{flexDirection:'row', marginTop:2}}>
                                <View style={{flexDirection:'column', flex:3.5}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:1, backgroundColor:'', justifyContent:'center', marginLeft:3}}>
                                            <Text style={{fontSize:Dimensions.get("screen").width*0.045}}>
                                                Itemname: 
                                            </Text>
                                        </View>
                                        <View style={{backgroundColor:'', flex:2, borderWidth:1, borderRadius:5, marginLeft:2}}>
                                            <TextInput
                                                placeholder={'Type the item\'s name here'}
                                                placeholderTextColor={'black'}
                                                onChangeText={ItemName=>this.setState({ItemName})}
                                            />
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row', marginTop:3}}>
                                        <View style={{flex:1, backgroundColor:'', marginLeft:3, justifyContent:'center'}}>
                                            <Text style={{fontSize:Dimensions.get("screen").width*0.04}}>
                                                Expired Date: 
                                            </Text>
                                        </View>
                                        <View style={{flex:2, justifyContent:'center', backgroundColor:''}}>
                                            <Text style={{fontSize:Dimensions.get("screen").width*0.035}}>
                                                {this.state.DisplayTime}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            
                                <View style={{flex:1, backgroundColor:'', alignItems:'center', alignSelf:'center'}}>
                                    <TouchableOpacity  
                                        onPress={() =>{this.AddRecord()}}
                                        activeOpacity={0.8}
                                        style={[styles.Button, 
                                        {backgroundColor:'#66ff99', 
                                        height:Dimensions.get("screen").height*0.05, 
                                        width:Dimensions.get("screen").width*0.13,
                                        borderRadius:150,
                                        }]}>
                                            <Text style={[styles.ButtonText, {fontWeight:'bold', color:''}]}>
                                                Add
                                            </Text>
                                    </TouchableOpacity>
                                </View>                       
                            </View>
                            <View style={{flexDirection:'row', borderTopWidth:1,marginTop:3, paddingTop:5, backgroundColor:'#b3ffff'}}>
                                <View>
                                    <Text> Select the expired date and time:  </Text>
                                </View>
                                <View style={{flexDirection:'row', justifyContent:'space-evenly', flex:1, marginBottom:4}}>
                                    <View style={styles.TimePicker}>
                                        <TouchableOpacity  onPress={this.showDatepicker}>
                                            <Text style={{color:'white'}}>
                                                Date
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.TimePicker}>
                                        <TouchableOpacity  onPress={this.showTimepicker}>
                                            <Text style={{color:'white'}}>
                                                Time
                                            </Text>                
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.show && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={this.state.date}
                                        mode={this.state.mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.onChange}
                                        />
                                    )}
                                </View>
                            </View>
                            
                        </View>
                        {RecordShown}
                        
                    
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ItemBox: {
        flexDirection:'column', 
        height:Dimensions.get("screen").height*0.12, 
        width:Dimensions.get("screen").width*0.98, 
        borderRadius:5,
        borderColor:'black',
        borderWidth:1,
        marginBottom:5
    },
    Button: {
        height:Dimensions.get("screen").height*0.04, 
        width:Dimensions.get("screen").width*0.2, 
        borderWidth:1, borderRadius:10, 
        backgroundColor:'#ff3333',
    },
    ButtonText: {
        height:Dimensions.get("screen").height*0.04, 
        fontSize:Dimensions.get("screen").width*0.04, 
        textAlign:'center', 
        textAlignVertical:'center',
    },
    logo:{
        backgroundColor:'white',
        height:Dimensions.get("screen").height*0.065,
        width:Dimensions.get("screen").width*0.5,
        resizeMode:'center',
    },
    TimePicker:{
        width:Dimensions.get("screen").width*0.2,
        height:Dimensions.get("screen").height*0.03,
        borderRadius:5,
        backgroundColor:'#33bbff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    AddBox:{
        flexDirection:'column',
        borderTopWidth:1,
        borderBottomWidth:1,
        marginBottom:4,
        backgroundColor:'#e6fff7'
    },
    BackgroundImage:{
        height:Dimensions.get("screen").height,
        width:Dimensions.get("screen").width,
        //resizeMode:'stretch',
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
  });

/*
delete from items
where ID=10 AND ItemID = (select ItemID from (select ItemID from items where ID = 10 order by ItemID limit 0,1) as t)*/