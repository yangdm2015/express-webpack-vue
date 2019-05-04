
<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-header>
            <el-form labelWidth="90">
                <el-form-item :label="`共${pages.children.length}个页面，选择查看`">
                    <el-select
                        v-model="curPage"
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
                <el-form-item :label="`共${all.length}个组件，选择查看`">
                    <el-select
                        v-model="curComponents"
                        @change="handelComponentChange"
                        multiple
                        clearable
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="name in all"
                            v-bind:key="name"
                            :label="name"
                            :value="name"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main id="myChart"></el-main>

        <el-footer></el-footer>
    </el-container>
</template>

<script>
import echarts from 'echarts';
import { treeMapOptionGen } from '../utils/common-utils'
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
            curComponents: []
        }
    },
    watch: {

    },
    mounted() {
        this.getData()
    },
    methods: {
        handelPageChange(v) {
            let d = {
                name: 'pages',
                children: this.pages.children.filter(i => {
                    return v.indexOf(i.name) > -1
                })
            }
            console.log('d = ', d)
            this.drawLine(d)
        },
        handelComponentChange(v) {
            let d = v.reduce((prev, cur) => {
                prev.push(this.allMap[cur])
                return prev
            }, [])
            this.drawLine(d)
        },
        getData() {
            axios.get(`${window.location.origin}/getData`)
                .then(r => {
                    this.pages.children = r.data.pages
                    this.allMap = r.data.allMap
                    this.all = Object.keys(this.allMap)
                    this.drawLine(this.pages)
                })
        },

        drawLine(data) {
            // 基于准备好的dom，初始化echarts实例
            const myChart = echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.setOption(treeMapOptionGen(Array.isArray(data) ? data : [data]));
        },
    }
}
</script>

<style>
</style>
