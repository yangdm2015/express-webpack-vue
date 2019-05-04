export function treeMapOptionGen(datas) {
    return {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: seriesGen(datas)
    }
}

function seriesGen(datas) {
    return datas.map(data => ({
        type: 'tree',

        data: [data],

        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',

        symbolSize: 7,

        label: {
            normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 12
            }
        },

        leaves: {
            label: {
                normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                }
            }
        },

        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
    }))
}