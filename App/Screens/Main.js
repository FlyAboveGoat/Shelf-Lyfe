import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Image, SnapshotViewIOS, Dimensions, StatusBar, Platform, ScrollView, Button, TouchableOpacity } from 'react-native';
import { TabRouter } from 'react-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';



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
                    var num = moment.unix(this.state.Date[i]/1000).endOf('minute').fromNow().replace(/[^0-9]/g,'');
                    if (answer== "afewsecondsago" || answer == "minutesago" || answer== "aminuteago" || answer== "hoursago" || answer== "anhourago" || answer=="daysago" || answer=="adayago"){
                        console.log("Item" + i + "expired");
                        let statusColor = this.state.statusColor;
                        let statusColors = statusColor[i];
                        statusColors = "red";
                        statusColor[i] = statusColors;
                        this.setState({statusColors});
                    }
                    
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
            RecordShown.push(        
                <View style={{flexDirection:'column', alignItems:'center'}}>
                    
                    <View style={styles.ItemBox}>
                        <View>                          
                                <Text>{i+1} {this.state.Item[i]}</Text>
                        </View>
                        <View>
                            <Text>Expired Date: {moment.unix(this.state.Date[i]/1000).format('MMMM Do YYYY, h:mm a')}   </Text>
                        </View>
                        <View>
                            <Text style={{color:this.state.statusColor[i]}}>Expired {moment.unix(this.state.Date[i]/1000).endOf('minute').fromNow()}</Text>
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
            <ScrollView style={{backgroundColor: "white"}}>
                <View style={{paddingTop: Platform.OS === "android"? StatusBar.currentHeight :0}}>
                    <View>
                        <Text style={{fontSize:Dimensions.get("screen").width*0.1, textAlign: 'center'}}>Shelf Lyfe</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{backgroundColor:'blue'}}>
                            <Text style={{textAlign:'center', textAlignVertical:'bottom'}}>
                                Itemname: 
                            </Text>
                        </View>
                        <View style={{backgroundColor:'red'}}>
                            <TextInput
                                placeholder={''}
                                placeholderTextColor={'black'}
                                onChangeText={ItemName=>this.setState({ItemName})}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{backgroundColor:'blue'}}>
                            <Text style={{textAlign:'center', textAlignVertical:'bottom'}}>
                                Expiry Date:
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
                        <View>
                            <Button onPress={this.showDatepicker} title="Show date picker!" />
                        </View>
                        <View>
                            <Button onPress={this.showTimepicker} title="Show time picker!" />
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
                    <View>
                        <TouchableOpacity  
                            onPress={() =>{this.AddRecord()}}
                            activeOpacity={0.8}>
                            <Text>Add</Text>
                        </TouchableOpacity>
                    </View>
                    {RecordShown}
                                 
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    ItemBox: {
        flexDirection:'column', 
        height:Dimensions.get("screen").height*0.12, 
        width:Dimensions.get("screen").width*0.99, 
        backgroundColor:'#a2a2e7',
        borderRadius:5,
        borderColor:'black',
        borderWidth:1,
        marginBottom:2
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
       
    }
  });

/*
delete from items
where ID=10 AND ItemID = (select ItemID from (select ItemID from items where ID = 10 order by ItemID limit 0,1) as t)*/