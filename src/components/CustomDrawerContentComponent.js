import React from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, Linking, ImageBackground} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { GetWeather } from '../api';
import moment from 'moment';
import asset from '../asset';
import DataInfoManager from '../DataManager/DataInfoManager';


const dataInfoManager = DataInfoManager.getDataInfoManagerInstance();



const MorningBack = [
    asset.weather.morning.morning1,
    asset.weather.morning.morning2,
];

const NightBack = [
    asset.weather.night.night1,
    asset.weather.night.night2,
];
export default class CustomDrawerContentComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            backImage:{},
            txtColor:"",
            zodiacImage:{},
            uriWeather:"",
            descriptions:"",
            dataWeather:{},
            profile:{},
            temperature:"",
            is_day:"",
        }
    }
    randomProperty = (obj) => {
        var keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    };
    getImageZodiac =()=> {
        //let chi = ["Dậu","Tuất","Hợi","Tý","Sửu","Dần","Mão","Thìn" ,"Tỵ","Ngọ","Mùi","Thân"];
        let year = moment().lunar().add(1, 'days').format('YYYY');
        let re = {};

        let mol = year%12;//tinh chi
        switch(mol){
            case 0: re = asset.imgZodiacChina.imgThan ;break;
            case 1: re = asset.imgZodiacChina.imgDau;break;
            case 2: re = asset.imgZodiacChina.imgTuat;break;
            case 3: re = asset.imgZodiacChina.imgHoi;break;
            case 4: re = asset.imgZodiacChina.imgTi;break;
            case 5: re = asset.imgZodiacChina.imgSuu;break;
            case 6: re = asset.imgZodiacChina.imgDan;break;
            case 7: re = asset.imgZodiacChina.imgMao;break;
            case 8: re = asset.imgZodiacChina.imgThin;break;
            case 9: re = asset.imgZodiacChina.imgTy;break;
            case 10: re = asset.imgZodiacChina.imgNgo;break;
            case 11: re = asset.imgZodiacChina.imgMui;break;
        }
        this.setState({zodiacImage: re});
    }
    getData = () =>{
        let h = new Date().getHours();
        if(h >5 && h < 18){ // sang
            this.setState({backImage: this.randomProperty(MorningBack) });
            this.setState({txtColor: "black" });
        }
        else{ // toi
            this.setState({backImage: this.randomProperty(NightBack) });
            this.setState({txtColor: "white" });
        }

        //
        this.getImageZodiac();

        dataInfoManager.addObserver(this);
        var userInfo = dataInfoManager.getDataInfo()
        this.setState({profile:userInfo})
        //
        console.log( "hdgajsd",userInfo.address);
        //
        GetWeather(userInfo.address,data=>{
            this.setState({dataWeather : data.current})
            this.setState({uriWeather : data.current.weather_icons[0]})
            this.setState({descriptions : data.current.weather_descriptions[0]})
            this.setState({temperature : data.current.temperature})
            this.setState({is_day : data.current.is_day})
            console.log("dataWeather",dataWeather)
        });
    }
    componentDidMount(){
        this.getData();
    }

    onDataInfoChanged(){
        dataInfoManager.addObserver(this);
        var userInfo = dataInfoManager.getDataInfo()
        this.setState({profile: userInfo})
        this.getData();
    }  
    
    componentWillUnmount(){
        dataInfoManager.removeObserver(this)
    }
    render() {
        const { uriWeather, descriptions,profile,temperature,is_day} = this.state;
        const dateTime = moment().format("DD-MM-YYYY");
        const dateTimeDob = moment(profile.dob).format("DD-MM-YYYY");
        //console.log(profile.gender);
        return (

            <ImageBackground  source={this.state.backImage} style={styles.imageBack}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.inforUser}>
                            <Image
                                style={[styles.drawImage]}
                                source={this.state.zodiacImage}
                            />
                            <View style={styles.txtInfor}>
                                <Text style={[styles.txtDetailInfor, {color:this.state.txtColor}]}>
                                    {profile.full_name}
                                </Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={profile.gender == 1 ? asset.sex.male : asset.sex.female} style={{ marginTop:5,width:15, height:15,}} />
                                    <Image source={profile.gender == 1 ? asset.sex.male : asset.sex.female} style={{ marginTop:5,width:15, height:15,}} />
                                </View>
                                <Text style={[styles.txtDetailInfor, {color:this.state.txtColor}]}>
                                    {dateTimeDob}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.headerWeather}>
                            <View style={styles.drawLine}/>
                            <Text style={[styles.txtWeatherHeader, {color:this.state.txtColor}]}>
                                {profile.address} {dateTime}
                            </Text>
                            <View style={styles.drawLine}/>
                        </View>
                        <View style={styles.weatherDescription}>
                            <View style={styles.weatherFeeling}>
                                <Image 
                                    style={styles.weatherIcon}
                                    source={{uri:uriWeather}}
                                />
                                <Text style={[styles.txtDetailFeeling, {color:this.state.txtColor}]}>
                                    {descriptions}
                                </Text>
                            </View>
                            <Text style={[styles.txtTemperature, {color:this.state.txtColor}]}>
                                Nhiệt độ trung bình: {temperature}°C
                            </Text>
                            <Text style={[styles.txtTemperature, {color:this.state.txtColor}]}>
                            {is_day == "yes" ? "Buổi sáng":"Buổi tối"}
                            </Text>
                        </View>
                    </View>

                    <DrawerContentScrollView 
                        {...this.props}
                        style={styles.drawListItem}    
                    >
                        <DrawerItemList {...this.props}/>
                        <DrawerItem
                            label="CONTACT FACEBOOK"
                            onPress={() => {
                                Linking.openURL('http://facebook.com/loc.nguyenhiep.1');
                            }}
                            color='red'
                            labelStyle={{color:'#3b5998', fontSize:13, 
                            fontFamily: "BaseFutara",}}
                            icon={({ focused, color, size }) => 
                                <Image source={asset.drawerIcon.facebook} style={styles.iconDrawerItem} />
                            }
                        />
                        
                    </DrawerContentScrollView>


                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageBack: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: 230,
        borderColor:'#c9e9f6',
        borderWidth:2,
    },
    inforUser:{
        flexDirection:'row',
        marginTop:'3%',
        marginLeft:'5%',
    },
    drawImage: {
        width: 100,
        height: 100,
        borderRadius: 80,
    },
    txtInfor:{
        marginLeft:'5%',
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:'5%',
        fontFamily: "BaseFutara",
    },
    txtDetailInfor:{
        textAlign:'center',
        marginTop:'3%',
        fontSize:15,
        fontFamily: "BaseFutara",
    },
    txtWeatherHeader:{
        width:'50%',
        textAlign:'center',
        fontFamily: "BaseFutara",
    },
    weatherDescription:{
        marginTop:'3%',
        marginLeft:'5%',
        width:'90%',
        height:'35%',
        justifyContent:'center',
        fontFamily: "BaseFutara",
    },
    weatherFeeling:{
        flexDirection:'row',
        alignItems:'center',
        fontFamily: "BaseFutara",
    },
    weatherIcon:{
        borderRadius:15,
        width:30,
        height:30,
    },
    txtDetailFeeling:{
        marginLeft:10,
        width:'75%',
        fontFamily: "BaseFutara",
    },
    txtTemperature:{
        fontFamily: "BaseFutara",
    },
    headerWeather:{
        flexDirection:'row',
    },
    drawLine:{
        width:'25%',
        marginTop:'3%',
        marginBottom:'3%',
        height:2,
        backgroundColor:'#c9e9f6',
    },
    drawListItem:{
        width:'100%',
    },
    iconDrawerItem:{
        width:20,
        height:20,
        borderRadius:20
    },

});