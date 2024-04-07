<template>
    <div class="login">
        <div class="content">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model.number="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.checkPass"
                        autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <div style="margin-top:20px">
                <router-link to="">权限不足？私下联系管理员</router-link>
            </div>
        </div>
    </div>
</template>
<script>

import { Toast } from 'vant';

import {
    login,
    register
} from '@/api/modules/user.js'

export default {
    name: 'backLogin',
    data() {
        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
            else
                callback()
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                password: '',
                checkPass: '',
                username: ''
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                username: [
                    { validator: checkUsername, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var data = {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    }
                    login(data).then(res => {
                        console.log(res)
                        // console.log(res.statusCode)
                        var user = res.data.user
                        if (res.statusCode == 200) {
                            if (user.isAdmin == 1) {
                                Toast("登录成功");
                                localStorage.setItem('username', user.username);
                                localStorage.setItem('token', res.data.token);
                                this.$router.push({ path: '/manageUser' });
                            }
                            else if (user.isAdmin == 0) {
                                Toast("权限不足，请联系管理员")
                            }
                        }
                        else if (res.statusCode == 600) {
                            Toast(res.message)
                            if (res.message == "用户名不正确")
                                this.ruleForm.username = ""
                            else if (res.message == "密码错误") {
                                this.ruleForm.password = ""
                                this.ruleForm.checkPass = ""
                            }
                        }
                    }).catch(err => {
                        console.log("error:", err);
                    })
                } else {
                    Toast('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.login {
    background-color: white;
    padding: 15px;
}

.content {
    margin: 0 auto;
    width: 300px;
}

.van-button--large {
    width: 70%;
}
</style>