<template>
<div :model="checkList" ref="checkList">

    <div v-for="(part, index) in checkList.parts" :key="part.key" :prop="'parts.' + index + '.part'">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>{{part.part}}</span>
                </div>
            </template>
            <el-row class="mgb20">
                <div v-for="(content) in part.contents" :key="content.key">

                    <span>{{content.content}}</span>
                    <br>
                    <el-col :span="7">
                        <el-input disabled v-model="content.standard" />
                    </el-col>
                    <el-col :span="8">
                        <el-input v-model="content.value" />
                    </el-col>
                    <el-col :span="10">
                        <el-radio-group v-model="content.status" v-if="content.status">
                            <el-radio-button :label="true">正常</el-radio-button>
                            <el-radio-button :label="false">异常</el-radio-button>
                        </el-radio-group>
                        <el-radio-group v-model="content.status" v-if="!content.status" fill="#F56C6C">
                            <el-radio-button :label="true">正常</el-radio-button>
                            <el-radio-button :label="false">异常</el-radio-button>
                        </el-radio-group>
                    </el-col>

                </div>
            </el-row>

        </el-card>
    </div>

</div>

<span class="dialog-footer">
    <el-button type="primary" icon="Check">确 定</el-button>
    <el-button @click="handleClear" icon="RefreshLeft">清 空</el-button>
</span>
</template>

<script>
import {
    ref,
    reactive
} from "vue";
import {
    ElNotification,
    ElMessage,
    ElMessageBox
} from "element-plus";
import axios from 'axios';

export default {
    name: "check",
    data() {
        return {
            checkList: {
                parts: [{
                    part: '',
                    contents: [{
                        content: '',
                        standard: '',
                        value: '',
                        status: '',
                    }, ],
                }, ],
            },
        }
    },
    methods: {
        checkListUpdate() {
            var that = this
            axios
                .get('http://192.168.14.100:3000/checkList/check/' + this.$route.params.num)
                .then(function (response) {
                    console.log(JSON.parse(response.data.data[0].check_list))
                    that.checkList = JSON.parse(response.data.data[0].check_list)

                    for (var i = 0; i < that.checkList.parts.length; i++) {

                        for (var j = 0; j < that.checkList.parts[i].contents.length; j++) {
                            that.checkList.parts[i].contents[j]["value"] = ""
                            that.checkList.parts[i].contents[j]["status"] = true
                        }
                    }
                    console.log(that.checkList)

                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        },
        handleClear() {
            this.checkListUpdate()
        },

    },
    mounted() {
        this.checkListUpdate()
    }
};
</script>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
}

.box-card {
    text-align: left;
    margin-bottom: 2px;
}

.error {
    background: #2c3e50;
}
</style>
