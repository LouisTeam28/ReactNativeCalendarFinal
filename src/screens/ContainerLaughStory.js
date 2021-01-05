import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import asset from '../asset';


export default class ContainerLaughStory extends React.Component {
    render() {
        let { data } = this.props.route.params;
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={asset.icons.back} style={styles.backIconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{data.laughStory_title}</Text>
                    <TouchableOpacity >
                        <Text style={styles.txt_edit}></Text>
                    </TouchableOpacity>
                </View>
                    <View style={styles.drawALine} />
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                >
                    <Text style={styles.content}>
                        {data.laughStory_content}
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    header: { height: 60, width: "100%", backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: {
        color: '#0877c2', fontSize: 18, marginLeft: -30,
        fontFamily: "BaseFutara"
    },
    backIconStyle: { width: 30, height: 30, tintColor: '#104b63' },
    txt_edit: {
        color: "black", fontSize: 14, fontWeight: 'bold'
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
        fontFamily: "BaseFutara"
    },
    drawALine: {
        width: '100%',
        height: 2,
        backgroundColor: 'silver',
    },
    content: {
        width: '92%',
        marginTop: '10%',
        fontSize: 19,
        fontFamily: "BaseFutara"
    },
});


