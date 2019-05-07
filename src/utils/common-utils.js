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

// 遍历pages数组，获取所有的引用到的组件名称
export function getComponentsNameList(page) {
    // console.log('pages = ', pages)
    let r = [page.name]
    if (Array.isArray(page.children) && page.children.length) {
        page.children.forEach(p => {
            // console.log('p = ', p)
            if (Array.isArray(p.children) && p.children.length) {
                r = r.concat(getComponentsNameList(p))
            } else {
                r.push(p.name)
            }
        })
    }
    return [...(new Set(r))].sort()
}

