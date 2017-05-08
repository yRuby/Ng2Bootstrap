export class EchartDataTemlate {

    public getPieDataTemplate(): any {

        return {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: 'xxx',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],

                    data: [
                        //    {value:40, name:'直接访问'},
                        //    {value:30, name:'搜索'},
                        //    {value:30, name:'外链'},

                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }

    public getBarOptionTemplate(): any {
        return {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
                    dataView: { show: false, readOnly: false },
                    magicType: { show: false, type: ['line', 'bar'] },
                    restore: { show: false },
                    saveAsImage: { show: false }
                }
            },
            legend: {
                data: ['以往独立访客数量']
            },
            xAxis: [
                {
                    type: 'category',
                    data: []
                    //data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '立访客数量',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} '
                    }
                }

            ],
            series: [
                {
                    name: '以往独立访客数量',
                    type: 'bar',
                    data: []
                    //data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                }

            ]
        };
    }

    public getLineOptionTemplate(): any {
        return {
            title: {
                text: 'PV,UV走势'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['PV', 'UV']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
                    //data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'PV',
                    type: 'line',
                    stack: '总量',
                    data: []
                    //data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'UV',
                    type: 'line',
                    stack: '总量',
                    data: []
                    //data: [220, 182, 191, 234, 290, 330, 310]
                }

            ]
        };

    }
}