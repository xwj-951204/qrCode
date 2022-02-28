var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require("mysql");

//数据库连接
var conn = mysql.createConnection({
    host: 'yplearning.cn',
    user: 'testdb',
    password: 'testdb',
    port: '3306',
    database: 'testdb'
});

// 创建sql链接
conn.connect();

//刷新数据
router.get("/refresh", (req, res, next) => {
    const sql = "SELECT * FROM `test`"; // sql语句
    conn.query(sql, (err, result) => {
        if (err) {
            res.json({
                code: 500,
                msg: "SQL执行错误",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "查询成功",
                data: result // 查询结果
            })
        }
        //conn.destroy(); // 关闭sql链接
    })
})

//获取点检信息
router.get("/check/:num", (req, res, next) => {
    const sql = "SELECT `check_list` FROM `test` WHERE `num` = ?"; // sql语句
    const sqlParams = [req.params.num] // 动态参数
    conn.query(sql, sqlParams, (err, result) => {
        if (err) {
            res.json({
                code: 500,
                msg: "SQL执行错误",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "查询成功",
                data: result // 查询结果
            })
        }
        //conn.destroy(); // 关闭sql链接
    })
})

//添加数据
router.post("/insert", (req, res, next) => {
    let params = req.body;
    const sql = "INSERT INTO test (`num`, `name`, `age`, `other`) VALUES (?, ?, ?, ?)" //SQL语句
    const sqlParams = [params.num, params.name, params.age, params.other] // 动态参数
    conn.query(sql, sqlParams, (err, result) => {
        if (err) {
            res.json({
                code: 500,
                msg: "SQL执行错误",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "编辑成功",
                data: result
            })
        }
    })
})

//编辑点检参数
router.post("/insertCheckList/:num", (req, res, next) => {
    let checkText = JSON.stringify(req.body);
    const sql = "UPDATE `test` SET `check_list`=? WHERE `num`=?" //SQL语句
    const sqlParams = [checkText, req.params.num] // 动态参数
    conn.query(sql, sqlParams, (err, result) => {
        if (err) {
            res.json({
                code: 500,
                msg: "SQL执行错误",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "编辑成功",
                data: result
            })
        }
    })
})

//删除数据
router.get("/delete/:num", (req, res, next) => {
    const sql = "DELETE FROM `test` WHERE `test`.`num` = ?" //SQL语句
    const sqlParams = [req.params.num] // 动态参数
    conn.query(sql, sqlParams, (err, result) => {
        if (err) {
            res.json({
                code: 500,
                msg: "SQL执行错误",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "删除成功",
                data: result
            })
        }
    })
})


module.exports = router;