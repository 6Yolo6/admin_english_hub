<template>
    <el-main class="manageOrder">
        <div>
            <el-form ref="searchForm" :model="searchForm" :inline="true" class="formItem" label-width="80px">
                <el-col :xl="6" :md="8" :sm="24">
                    <el-form-item label="用户名" prop="title">
                        <el-input placeholder="请输入用户名" v-model="searchForm.username" clearable></el-input>
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
                <el-table-column prop="username" label="用户名" align="center" width="120"></el-table-column>
                <el-table-column label="头像" align="center" width="100">
                    <template slot-scope="{ row }">
                        <img :src="row.avatar" alt="头像" style="width: 50px; height: 50px;">
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别" align="center" width="60"></el-table-column>
                <el-table-column prop="email" label="邮箱" align="center" width="250"></el-table-column>
                <el-table-column prop="privilege" label="权限" align="center" width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isAdmin == 1">管理员</div>
                        <div v-else>普通用户</div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="注册时间" align="center" width="350">
                    <template slot-scope="{ row }">
                        {{ row.createTime | formatDate }}
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

        <EditUser :title="title" :visible="visible" v-if="visible" :defaultFormData="defaultFormData" @close=close>
        </EditUser>
    </el-main>
</template>

<script>

import EditUser from "./EditUser"
import PageTable from '../PageTable'

import {
    getAll,
} from '@/api/modules/user.js'

export default {
    name: "manageUser",
    components: { PageTable, EditUser },
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
                // deleteUser({
                //     ids: ids
                // }).then(res => {
                //     //reload
                //     this.$refs.dataTable.loadTableData('reload')
                // }).catch(err => {
                //     console.log(err)
                // })
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
            // this.visible = true
            // this.defaultFormData = {}
        },
        edit(obj) {
            this.visible = true
            this.title = "编辑"
            this.defaultFormData = obj
            console.log("编辑", this.defaultFormData);
        },
        loadTableData(filter, callback) {
            getAll({
                pageNum: filter.pageNum,
                pageSize: filter.pageSize,
            }).then(res => {
                // console.log("所有用户",res);
                if (res.statusCode == 200) {
                    let data = {
                        data: res.data.records,
                        total: res.data.total
                    }
                    callback(data)
                }
                else if (res.statusCode == 414) {
                    Toast("token过期");
                    this.$router.push('backLogin');
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>


<style scoped>
.manageOrder {
    min-height: 1080px
}
</style>