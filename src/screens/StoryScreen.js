import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ContainerStoryScreen from './ContainerStoryScreen';
import Draggable from 'react-native-draggable';
import CreateNote from './CreateNote';
import { GetListNote } from '../api';
import asset from '../asset';
import moment from 'moment';
const Stack = createStackNavigator();

import StateDataManager from '../DataManager/StateDataManager';
const stateDataManagerInstance = StateDataManager.getStateDataManagerInstance();


const wi = Dimensions.get('window').width;
const he = Dimensions.get('window').height;
const widthItemZodiac = (Dimensions.get('window').width * 30) / 100;
const HeightItemZodiac = (Dimensions.get('window').width * 35) / 100;
const WidthImage = (widthItemZodiac * 70) / 100;
const HeightImage = (widthItemZodiac * 70) / 100;

class StoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNote: [],
            isLoading: true,
        };
    }
    componentDidMount() {
        stateDataManagerInstance.addObserver(this)
        this.GetListNote();
    }
    GetListNote = () => {
        GetListNote((data) => {
            this.setState({ dataNote: data.data, isLoading: false })
            console.log(this.state.dataNote)

        })
    }
    onStateDataChanged=()=>{
        var State = stateDataManagerInstance.getStateData();
        if(State.isCheckNote == true){
            this.GetListNote();
            State.isCheckNote = false;
            stateDataManagerInstance.updateStateData(State);
        }
    }
    componentWillUnmount(){
        stateDataManagerInstance.removeObserver(this)
    }
    render() {
        const { dataNote, isLoading } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Image source={asset.icons.menu} style={styles.backIconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Ghi chú</Text>
                    <TouchableOpacity>
                        <Text style={styles.txt_edit}></Text>
                    </TouchableOpacity>
                </View>
                <View style ={styles.drawALine} />
                <View style={styles.drawContent}>
                    {
                        isLoading ?
                            <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 50 }} />
                            :
                            <FlatList style={styles.containerScrollZodiac}
                                data={this.state.dataNote}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    const dateTime = moment(new Date(item.date_time)).format('DD-MM-YYYY');
                                    return (<View><View style={styles.brLaugh}>
                                    </View>
                                        <TouchableOpacity style={styles.itemLaugh} onPress={() => {
                                            if (this.props.navigation != null)
                                                this.props.navigation.navigate('ContainerStoryScreen', {
                                                    data: item,
                                                });
                                        }}>
                                            <View style={styles.headerContent}>
                                            <Text style={styles.laughTitle}>
                                                {item.note_title}
                                            </Text>
                                            <Text style={styles.dateTitle}>
                                                Ngày :{dateTime}
                                            </Text>
                                            </View>
                                            <Text numberOfLines={2} width={100} style={styles.laughNoiDung}>
                                                {item.note_content}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    )
                                }}
                            ></FlatList>
                    }
                </View>
                <Draggable x={wi*0.8} y={he - 150}
                    renderColor='white'
                    isCircle
                    onShortPressRelease={() => this.props.navigation.navigate('CreateNote')}
                    maxX={wi*0.8}
                    maxY={he - 150}
                    minX={wi*0.8}
                    minY={he - 150}
                    renderSize={55}
                    imageSource ={asset.icons.add2} />
            </View>
        );
    }
}
export default class MenuStory extends React.Component {
    render() {
        return (
            <Stack.Navigator
                screenOptions={
                    {
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                        ...TransitionPresets.ModalSlideFromBottomIOS
                    }
                }
            >
                <Stack.Screen name="StoryScreen" component={StoryScreen}
                    options={{ headerShown: false, }} />
                <Stack.Screen name="ContainerStoryScreen" component={ContainerStoryScreen}
                    options={{ headerShown: false, }} />
                <Stack.Screen name="CreateNote" component={CreateNote}
                    options={{ headerShown: false, }} />
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    headerNavigation: {
        color: 'red',
    },
    header: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: 'black', fontSize: 20, marginLeft: -60, color:'#104b63',
    fontFamily: "BaseFutara" },
    backIconStyle: { width: 70, height: 70, marginLeft: -10},
    txt_edit: {
        color: "black", fontSize: 18, fontWeight: 'bold',
        fontFamily: "BaseFutara"
    },
    drawALine:{
        width:'100%',
        height:2,
        backgroundColor:'silver',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    drawContent: {
        height: '92%',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        height: '6.2%',
        fontFamily: "BaseFutara"
    },
    containerScrollZodiac: {
        width: '100%',
        height: '93.8%',

    },
    brLaugh: {
        height: 1,
        width: "100%",
        backgroundColor: "#EEEEEE",
    },
    itemLaugh: {
        width: "96%",
    },
    headerContent:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    laughTitle: {
        color: '#0877c2',
        fontSize: 23,
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5,
        fontFamily: "BaseFutara"
    },
    dateTitle: {
        textAlignVertical:'center',
        color: 'gray',
        fontSize: 14,
        fontFamily: "BaseFutara"
    },
    laughNoiDung: {
        lineHeight: 22,
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 10,
        fontFamily: "BaseFutara"
    },
});
