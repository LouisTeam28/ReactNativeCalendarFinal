import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, 
    ActivityIndicator, Dimensions } from 'react-native';
import asset from '../asset';

const ListZodiac = [
    {
        id: 1,
        image: asset.iconZodiac.bachduong,
    },
    {
        id: 2,
        image: asset.iconZodiac.kimnguu,
    },
    {
        id: 3,
        image: asset.iconZodiac.songtu,
    },
    {
        id: 4,
        image: asset.iconZodiac.cugiai,
    },
    {
        id: 5,
        image: asset.iconZodiac.sutu,
    },
    {
        id: 6,
        image: asset.iconZodiac.xunu,
    },
    {
        id: 7,
        image: asset.iconZodiac.thienbinh,
    },
    {
        id: 8,
        image: asset.iconZodiac.bocap,
    },
    {
        id: 9,
        image: asset.iconZodiac.nhanma,
    },
    {
        id: 10,
        image: asset.iconZodiac.maket,
    },
    {
        id: 11,
        image: asset.iconZodiac.baobinh,
    },
    {
        id: 12,
        image: asset.iconZodiac.songngu,
    },
];
const ListConGiap = [
    {
        id: 1,
        name: 'Tý',
        image: asset.iconZodiacChina.ti,
        time: 'Thông minh',
        tichcuc: 'Thẳng thắn, có sức lôi cuốn, tỉ mỉ, thông minh, hòa đồng, nhanh nhạy, giỏi ngoại giao.',
        tieucuc: 'Rườm rà, ích kỷ, tính toán, bí mật, cố chấp, tham lam, hám tiền.'
    },
    {
        id: 2,
        name: 'Sửu',
        image: asset.iconZodiacChina.suu,
        time: 'May mắn',
        tichcuc: 'Bình tĩnh, có phương pháp, trung thực, trung thành, chân thành, kiên định, thoải mái, đáng tin cậy.',
        tieucuc: 'Vật chất, cứng nhắc, bướng bỉnh, không linh hoạt, thiếu kiên nhẫn, hẹp hòi.'
    },
    {
        id: 3,
        name: 'Dần',
        image: asset.iconZodiacChina.dan,
        time: 'Thử thách',
        tichcuc: 'Đam mê, mạnh mẽ, nhiệt tình, sâu sắc, hòa đồng, năng động, lạc quan.',
        tieucuc: 'Bồn chồn, liều lĩnh, bốc đồng, thiếu kiên nhẫn, nóng vội, vô ích, không vâng lời.'
    },
    {
        id: 4,
        name: 'Mão',
        image: asset.iconZodiacChina.mao,
        time: 'Gan dạ',
        tichcuc: 'Tốt bụng, nhạy cảm, thông minh, sắc sảo, ngoan ngoãn, chu đáo, tinh tế.',
        tieucuc: 'Buồn rầu, tách ra, xảo quyệt, sở hữu, quấy khóc, lố bịch.'
    },
    {
        id: 5,
        name: 'Thìn',
        image: asset.iconZodiacChina.thin,
        time: 'Danh tiếng',
        tichcuc: 'Quyết định, kiên định, tự tin, tháo vát, thích nghi, dũng cảm, đam mê.',
        tieucuc: 'Hách dịch, độc đoán, kiêu ngạo, thiếu tế nhị, nóng vội, thái quá, giáo điều.'
    },
    {
        id: 6,
        name: 'Tỵ',
        image: asset.iconZodiacChina.ty,
        time: 'Trách nhiệm',
        tichcuc: 'Gợi cảm, sáng tạo, tinh tế, sâu sắc, thông minh, kín đáo, khôn ngoan, từ bi.',
        tieucuc: 'Không tin tưởng, nói láo, lôi cuốn, vô ích, độc hại, thích chiếm hữu.'
    },
    {
        id: 7,
        name: 'Ngọ',
        image: asset.iconZodiacChina.ngo,
        time: 'Gia đình',
        tichcuc: 'Quyến rũ, hoạt bát, dí dỏm, độc lập, vui vẻ, tinh tế, kiên trì.',
        tieucuc: 'Hay lo lắng, thô lỗ, ích kỷ, không kiên định, thiếu kiên nhẫn, hão huyền, thiếu thận trọng.'
    },
    {
        id: 8,
        name: 'Mùi',
        image: asset.iconZodiacChina.mui,
        time: 'Xuất sắc',
        tichcuc: 'Sáng tạo, khéo léo, có học thức, tốt bụng, hiền lành, thông minh, nhạy cảm.',
        tieucuc: 'Thiếu quyết đoán, be tha, bị phụ thuộc, dễ dao động, bội nghĩa, ranh mãnh.'
    },
    {
        id: 9,
        name: 'Thân',
        image: asset.iconZodiacChina.than,
        time: 'Kiên định',
        tichcuc: 'Nhanh nhạy, giàu trí tưởng tượng, khéo léo, tháo vát, linh hoạt, có sức thuyết phục, hóm hỉnh.',
        tieucuc: 'Láu cá, tinh quái, gian dối, mánh khóe, ranh mãnh, bộp chộp, hời hợt.'
    },
    {
        id: 10,
        name: 'Dậu',
        image: asset.iconZodiacChina.dau,
        time: 'Gặp gỡ',
        tichcuc: 'Cầu toàn kiên cường, dũng cảm, có nhiệt huyết, chính nghĩa, có trách nhiệm, siêng năng.',
        tieucuc: 'Ngoan cố, lỗ mãng, kiêu ngạo, thô lỗ, thiếu kiên nhẫn, hung hăng, hống hách.'
    },
    {
        id: 11,
        name: 'Tuất',
        image: asset.iconZodiacChina.tuat,
        time: 'Ấm áp',
        tichcuc: 'Trung thành, có trách nhiệm, thân thiện, khiêm tốn, thật thà.',
        tieucuc: 'Nhạy cảm, nguyên tắc, hay phán xét, đa nghi, thích tranh luận và khá bảo thủ.'
    },
    {
        id: 12,
        name: 'Hợi',
        image: asset.iconZodiacChina.hoi,
        time: 'Như ý',
        tichcuc: 'Kiên nhẫn, trung thành, chân thành, sôi nổi, siêng năng, hào phóng, hay giúp đỡ, khiêm tốn.',
        tieucuc: 'Khờ khạo, cả tin, thiên về vật chất, hời hợt, buông thả.'
    },
];
class ConGiapToday extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataZodiac: '',
            isLoading: false,
            index: this.props.route.params
        }
    }

    componentDidMount() {

        const { index } = this.state;
        console.log('index', index)
        var arrZodiac = [];
        var Url = '';
        var currentdate = new Date();
        let dayStr = currentdate.getDate() < 10 ? `0${currentdate.getDate()}` : `${currentdate.getDate()}`
        let monthStr = currentdate.getMonth() + 1 < 10 ? `0${currentdate.getMonth() + 1}` : `${currentdate.getMonth() + 1}`
        let dateStr = `${monthStr}-${dayStr}-${currentdate.getFullYear()}`
        let dateStr2 = `${dayStr}/${monthStr}/${currentdate.getFullYear()}`

        Url = 'https://api.nhatky.ml/v1/zodiacdaily',
            arrZodiac = [{ name: 'Bạch Dương', code: 1, query: 'CungBachDuong' }, { name: 'Kim Ngưu', code: 2, query: 'CungKimNguu' }, { name: 'Song Tử', code: 3, query: 'CungSongTu' },
            { name: 'Cự Giải', code: 4, query: 'CungCuGiai' }, { name: 'Sư Tử', code: 5, query: 'CungSuTu' }, { name: 'Xử Nữ', code: 6, query: 'CungXuNu' },
            { name: 'Thiên Bình', code: 7, query: 'CungThienBinh' }, { name: 'Bọ Cạp', code: 8, query: 'CungBoCap' }, { name: 'Nhân Mã', code: 9, query: 'CungNhanMa' },
            { name: 'Ma Kết', code: 10, query: 'CungMaKet' }, { name: 'Bảo Bình', code: 11, query: 'CungBaoBinh' }, { name: 'Song Ngư', code: 12, query: 'CungSongNgu' }];
        this.setState({ isLoading: true })
        fetch(`${Url}/${dateStr}/${arrZodiac[index.id-1].query}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('responseJson', responseJson)

                if (responseJson.data !== undefined) {
                    var find = '♥';
                    var re = new RegExp(find, 'g');
                    // console.log(`${responseJson.data.zodiacdailycontent.replace(re, '❤')}`)
                    let tmp = `${responseJson.data.zodiacdailycontent.replace(re, '❤')}`
                    tmp = tmp.replace('❤ Tâm trạng:', '');
                    tmp = tmp.replace('Isabelle Fortes | ', '');
                    tmp = tmp.replace(dateStr2, '');
                    tmp = tmp.replace(dateStr2, '');
                    this.setState({ dataZodiac: tmp })
                }
            })
            .catch((error) => {
                //console.log(error);
            });
    }
    render() {
        console.log(dataZodiac)
        let { id } = this.props.route.params;

        let item = ListConGiap.find(obj => obj.id == id);
        const { dataZodiac, isLoading, index } = this.state;
        console.log(dataZodiac === '')
        var arrZodiac = [];
        let titleDay = ''
        var currentdate = new Date();
        let dayStr = currentdate.getDate() < 10 ? `0${currentdate.getDate()}` : `${currentdate.getDate()}`
        let monthStr = currentdate.getMonth() + 1 < 10 ? `0${currentdate.getMonth() + 1}` : `${currentdate.getMonth() + 1}`
        titleDay = `Hôm nay, ngày ${dayStr} tháng ${monthStr} năm ${currentdate.getFullYear()}`
        arrZodiac = [{ name: 'Bạch Dương', code: 1, query: 'CungBachDuong' }, { name: 'Kim Ngưu', code: 2, query: 'CungKimNguu' }, { name: 'Song Tử', code: 3, query: 'CungSongTu' },
            { name: 'Cự Giải', code: 4, query: 'CungCuGiai' }, { name: 'Sư Tử', code: 5, query: 'CungSuTu' }, { name: 'Xử Nữ', code: 6, query: 'CungXuNu' },
            { name: 'Thiên Bình', code: 7, query: 'CungThienBinh' }, { name: 'Bọ Cạp', code: 8, query: 'CungBoCap' }, { name: 'Nhân Mã', code: 9, query: 'CungNhanMa' },
            { name: 'Ma Kết', code: 10, query: 'CungMaKet' }, { name: 'Bảo Bình', code: 11, query: 'CungBaoBinh' }, { name: 'Song Ngư', code: 12, query: 'CungSongNgu' }];
        

        return (<View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image source={asset.icons.back} style={styles.backIconStyle} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Xem con giáp hôm nay</Text>
                <TouchableOpacity >
                    <Text style={styles.txt_edit}></Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>
                    <Image style={{ width: 90, height: 90, borderRadius:60, borderWidth:1, borderColor:'silver', }} source={item.image} />
                </View>
                <Text style={{ fontFamily: 'BaseFutara', fontSize: 25, marginTop: 10, color: 'orange', textAlign: 'center' }}>{item.name}</Text>
                <Text style={{ fontFamily: "BaseFutara", fontSize: 20, padding: 10, color: '#FF748C', textAlign: 'center' }}>{titleDay}</Text>
                <View style={{ width: DEVICE_WIDTH - 20, alignItems: 'center', marginLeft: 10,}}>
                    {
                        isLoading ?
                            <ActivityIndicator size="large" color="#ff8da1" style={{ marginTop: 50 }} />
                            :
                            <View style={{ width: DEVICE_WIDTH - 30, marginTop:30 }}>
                                <Text style={{ fontFamily: "BaseFutara", fontSize: 20, color: '#ff8da1', textAlign: 'left' }}>
                                    {dataZodiac}
                                </Text>
                            </View>
                    }
                </View>
            </ScrollView>

        </View>

        );
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff3f5",
    },
    header: { height: 60, width: "100%", backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: 'black', fontSize: 20,
    fontFamily: "BaseFutara", },
    backIconStyle: { width: 30, height: 30 },
    txt_edit: {
        color: "black", fontSize: 18, fontWeight: 'bold'
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
    content: {
        backgroundColor: 'white',
        width: '96%',
        marginTop: '5%',
        fontSize: 22,
    },
    ModalBackground: {
        flex: 1
    },
    spinnerTextStyle: {
        color: '#FFFFFF',
        fontFamily: "BaseFutara",
        fontSize: 20,
    },
});

export default ConGiapToday;
