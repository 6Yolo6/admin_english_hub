<template>
    <el-main class="manageEBookSeries">
        <div>
            <el-form ref="searchForm" :model="searchForm" :inline="true" class="formItem" label-width="80px">
                <el-col :xl="6" :md="8" :sm="24">
                    <el-button style="cursor:pointer;" type="primary" @click="changeCate()"
                                size="small">{{ isPetCate == true ? "宠物分类" : "周边分类" }}
                            </el-button>
                </el-col>
                
                <el-col :xl="6 || 24" :md="8 || 24" :sm="24">
                    <el-form-item>
                        <div :style="{ float: 'right', overflow: 'hidden' } || {}">
                            <el-button icon="el-icon-search" type="primary" @click="search">搜索</el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-form>
        </div>
        <div>
            <el-button type="primary" @click="add">新增</el-button>
            <el-button type="primary" @click="delAll">批量删除</el-button>
        </div>
        <pageTable @load-table-data="loadTableData" ref="dataTable" @selection-change="selectionChange" row-key="id">
            <template slot="tb-columns">
                <el-table-column prop="name" label="名称" align="center" width="80">
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-button style="cursor:pointer;" type="primary"
                                size="small">{{ scope.row.useful == true ? "已启用" : "已禁用" }}</el-button>
                            
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button> ｜
                        <el-button @click="delOne(scope.row.id)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </template>
        </pageTable>

        <EditEBookSeries :title="title" :visible="visible" v-if="visible" :defaultFormData="defaultFormData" @close=close>
        </EditEBookSeries>
    </el-main>
</template>

<script>


import EditEBookSeries from "./EditEBookSeries.vue"
import PageTable from '@/components/PageTable.vue'

import {
    getPageSeries,
} from '@/api/modules/eBookSeries.js'

export default {
    name: "manageSeries",
    components: { PageTable, EditEBookSeries },
    data() {
        return {
            title: "新增",
            visible: false,
            visible1: false,
            ids: '',
            searchForm: {
                name: '',
            },
            reason: '',
            defaultFormData: {},
            isPetCate: true,
        }
    },
    methods: {
        selectionChange(selection) {
            //selection表示选中的记录 array
            var aryIds = []
            for (var item of selection) {
                aryIds.push(item.id)
            }
            this.ids = aryIds.join(",")
        },
        delAll() {
            if (this.ids.length <= 0) {
                this.$message({
                    message: '请先选择记录',
                    type: 'warning'
                });

                return
            }
            this.del(this.ids)
        },
        delOne(id) {
            this.del(id)
        },
        del(ids) {
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //点击确认的时候 触发
                
            }).catch(() => {
                //点击取消的时候触发         
            });
        },
        close(val) {
            this.visible = false
            if (val) {
                //reload
                this.$refs.dataTable.loadTableData('reload')
                //this.$refs.dataTable = document.getElementById('dataTable')
            }
        },
        close1(val) {
            this.visible1 = false
            if (val) {
                //reload
                this.$refs.dataTable.loadTableData('reload')
                //this.$refs.dataTable = document.getElementById('dataTable')
            }
        },
        add() {
            this.visible = true
            this.title = "新增分类"
            this.defaultFormData = {}
        },
        edit(obj) {
            this.visible = true
            this.title = "编辑分类"
            console.log(obj);

            this.defaultFormData = obj

        },
        loadTableData(filter, callback) {

                getPageSeries({
                    pageNum: filter.pageNum,
                    pageSize: filter.pageSize,
                })
                    .then(res => {
                        console.log(res.data, "分页系列");
                        let data = {
                            data: res.data.records,
                            total: res.data.total
                        }
                        callback(data)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            
        }
    }
}
</script>


<style scoped>
.manageEBookSeries {
    min-height: 1080px
}
</style>