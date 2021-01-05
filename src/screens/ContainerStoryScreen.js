import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import asset from '../asset';
import { convertTimestampToDatetime } from '../utils/convertDateTime';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { EditNoteAPI, DeleteNote } from '../api';
import moment from 'moment';
import Draggable from 'react-native-draggable';
import StateDataManager from '../DataManager/StateDataManager';
const stateDataManagerInstance = StateDataManager.getStateDataManagerInstance();


const wi = Dimensions.get('window').width;
const he = Dimensions.get('window').height;

export default class ContainerStoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckEdit: false,
            isSelectTime: false,
            dataNote: {
                note_title: "",
                date_time: 0,
                note_content: "",
            }

        };
    }
    componentDidMount() {
        let { data } = this.props.route.params;
        this.setState({ dataNote: data })
    }

    _hideSelectTime = () => {
        this.setState({ isSelectTime: false })
        console.log("date", this.state.dataNote)
    };

    _handleConfirmTime = (date) => {
        this.setState({ isSelectTime: false })
        this.setState({ dataNote: { ...this.state.dataNote, date_time: date.getTime() } });
        console.log("date", this.state.dataNote.date_time)
    };

    // addNote=()=>{
    //     const { dataNote } = this.state
    //     console.log("date", dataNote)
    //     CreateNoteAPI(dataNote.title,dataNote.time,dataNote.content,(data)=>{
    //         console.log("date", data)
    //         if (data.error.code == 200) {
    //             this.props.navigation.goBack()
    //         }
    //     })
    // }
    BtnEditNote = () => {
        this.setState({ isCheckEdit: true })
    }
    EditNote = () => {
        const { dataNote } = this.state
        console.log("date", dataNote)
        EditNoteAPI(dataNote.id, dataNote.note_title, dataNote.date_time, dataNote.note_content, (data) => {
            console.log("date", data)
            if (data.error.code == 200) {
                var State = stateDataManagerInstance.getStateData();
                State.isCheckNote = true;
                stateDataManagerInstance.updateStateData(State);
                this.setState({ isCheckEdit: false })
                this.props.navigation.navigate('ContainerStoryScreen')
            }
        })
    }
    DeleteNote = () => {
        const { dataNote } = this.state
        Alert.alert(
            'Bạn có muốn xóa ghi chú này không ?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => DeleteNote(dataNote.id, (data) => {

                        if (data.error.code == 200) {
                            var State = stateDataManagerInstance.getStateData();
                            State.isCheckNote = true;
                            stateDataManagerInstance.updateStateData(State);
                            this.props.navigation.navigate('StoryScreen');
                        }
                    })
                }
            ],
            { cancelable: true }
        );
    }

    render() {
        var pase;
        const { dataNote } = this.state
        const dateTime = moment(new Date(dataNote.date_time)).format('DD-MM-YYYY');
        if (this.state.isCheckEdit) {
            pase = <View style={styles.container}
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.setState({ isCheckEdit: false })}>
                        <Image source={asset.icons.back} tintColor='black' style={styles.backIconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Ghi Chú</Text>
                    <TouchableOpacity onPress={() => this.EditNote()}>
                        <Text style={styles.txt_edit}>Lưu</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawALine} />
                <View style={styles.titleNote}>
                    <Text style={styles.title}>Tiêu đề:</Text>
                    <TextInput style={styles.inputNote}
                        value={dataNote.note_title}
                        onChangeText={(e) => {
                            dataNote.note_title = e
                            this.setState({ dataNote })
                        }} />
                </View>
                <TouchableWithoutFeedback onPress={() => this.setState({ isSelectTime: true })}>
                    <View style={styles.view_element}>
                        <Text style={styles.txt_lbNgay}>Ngày </Text>
                        <View style={styles.view_select}>
                            <Text style={styles.inp_name}>{this.state.dataNote.date_time !== "" ? `${convertTimestampToDatetime(this.state.dataNote.date_time)}` : "Chọn ngày"}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <ScrollView>
                    <TextInput multiline={true}
                        style={styles.inputContentNote}
                        value={dataNote.note_content}
                        placeholder="Nội dung"
                        onChangeText={(e) => {
                            dataNote.note_content = e
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
        } else {
            pase = <ScrollView style={styles.container}
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            >

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={asset.icons.back} tintColor='black' style={styles.backIconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{dataNote.note_title}</Text>
                    <TouchableOpacity onPress={() => this.BtnEditNote()}>
                        <Text style={styles.txt_edit}>Sửa</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawALine} />
                <View style={styles.containerContent}>
                    <Text style={styles.date_time}>
                        {dateTime}
                    </Text>
                    <View style={styles.drawShortALine} />
                    <View style={styles.content}>
                        <Text style={styles.txtHeaderContent}>
                            Nội dung:
                        </Text>
                        <Text style={styles.txtContent}>
                            {dataNote.note_content}
                        </Text>
                    </View>
                </View>

                <Draggable x={(wi / 2) - (50 / 2)} y={he - 100}
                    onShortPressRelease={() => this.DeleteNote()}
                    maxX={(wi / 2) - (50 / 2)}
                    maxY={he - 100}
                    minX={(wi / 2) - (50 / 2)}
                    minY={he - 100}
                    renderSize={50}
                    imageSource={asset.icons.del}
                />
            </ScrollView>
        }

        return pase;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    header: { height: 60, width: "100%", backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: 'black', fontSize: 20, fontFamily: "BaseFutara" },
    backIconStyle: { width: 30, height: 30 },
    txt_edit: {
        color: "black", fontSize: 17, color: '#198b83',
        fontFamily: "BaseFutara",
    },
    titleHead: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: "100%",
        height: 6
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
    title: {
        fontSize: 27,
        marginTop: '5%',
    },
    drawALine: {
        width: '100%',
        height: 2,
        backgroundColor: 'silver',
    },
    drawShortALine: {
        width: '50%',
        height: 2,
        backgroundColor: '#0394fc',
    },
    containerContent: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    date_time: {
        fontSize: 22,
        marginTop: '5%',
        color: '#0394fc',
        fontFamily: "BaseFutara"
    },
    content: {
        width: '94%',
        marginTop: '10%',
    },
    txtHeaderContent: {
        fontSize: 23,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        fontFamily: "BaseFutara"
    },
    txtContent: {
        fontSize: 18,
        width: '96%',
        marginTop: '2%',
        marginLeft: '4%',
        fontFamily: "BaseFutara",
    },
    titleNote: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    title: {
        fontSize: 26,
        marginTop: '5%',
        fontFamily: "BaseFutara",
    },
    inputNote: {
        width: "70%",
        fontSize: 26,
        marginTop: '2%',
        borderBottomWidth: 2,
        borderBottomColor: "gray",
        fontFamily: "BaseFutara",
    },
    inputContentNote: {
        marginLeft: 10,
        width: "95%",
        fontSize: 20,
        marginTop: '2%',
        borderBottomWidth: 2,
        borderBottomColor: "gray",
        fontFamily: "BaseFutara",
    },
    txt_lbNgay: {
        color: '#D7D7D7', fontSize: 16,
        fontFamily: "BaseFutara",
    },
    inp_name: {
        fontSize: 16, marginTop: -5, height: 40,
        fontFamily: "BaseFutara",

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


