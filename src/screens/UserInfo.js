import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import asset from '../asset';
import DataInfoManager from '../DataManager/DataInfoManager';
const dataInfoManager = DataInfoManager.getDataInfoManagerInstance();

export default class UserInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            profile: {},
        };
    }
    componentDidMount(){
        dataInfoManager.addObserver(this);
        var userInfo = dataInfoManager.getDataInfo()
        this.setState({profile: userInfo})
    }
    onDataInfoChanged(){
        dataInfoManager.addObserver(this);
        var userInfo = dataInfoManager.getDataInfo()
        this.setState({profile: userInfo})
    }  
    
    componentWillUnmount(){
        dataInfoManager.removeObserver(this)
    }

    
    render(){
        const {profile} = this.state
        const dateTime = moment(profile.dob).format("DD-MM-YYYY")
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Image source={asset.icons.menu} style={styles.backIconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Tài khoản của tôi</Text>
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('ChangeInfo')}>
                        <Text style={styles.txt_edit}>Sửa</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawALine} />
                <View style={styles.body}>
                    <View style={styles.view_element}>
                        <Text style={styles.txt_hoten}>Họ và tên</Text>
                        <Text style={styles.txt_name}>{profile.full_name}</Text>
                    </View>
                    <View style={styles.view_element}>
                        <Text style={styles.txt_hoten}>Ngày sinh</Text>
                        <Text style={styles.txt_name}>{dateTime}</Text>
                    </View>
                    <View style={styles.view_element}>
                        <Text style={styles.txt_hoten}>Giới tính</Text>
                        <Text style={styles.txt_name}>{!profile.gender ? "" : (profile.gender == 2 ? "Nữ" : "Nam")}</Text>
                    </View>
                    <View style={styles.view_element}>
                        <Text style={styles.txt_hoten}>Địa chỉ</Text>
                        <Text style={styles.txt_name}>{profile.address}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { color: 'black', fontSize: 20,
    fontFamily: "BaseFutara", color:'#104b63' },
    backIconStyle: { width: 70, height: 70, marginLeft:-10 },
    drawALine:{
        width:'100%',
        height:2,
        backgroundColor:'silver',
    },
    body: { flex: 10, backgroundColor: 'white', paddingTop: 5 },
    signInStyle: {
        flex: 3,
        marginTop: 50
    },
    view_element: {
        width: '100%', padding: 5, height: 60, flexDirection: 'row', justifyContent: "space-between",
        backgroundColor: "#ffffff", borderBottomWidth: 1, borderBottomColor: "#AFAEAF", alignItems: "center"
    },
    txt_hoten: {
        color: '#D7D7D7', fontSize: 18,
        fontFamily: "BaseFutara"
    },
    txt_name: {
        fontSize: 18, paddingLeft: 15, paddingRight: 10,
        fontFamily: "BaseFutara"
    },
    txt_edit: {
        color: "#006400", fontSize: 18,
        fontFamily: "BaseFutara"
    }
});