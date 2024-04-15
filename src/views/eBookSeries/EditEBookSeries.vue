<template>
    <el-dialog :title="title" :visible="visible" :before-close="close">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
                <el-form-item label="状态" prop="status">
                        <template slot>
                            <!-- 编辑 -->
                            <el-button v-if="saveOrUpdate" style="cursor:pointer;" type="primary" @click="updateSeries()"
                                        size="small">{{ form.useful == false ? "启用" : "禁用" }}
                            </el-button>
                            <!-- 新增 -->
                            <el-button v-else style="cursor:pointer;" type="primary" @click="updateSeries()"
                                        size="small">{{ this.useful == false ? "启用" : "禁用" }}
                            </el-button>
                        </template>
                </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>

import { 
    addSeries, 
    updateSeries 
} from '@/api/modules/eBookSeries.js'

import { Toast } from 'vant';

export default {
    name: "editEBookSeries",
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
        },
    },
    data() {
        return {
            flag: false, //false = add  true = update
            form: {},
            flag: false,
            series: [],
            useful: true,
            saveOrUpdate: false,
            fileList: [],
            rules: {

            }
        }
    },
    mounted() {
        if (JSON.stringify(this.defaultFormData) == "{}") {
            //add
            this.flag = false
            this.saveOrUpdate = false
        } else {
            //edit
            this.form = JSON.parse(JSON.stringify(this.defaultFormData))
            console.log(this.form)
            this.flag = true
            this.saveOrUpdate = true
        }
    },
    methods: {
        close() {
            this.flag = false
            //emit
            this.$emit("close", this.flag)
        },
        // 启用禁用
        updateSeries() {
            if (!this.saveOrUpdate) {
                this.useful = !this.useful
                this.form.useful = this.useful
            }
            else {
                this.form.useful = !this.form.useful
            }
        },
        submit() {
            console.log("表单",this.form)
            console.log("新增或修改",this.saveOrUpdate)
            // let self = this;
            if (!this.saveOrUpdate) {
                if (this.isPetSeries) {
                    addSeries({
                        name: this.form.name,
                        useful: this.form.useful
                    }).then(res => {
                        console.log(res)
                        this.flag = true
                        this.$emit("close", this.flag)
                    })
                } 
            }
            else {
                    updateSeries({
                        id: this.form.id,
                        name: this.form.name,
                        useful: this.form.useful
                    }).then(res => {
                        console.log(res)
                        this.flag = true
                        this.$emit("close", this.flag)
                    })
                
            }
        }
    }
}
</script>

<style scoped>
/* 图片上传css */
.avatar-uploader /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    float: left;
    overflow: hidden;
    width: 90px;
    height: 90px;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}
.el-form-item__content {
    display: flex;

}
.img {
    width: 80px;
    height: 80px;
    display: block;
}

</style>