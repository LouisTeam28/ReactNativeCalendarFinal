import React from 'react';
import {
    TouchableOpacity, StyleSheet, View,
    Text, TouchableWithoutFeedback, TextInput, Image, Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import asset from '../asset';
import { convertTimestampToDatetime } from '../utils/convertDateTime';
import { CreateNoteAPI } from '../api';
import moment from 'moment';
import StateDataManager from '../DataManager/StateDataManager';
const stateDataManagerInstance = StateDataManager.getStateDataManagerInstance();

export default class CreateNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectTime: false,
            dataNote: {
                title: "",
                time: moment(),
                content: "",
            }
        };
    }
    _hideSelectTime = () => {
        this.setState({ isSelectTime: false })
    };

    _handleConfirmTime = (date) => {
        this.setState({ isSelectTime: false })
        this.setState({ dataNote: { ...this.state.dataNote, time: date.getTime() } });
        console.log("date", this.state.dataNote.time)
    };

    addNote = () => {
        const { dataNote } = this.state
        console.log("date", dataNote)
        if(dataNote.title == '' || dataNote.content == ''){
            Alert.alert(
                '',
                'Vui lòng nhập đầy đủ tiêu đề và nội dung cho ghi chú!',
                [
                    {
                        text: 'OK'
                    }
                ],
                { cancelable: true }
            );
            return;
        }
        CreateNoteAPI(dataNote.title, (new Date(dataNote.time).getTime()), dataNote.content, (data) => {
            console.log("date", data)
            if (data.error.code == 200) {
                  var State = stateDataManagerInstance.getStateData();
                  State.isCheckNote = true;
                  stateDataManagerInstance.updateStateData(State);
        this.props.navigation.navigate('StoryScreen');
            }
        })
    }
    render() {
        const { dataNote } = this.state
        return (
            <View style={styles.container}
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={asset.icons.back} style={styles.backIconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Thêm ghi Chú</Text>
                    <TouchableOpacity onPress={() => this.addNote()}>
                        <Text style={styles.txt_edit}>Thêm</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawALine}/>
                <View style={styles.titleNote}>
                    <Text style={styles.title}>Tiêu đề:</Text>
                    <TextInput style={styles.inputNote}
                        value={dataNote.title}
                        onChangeText={(e) => {
                            dataNote.title = e
                            this.setState({ dataNote })
                        }} />
                </View>
                <TouchableWithoutFeedback onPress={() => this.setState({ isSelectTime: true })}>
                    <View style={styles.view_element}>
                        <Text style={styles.txt_hoten}>Ngày: </Text>
                        <View style={styles.view_select}>
                            <Text style={styles.inp_name}>{this.state.dataNote.time !== "" ? `${convertTimestampToDatetime(this.state.dataNote.time)}` : "Chọn ngày"}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <ScrollView>
                    <TextInput multiline={true}
                        style={styles.inputContentNote}
                        value={dataNote.content}
                        placeholder="Nội dung"
                        onChangeText={(e) => {
                            dataNote.content = e
                            this.setState({ dataNote })
                        }} />
                </ScrollView>
                <DateTimePickerModal
                    display="spinner"
                    isVisible={this.state.isSelectTime}
                    onConfirm={(date) => this._handleConfirmTime(date)}
                    onCancel={(date) => this._hideSelectTime(date)}
                    date={new Date()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
    },
    header: {
        height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10
    },
    headerTitle: {
        fontFamily: 'Avenir', color: 'black', fontSize: 20,
        fontFamily: "BaseFutara", color: '#104b63'
    },
    backIconStyle: {
        width: 30, height: 30, tintColor: '#104b63'
    },
    txt_edit: {
        color: "#006400", fontSize: 18,
        fontFamily: "BaseFutara"
    },
    drawContent: {
        height: '92%',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 2,
        marginTop: '5%',
    },
    drawALine:{
        width:'100%',
        height:2,
        backgroundColor:'silver',
    },
    titleNote: {
        flexDirection: 'row',
        marginLeft: 10,
        fontFamily: "BaseFutara"
    },
    title: {
        fontSize: 26,
        marginTop: '5%',
        color: '#104b63',
        fontFamily: "BaseFutara"
    },
    inputNote: {
        width: "70%",
        fontSize: 23,
        marginTop: '2%',
        borderBottomWidth: 2,
        borderBottomColor: "gray",
        fontFamily: "BaseFutara"
    },
    inputContentNote: {
        marginLeft: 10,
        width: "95%",
        fontSize: 20,
        marginTop: '2%',
        borderBottomWidth: 2,
        borderBottomColor: "gray",
        fontFamily: "BaseFutara"
    },
    content: {
        backgroundColor: 'white',
        width: '96%',
        marginTop: '5%',
        fontSize: 20,
    },
    txt_hoten: {
        color: '#104b63', fontSize: 16,
        fontFamily: "BaseFutara"
    },
    inp_name: {
        fontSize: 16, marginTop: -5, height: 40,
        fontFamily: "BaseFutara"

    },
    view_element: {
        width: '95%', padding: 5, height: 40, marginTop: 10, flexDirection: 'row',
        borderWidth: 1, borderRadius: 5, borderColor: "#AFAEAF",
        marginLeft: 10,
        backgroundColor: "#ffffff"
    },
    view_select: {
        width: '100%',
        flexDirection: 'row', justifyContent: 'space-between', padding: 6,
        height: 60,
    },
});


