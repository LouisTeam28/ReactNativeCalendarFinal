import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, } from 'react-native';
import { Dimensions } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ContainerLaughStorys from './ContainerLaughStory';
import asset from '../asset';
import { GetLaughStory } from '../api';

const Stack = createStackNavigator();

const widthItemZodiac = (Dimensions.get('window').width * 30) / 100;
const HeightItemZodiac = (Dimensions.get('window').width * 35) / 100;
const WidthImage = (widthItemZodiac * 70) / 100;
const HeightImage = (widthItemZodiac * 70) / 100;

const ListZodiac = [
    {
        title: "A",
        NoiDung: [{
            title: "Ăn không?",
            container: `Một chàng sinh viên chở bạn gái trên một chiếc xe đạp. Đang đi, bỗng nhiên chàng thắng lại cái "ké...é....ét" ngay trước một quán chè rồi quay ra sau hỏi:

            - Ăn không ???
            
            - Nàng: ăn !!!
            
            - Chàng: có thế chứ ! Bộ thắng này mới thay hồi sáng đó!
            
            - Nói rồi, chàng tiếp tục đạp xe đi.
            
            - !?!?!?!?!?!?!?`
        }, {
            title: "Ăn vụng gặp nhau…",
            container: `Cả hai vợ chồng nhà kia đều có tính hay ăn vụng. Một hôm, người vợ đi làm đồng về thấy trong bếp có nồi xôi đậu vừa chín tới. Ðang đói, chị ta bốc một nắm, đứng nép sau cánh cửa ăn vụng chồng.

            Chưa ăn hết nửa nắm thì chồng về. Vừa bước vào cửa, ngửi thấy mùi xôi thơm phức, anh chồng cũng muốn ăn lắm, nhưng sợ vợ biết. Trông trước trông sau chỉ có xó cửa là kín nhất, anh ta nắm một nắm to định mang vào đó ăn. Vừa kéo cánh cửa ra, thì bắt gặp vợ cũng đang đứng đó ăn xôi. Anh ta hoảng hốt kêu lên:
            
            - Ơ kìa, u mày đấy à!
            
            Trông thấy tay vợ còn cầm nắm xôi, anh ta nhanh trí nói tiếp:
            
            - Tôi tưởng u mày ăn hết rồi, lấy thêm cho nắm nữa đây này!`
        }]
    },
    {
        title: "B",
        NoiDung: [{
            title: "BIỂN CHẾT",
            container: `Một hướng dẫn viên du lịch đi đến đâu khi giới thiệu với khách anh ta cũng không quên kể về bố của mình.
            - Thưa quý ông, quý bà, đây là cung văn hóa do bố tôi là kiến trúc sư thiết kế... Đây là toà nhà quốc hội, cũng là công trình của bố tôi...
            - Khi đến biển chết, hướng dẫn viên nói tiếp: Thưa quý ông, quý bà, chúng ta đã tới biển chết, biển này...
            - Một du khách ngắt lời: Chúng tôi biết rồi! Biển này là do bố anh đánh chết chứ gì?`
        },
        {
            title: "Bố của Vova",
            container: `Hàng ngày Vôva thấy mẹ quát tháo bố, mỗi khi ông quá chén hoặc đôi khi bố Vôva quện chưa lau nhà, một hôm Vôva hỏi.
            - Tại sao bố khoẻ mà lại sợ mẹ thế, như con ấy chứ chẳng sợ mẹ tí nào cả…
            Bố Vôva nổi cáu:
            - mày thì biết gì, nói linh tinh , có những lúc mẹ mày phải quỳ trước mặt tao hàng tiếng đồng hồ mà tao còn không them nói câu nào ấy chứ…
            Lúc đó mẹ Vôva đi chợ về:
            - E hèm, ông nói lúc nào ấy nhỉ?
            - Hì hì àh hôm trước anh chui vào gầm giường tìm cái bút chẳng may bị mắc kẹt,em lấy cán chổi lùa mãi anh mới ra được đấy!!!! may quá không có em thì chết…`
        }
        ]
    },
    {
        title: "D",
        NoiDung: [{
            title: "Đừng đùa với chú em khi say…",
            container: `Trong tiết học đầu năm, cô giáo tiểu học yêu cầu mỗi học sinh kể một chuyện và rút ra bài học từ câu chuyện ấy.

            Andrey là người xung phong kể đầu tiên:
            
            - Ba em là chủ trang trại. Hàng tuần nhà em cho trứng gà vào rổ mang ra chợ bán. Một hôm chúng em bị đụng xe, trứng vỡ sạch. Bài học là: Đừng để tất cả trứng vào chung một rổ.
            
            Đến lượt Billy:
            
            - Cha em cũng là chủ nông trại, Một lần chúng em đặt 12 quả trứng gà vào máy ấp trứng, nhưng chỉ có 8 quả nở. Bài học là: Không nên tính số gà trước khi trứng nở.
            
            Tức mình vì những bài học sâu sắc bị bạn biến tướng thành chuyện không đâu, Michelle kể:
            
            - Trong chiến tranh, máy bay chở chú của em bị bắn hạ. Ông nhảy dù xuống một hòn đảo xa, trên người chỉ có một chai whisky nhỏ. Bị 12 tên địch vây bắt, ông uống hết nhẵn chai rượu rồi xông tới tiêu diệt cả 12 tên bằng tay không.
            
            Cô giáo sốt ruột:
            
            - Đó là câu chuyện, còn bài học là gì?
            
            - Dạ bài học là: Chớ có đùa với chú em khi ông ấy đã uống rượu.`
        }, {
            title: "Để bão lặng rồi tính sau",
            container: `Hai cha con người Gabrovo đi biển, đang lênh đênh ngoài khơi thì gặp bão. Ông bố ngửa mặt lên trời cầu khẩn:

            - Lạy Chúa, xin Ngài hãy thương lấy chúng con. Qua được cơn bão này, con sẽ xin dâng Ngài một cây nến dài như cột buồm...
            
            - Đứa con rụt rè hỏi. Bố ơi, bố tìm đâu ra một cây nến dài như vậy?
            
            - Ông bố giận dữ: Im ngay, thằng ngốc! Cứ để bão lặng đi đã, sau đó rồi tính.`
        }]
    },
];

class LaughStoryItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLaughStory: '',
        }
    }

    componentDidMount() {
        GetLaughStory(data=>{
            this.setState({dataLaughStory: data.data})
        })
    }
    render() {

        const {dataLaughStory} = this.state
        return (
            <FlatList style={styles.containerScrollZodiac}
                data={dataLaughStory}
                renderItem={({ item }) => {
                    return (<View><View style={styles.brLaugh}>
                    </View>
                        <TouchableOpacity style={styles.itemLaugh} onPress={() => {
                            if (this.props.navigation != null)
                                this.props.navigation.navigate('ContainerLaughStorys', {
                                    data: item,
                                });
                        }}>
                            <Text style={styles.laughTitle}>
                                {item.laughStory_title}
                            </Text>
                            <Text numberOfLines={2} width={100} style={styles.laughNoiDung}>
                                {item.laughStory_content}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    )
                }}
            />
        );
    }
}


class ListLaughStory extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Image source={asset.icons.menu} style={styles.backIconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Truyện Cười</Text>
                    <TouchableOpacity>
                        <Text style={styles.txt_edit}></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawALine}/>
                <View style={styles.drawContent}>
                    <FlatList style={styles.containerScrollZodiac}
                        data={ListZodiac}
                        renderItem={({ item }) => {
                            return <LaughStoryItem item={item} navigation={this.props.navigation} />;
                        }}
                        keyExtractor={item => item.id}
                    >
                    </FlatList>
                </View>
            </View>
        );
    }
}
export default class LaughStory extends React.Component {
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
                <Stack.Screen name="ListLaughStory" component={ListLaughStory}
                    options={{ headerShown: false }} />
                <Stack.Screen name="ContainerLaughStorys" component={ContainerLaughStorys}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    headerNavigation: {
        color: 'red',
    },
    header: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: 'black', fontSize: 20, marginLeft: -60, fontFamily: "BaseFutara", },
    backIconStyle: { width: 70, height: 70, marginLeft: -10 },
    txt_edit: {
        color: "black", fontSize: 18, fontWeight: 'bold'
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

    },
    rowItem: {
        flex: 1,
        justifyContent: 'space-around',
    },
    laughStoryItem: {
        width: "100%",
        height: 250,
    },
    backGroundZodiacName: {
        width: "100%",
        backgroundColor: "#e5e5e5",
        fontFamily: "BaseFutara"
    },
    brLaugh: {
        height: 1,
        width: "100%",
        backgroundColor: "#EEEEEE",
    },
    itemLaugh: {
        width: "96%",
    },
    zodiacName: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 24,
        marginLeft: 15,
        marginTop: 2,
        marginBottom: 2,
    },
    laughTitle: {
        color: '#0877c2',
        fontSize: 20,
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5,
        fontFamily: "BaseFutara"
    },
    laughNoiDung: {
        lineHeight: 22,
        fontSize: 16,
        marginLeft: 15,
        marginBottom: 10,
        fontFamily: "BaseFutara"
    },

});
