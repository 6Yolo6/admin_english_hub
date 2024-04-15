<template>
    <el-main class="manageEBook">
        <div>
            <el-form ref="searchForm" :model="searchForm" :inline="true" class="formItem" label-width="80px">
                <el-col :xl="6" :md="8" :sm="24">
                    <el-form-item label="书名" prop="title">
                        <el-input placeholder="请输入书名" v-model="searchForm.username" clearable></el-input>
                    </el-form-item>
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
                <el-table-column prop="title" label="书名" align="center" width="150"></el-table-column>
                <el-table-column prop="author" label="作者" align="center" width="150"></el-table-column>
                <el-table-column prop="fileType" label="文件类型" align="center" width="80"></el-table-column>
                <el-table-column prop="filePath" label="查看文件" align="center" width="100">
                    <template slot-scope="{ row }">
                        <el-button type="text" @click="previewFile(row.filePath)">查看文件</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="seriesName" label="系列" align="center" width="100"></el-table-column>
                <el-table-column prop="createTime" label="添加时间" align="center" width="200">
                    <template slot-scope="{ row }">
                        {{ row.createTime | formatDate }}
                        <!-- {{row.createTime}} -->
                    </template>
                </el-table-column>
                <!-- 更新时间 -->
                <el-table-column prop="updateTime" label="更新时间" align="center" width="200">
                    <template slot-scope="{ row }">
                        {{ row.updateTime | formatDate }}
                        <!-- {{row.createTime}} -->
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

        <EditEBook :title="title" :visible="visible" v-if="visible" :defaultFormData="defaultFormData" @close=close>
        </EditEBook>
    </el-main>
</template>

<script>
import EditEBook from './EditEBook.vue';
import PageTable from '@/components/PageTable.vue';

import { 
    getAllEBook
} from '@/api/modules/eBook.js';

export default {
    name: 'manageEBook',
    components: { PageTable, EditEBook },
    data() {
        return {
            title: "新增",
            visible: false,
            orderId: '',
            ids: '',
            searchForm: {
                username: '',
            },
            defaultFormData: {},
        }
    },
    filters: {
        formatDate(value) {
            const date = new Date(value);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
    },
    methods: {
        previewFile(filePath) {
            window.open(filePath, '_blank');
        },
        search() {
            this.$refs.dataTable.loadTableData('reload')
        },
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
            // this.del(this.ids)
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
        add() {
            this.visible = true
            this.defaultFormData = {}
            
        },
        edit(obj) {
            this.visible = true
            this.title = "编辑"
            this.defaultFormData = obj
            console.log("编辑", this.defaultFormData);
        },
        loadTableData(filter, callback) {
            getAllEBook({
                pageNum: filter.pageNum,
                pageSize: filter.pageSize,
            }).then(res => {
                if (res.statusCode == 200) {
                    let data = {
                        data: res.data.records,
                        total: res.data.total
                    }
                    callback(data)
                }
                else if (res.statusCode == 401) {
                    Toast("token过期");
                    this.$router.push('backLogin');
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
};
</script>

<style scoped>
/* Your component styles here */
</style></div>