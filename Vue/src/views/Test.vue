<template>
<HeadRouter />
<div>
    <div class="container">
        <el-row class="mgb20">
            <el-col :span="16">
                <el-button type="primary" round @click="handleInsert">添加数据</el-button>
                <el-button type="primary" round @click="handleUpdate">刷新数据</el-button>
            </el-col>
            <el-col :span="8">
                <el-button style="float:right" type="danger" @click="test">清空数据</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" border>
            <el-table-column prop="num" label="num" width="80" align="center"></el-table-column>
            <el-table-column prop="name" label="name" align="center">
                <template #default="scope">
                    <a :href=client_host+scope.row.num target="_blank">{{scope.row.name}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="age" label="age" align="center"></el-table-column>
            <el-table-column label="other" align="center" v-if="false">
                <template #default="scope">
                    <a :href=client_host+scope.row.num target="_blank">{{scope.row.other}}</a>
                </template>
            </el-table-column>
            <el-table-column label="other" :width="150" align="center">
                <template #default="scope">
                    <vue-qr :text=client_host+scope.row.num :size="100" :margin="0" :logoSrc="require('@/assets/logo.png')"></vue-qr>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template #default="scope">
                    <el-button type="text" icon="Edit" @click="handleEdit(scope.row)">编辑点检信息</el-button>
                    <el-button type="text" icon="Delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</div>

<!-- 编辑弹出框 -->
<el-dialog title="上传服务" v-model="editVisible" width="500px">
    <el-form label-width="130px">
        <el-form-item label="num">
            <el-input v-model="editData.num" />
        </el-form-item>
        <el-form-item label="name">
            <el-input v-model="editData.name" />
        </el-form-item>
        <el-form-item label="age">
            <el-input v-model="editData.age" />
        </el-form-item>
        <el-form-item label="other">
            <el-input v-model="editData.other" />
        </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button type="primary" @click="handleInsertPost">确 定</el-button>
            <el-button @click="editVisible = false">取 消</el-button>
        </span>
    </template>
</el-dialog>

<!-- 点检信息弹出框 -->
<el-dialog title="点检信息" v-model="checkListVisible" width="500px">
    <div :model="checkList">

        <div v-for="(part, index) in checkList.parts" :key="part.key" :prop="'parts.' + index + '.part'">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <el-input v-model="part.part" size="large" style="width:250px">
                            <template #prepend>设备名称：</template>
                        </el-input>
                        <div>
                            <el-button icon="Plus" circle @click="addPart(index)"></el-button>
                            <el-button icon="Minus" circle @click="deletePart(index)" v-if="checkList.parts.length!=1"></el-button>
                        </div>
                    </div>
                </template>
                <el-table :data="part.contents" border>
                    <el-table-column label="点检内容" width="120" align="center">
                        <template #default="scope">
                            <el-input v-model="scope.row.content" />
                        </template>
                    </el-table-column>
                    <el-table-column label="点检标准" align="center">
                        <template #default="scope">
                            <el-input v-model="scope.row.standard" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100" align="center">
                        <template #default="scope">
                            <el-button icon="Plus" circle size="small" @click="addContent(part.contents,scope.$index)"></el-button>
                            <el-button icon="Minus" circle size="small" @click="deleteContent(part.contents,scope.$index)" v-if="part.contents.length!=1"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>

    </div>

    <template #footer>
        <span class="dialog-footer">
            <el-button type="primary" @click="handleEditPost">确 定</el-button>
            <el-button @click="checkListVisible = false">取 消</el-button>
        </span>
    </template>
</el-dialog>
</template>

<script>
import HeadRouter from '@/components/HeadRouter.vue'
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import {
    ref
} from "vue";
import {
    ElNotification,
    ElMessage,
    ElMessageBox
} from "element-plus";
import axios from 'axios';

export default {
    name: "Home",
    components: {
        vueQr,
        HeadRouter
    },
    setup() {
        const client_host = "http://" + window.location.host + "/#/check/";
        const server_host = "192.168.14.100:3000";
        const select_num = ref(0);

        const tableData = ref([]);
        const editVisible = ref(false);
        const checkListVisible = ref(false);
        const editData = ref({
            num: '',
            name: '',
            age: '',
            other: ''
        });
        const checkList = ref({
            parts: [{
                part: '',
                contents: [{
                    content: '',
                    standard: '',
                }, ],
            }, ],
        });

        const successBox = (msg) => {
            ElNotification({
                title: '成功',
                message: msg,
                type: 'success',
            })
        };
        const errorBox = (msg) => {
            ElNotification({
                title: '错误',
                message: msg,
                type: 'error',
            })
        };

        return {
            client_host,
            server_host,
            select_num,

            tableData,
            editVisible,
            checkListVisible,
            editData,
            checkList,

            successBox,
            errorBox,
        }
    },
    methods: {
        //主页面主要控件****************************************************//
        handleUpdate() {
            var that = this
            axios
                .get('http://' + that.server_host + '/checkList/refresh')
                .then(function (response) {
                    that.tableData = response.data.data
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        },
        handleInsert() {
            this.editData = {
                num: '',
                name: '',
                age: '',
                other: ''
            }
            this.editVisible = true
        },
        handleEdit(row) {
            this.select_num = row.num
            if (row.check_list == null) {
                this.checkList = {
                    parts: [{
                        part: '',
                        contents: [{
                            content: '',
                            standard: '',
                        }, ],
                    }, ],
                };
            } else {

                this.checkList = JSON.parse(row.check_list)
            }
            this.checkListVisible = true
        },
        handleDelete(row) {
            ElMessageBox.confirm("设备ID:【" + row.num + "】确定要删除吗？", "提示", {
                    type: "warning",
                })
                .then(() => {
                    var that = this
                    axios
                        .get('http://' + that.server_host + '/checkList/delete/' + row.num)
                        .then(function (response) {
                            if (response.data.code != '200') {
                                ElMessage.error("删除失败");
                            } else {
                                ElMessage.success("删除成功");
                                that.handleUpdate();
                            }
                        })
                        .catch(function (error) { // 请求失败处理
                            ElMessage.error("请求失败");
                        });
                })
                .catch(() => {});
        },

        //添加数据页面控件**************************************************//
        handleInsertPost() {
            var that = this
            axios.post('http://' + that.server_host + '/checkList/insert', that.editData)
                .then(function (response) {
                    that.handleUpdate();
                    that.editVisible = false;
                    ElMessage.success("添加成功!");
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        //编辑点检信息页面控件
        addPart(index) {
            var new_part = {
                part: '',
                contents: [{
                    content: '',
                    standard: '',
                }, ],
            }
            this.checkList.parts.splice(index + 1, 0, new_part);
        },
        deletePart(index) {
            this.checkList.parts.splice(index, 1);
        },
        addContent(contents, index) {
            var new_content = {
                content: '',
                standard: '',
            }
            contents.splice(index+1,0,new_content)
        },
        deleteContent(contents,index){
            contents.splice(index,1)
        },
        handleEditPost(){
            var that = this
            axios.post('http://' + that.server_host + '/checkList/insertCheckList/' + that.select_num, that.checkList)
                .then(function (response) {
                    that.handleUpdate();
                    that.checkListVisible = false;
                    ElMessage.success("点检信息编辑成功!");
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        test() {
            console.log('http://' + this.server_host + '/checkList/refresh')
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.handleUpdate();
        });
    }
};
</script>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-card {
    text-align: left;
    margin-bottom: 2px;
}
</style>
