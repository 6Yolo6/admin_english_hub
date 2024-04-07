<template>
    <el-dialog :title="title" :visible="visible" :before-close="close">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :required="true">
                <el-upload ref="upload" class="avatar-uploader" action="" list-type="picture-card" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :on-change="UploadImage" :before-upload="beforeUpload" :limit="1" :file-list="fileList" :auto-upload="false">
                    <img v-if="form.avatar" :src="form.avatar" class="img">
                    <div v-else style="width: 50px;">
                        <i class="el-icon-plus"></i>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="性别" prop="sex"> 
                <el-input v-model="form.sex" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="重置密码" prop="password">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="privilege">
                <template slot>
                        <el-button type="primary" v-if="form.isAdmin == 1" class="privilege">管理员{{ form.isBusiness == 1 ? "/商家": "" }}</el-button>
                        <el-button type="primary" v-else-if="form.isBusiness == 1" class="privilege">商家</el-button>
                        <el-button type="primary" v-else  class="privilege">普通用户</el-button>
                </template>
                <!-- <el-input v-model="form.privilege" autocomplete="off"></el-input> -->
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Toast } from 'vant'

import {
    update,
    uploadAvatar
} from '@/api/modules/user.js'

export default {
    name: "editUser",
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
            form: {},
            flag: false,
            saveOrUpdate: false,
            rules: {
                name: [{ required: true, message: "不能为空" },
                    //  {type: "email", message: "邮箱格式不正确"}
                ],
                value: [{ required: true, message: "不能为空", trigger: "blur" },
                    // {validator: validateTelephone, trigger: "blur"}
                ]

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
        //上传图片的方法
        UploadImage(file, filelist) {
            console.log("图片",file);
            uploadAvatar({
                file: file.raw
            }).then(res => {
                console.log("上传结果", res)
                this.form.avatar = res
            })
        },
        //移除图片功能
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        //预览图片功能
        handlePictureCardPreview(file) {
            console.log(file.url);
            // this.dialogVisible = true
            this.form.avatar = file.url
        },
        beforeUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        submit() {
            //  this.$refs.form.validate(valid => {
            //     if (valid) {
            console.log(this.form);
            let self = this;
            update({...this.form})
                .then(res => {
                    console.log(res)
                    self.flag = true
                    self.$emit("close", self.flag)
                    Toast("更新成功")
                })
                .catch(err => {
                    console.log(err)
                    self.flag = false
                    self.$emit("close", self.flag)
                })
            //     }
            //  })
        }
    }
}
</script>

<style scoped>
.privilege {
    float:left;
}
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