<template>
    <el-dialog :title="title" :visible="visible" :before-close="close">
        <el-form ref="form" :model="form">
            <el-form-item label="书名" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="文件类型" prop="fileType">
                <el-select v-model="form.fileType" placeholder="Select" style="float: left;">
                    <el-option label="PDF" value="pdf"></el-option>
                    <el-option label="EPUB" value="epub"></el-option>
                </el-select>
                <el-upload class="upload-demo" ref="upload" action="" style="float: left;" :on-change="uploadBook"
                    :before-upload="beforeUpload" :on-preview="handlePreview" :file-list="fileList"
                    :on-remove="handleRemove" :before-remove="beforeRemove">
                    <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="系列" prop="seriesName">
                <!-- 新增 -->
                <template v-if="!this.saveOrUpdate">
                    <el-input v-model="form.seriesName"></el-input>
                </template>
                <!-- 编辑 -->
                <template v-else>
                    <el-select style="float:left" v-model="form.seriesName" placeholder="请选择" @change="change"
                        clearable>
                        <el-option v-for="series, index in seriesList" :label="series.name" :value="series.id"
                            :key="index">
                        </el-option>
                    </el-select>
                </template>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submitUpload">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>

import {
    uploadEBook,
    addEBook,
    updateEBook,
} from '@/api/modules/eBook.js'

import {
    getAllSeries
} from '@/api/modules/eBookSeries.js'

export default {
    name: 'editEBook',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "新增"
        },
        defaultFormData: {
            type: Object
        }
    },
    data() {
        return {
            flag: false, //false = add  true = update
            form: {
            },
            saveOrUpdate: false,
            rules: {
            }
        }
    },
    methods: {
        close() {
            this.flag = false
            //emit
            this.$emit("close", this.flag)
        },
        handlePreview(file) {
        console.log(file);
      },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        uploadBook(file, fileList) {
            console.log("上传文件", file);
            // 提取文件名
            let fileName = file.name;
            let match = fileName.match(/(.+)(\.pdf|\.epub)$/i);
            if (match && match[1]) {
                this.form.title = match[1];
                // 根据文件扩展名设置 form.fileType 的值
                this.form.fileType = match[2].substring(1).toLowerCase();
            }
            console.log("提取文件名", this.form.title);
            console.log("提取文件类型", this.form.fileType);
            uploadEBook({
                file: file.raw,
                fileType: this.form.fileType
            }).then(res => {
                console.log("上传结果", res)
                this.form.filePath = res
            })
        },
        submitUpload() {
            console.log("表单", this.form)
            // 判断是新增还是修改
            if (!this.saveOrUpdate) {
                // 新增
                addEBook(this.form).then(res => {
                    console.log("新增结果", res)
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.flag = true
                    this.$emit("close", this.flag)
                    
                })
            } else {
                // 修改
                updateEBook(this.form).then(res => {
                    console.log("修改结果", res)
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.flag = true
                    this.$emit("close", this.flag)
                })
            }
        },
        beforeUpload(file) {
            const isPDForEPUB = file.type === 'application/pdf' || file.type === 'application/epub';
            if (!isPDForEPUB) {
                this.$message.error('只能上传pdf或epub文件');
                // Toast.fail('只能上传pdf或epub文件');
            } 
            return isPDForEPUB;
        }
    },
    mounted() {
        getAllSeries().then(res => {
            console.log("所有系列", res);
            if (res.statusCode == '200') {
                this.seriesList = res.data;
                if (JSON.stringify(this.defaultFormData) == "{}") {
                    //add
                    this.flag = false
                    this.saveOrUpdate = false
                    console.log("新增", !this.saveOrUpdate);
                } else {
                    //edit
                    this.form = JSON.parse(JSON.stringify(this.defaultFormData))
                    console.log(this.form)
                    this.flag = true
                    this.saveOrUpdate = true
                }
            }
        })
        
    },
};
</script>

<style scoped>
/* Your component styles here */
</style>
</div>