export default {
    styleUrl: 'http://10.244.6.92:8081/baidumap/bmapgl/mapstyle/mapstyle.json',
    style: {
        styleJson: [{
            featureType: 'land',
            elementType: 'geometry',
            stylers: {
                'visibility': 'on',
                'color': '#f5f6f7ff',
            },
        }],
    },
};