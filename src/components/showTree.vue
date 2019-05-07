
<template>
    <el-container style="height: 100%; border: 1px solid #eee" class="main-wrap">
        <el-header>
            <el-form label-idth="150px" inline>
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="`共${pages.children.length}个页面，选择查看`">
                            <el-select
                                v-model="curPage"
                                filterable
                                @change="handelPageChange"
                                multiple
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="page in pages.children"
                                    v-bind:key="page.name"
                                    :label="page.name"
                                    :value="page.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="`共${allComponentList.length}个组件，选择查看`">
                            <el-select
                                v-model="curComponent"
                                filterable
                                @change="handelComponentChange"
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="name in allComponentList"
                                    v-bind:key="name"
                                    :label="name"
                                    :value="name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-header>
        <el-main id="myChart" style="padding:0"></el-main>

        <el-footer></el-footer>
    </el-container>
</template>

<script>
import echarts from 'echarts';
import { treeMapOptionGen, getComponentsNameList } from '../utils/common-utils'
import axios from 'axios'
export default {
    data() {
        return {
            pages: {
                name: 'pages',
                children: []
            },
            allMap: {},
            all: [],
            components: {},
            curPage: [],
            curComponent: null
        }
    },
    watch: {

    },
    computed: {
        showPages() {
            let r = {
                ...this.pages
            }
            if (this.curPage.length) {
                r.children = this.pages.children.filter(i => {
                    return this.curPage.indexOf(i.name) > -1
                })
            }
            if (this.curComponent) {
                r = [this.allMap[this.curComponent]]
            }
            return r
        },
        allComponentList() {
            return getComponentsNameList(this.showPages)
        },
        // showComponentsList() {
        //     let r = typeof this.allMap === 'object' ? Object.keys(this.allMap) : []
        //     this.showPages.length ? r = r.filter()
        // }
    },
    mounted() {
        this.getData()
    },
    methods: {
        handelPageChange(v) {
            this.curComponent = null
            this.drawLine()
        },
        handelComponentChange(v) {
            // console.log('handelComponentChange')
            this.drawLine()
        },
        getData() {
            axios.get(`${window.location.origin}/getData`)
                .then(r => {
                    this.pages.children = r.data.pages.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1
                        }
                        if (a.name < b.name) {
                            return -1
                        }
                        return 0
                    })
                    this.allMap = r.data.allMap
                    this.all = Object.keys(this.allMap)
                    this.drawLine()
                })
        },

        drawLine() {
            let data = this.showPages
            // 基于准备好的dom，初始化echarts实例
            const myChart = echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.setOption(treeMapOptionGen(Array.isArray(data) ? data : [data]));
        },
    }
}
</script>

<style lang="scss" scoped>
.main-wrap /deep/ {
    .el-form-item {
        width: 100%;
        .el-form-item__content {
            width: calc(100% - 170px);
            .el-select {
                width: 90%;
            }
        }
    }
}
</style>

