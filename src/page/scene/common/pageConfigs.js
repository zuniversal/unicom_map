const pageConfigs = [{
    value: 'm1',
    label: '精准营销',
    children: [{
        value: 'sp',
        label: '沙盘运营',
    }, {
        value: '5g',
        label: '5G端网业协同',
    }, {
        value: '3k',
        label: '三千兆5G大融合覆盖',
    }, {
        value: 'ly',
        label: '政企商务楼宇',
    },
    ],
}, {
    value: 'm2',
    label: '精准渠道',
    children: [{
        value: 'nc',
        label: '农村挂图大作战',
    },
    // {
    //     value: 'yyt',
    //     label: '营业厅大数据选址平台',
    // },
    ],
}, {
    value: 'm3',
    label: '精准建网',
}, {
    value: 'm4',
    label: '当期热点',
}, {
    value: 'm5',
    label: '省份专区',
},
];

const pageConfigsMap = {};
for (const pageConfig of pageConfigs) {
    for (const subPage of (pageConfig.children || [])) {
        pageConfigsMap[subPage.value] = subPage;
    }
}

export {pageConfigs, pageConfigsMap};
