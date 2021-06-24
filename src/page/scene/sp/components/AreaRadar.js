/*
 * @Descripttion: 雷达
 * @version: v1.0.0
 * @Author: fanweijun
 * @Date: 2021-05-03 18:19:01
 * @LastEditors: fanweijun
 * @LastEditTime: 2021-05-03 19:14:50
 */
import ReactECharts from 'echarts-for-react';
import styles from './AreaRadar.module.less';

export default function AreaRadar(props) {
    const {title} = props.data;
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.radarWrap}>
                <RadarEchart />
            </div>
        </div>
    );
}

function contains(arrays, obj) {
    var i = arrays.length;
    while (i--) {
        if (arrays[i].name === obj) {
            return i;
        }
    }
    return false;
}

function RadarEchart(props) {
    const indicatorname = [
        {name: '用户（总用户数）', max: 6500, color: '#000'},
        {name: '渠道（本网门店）', max: 16000, color: '#000'},
        {name: '资源（小区覆盖率）', max: 30000, color: '#000'},
    ];
    const result = {
        '用户（总用户数）': '',
        '渠道（本网门店）': '1010（家）',
        '资源（小区覆盖率）': '50%',
    };
    const data = [
        {
            value: [4200, 3000, 20000],
            name: '结果',
        },
    ];
    const option = {
        title: {
            text: '基础雷达图',
            show: false,
        },
        legend: {
            show: false,
        },
        radar: {
            // shape: 'circle',
            center: ['50%', '65%'],
            indicator: indicatorname,
            name: {
                textStyle: {
                    rich: {
                        a: {
                            align: 'left',
                            lineHeight: 10,
                        },
                        b: {
                            align: 'left',
                            padding: [25, 0, 0, 0],
                        },
                    },
                },
                formatter: function (name, index) {
                    return '{a|' + name + '}\n' + '{b|' + result[name] + '}';
                },
            },
            nameGap: 5,
        },
        series: [{
            name: '',
            type: 'radar',
            data: data,
            lineStyle: {
                color: '#a3b2e0',
            },
            symbolSize: 2,
        }],
    };
    return <ReactECharts option={option} style={{height: '250px'}} />;
}