import express from 'express';

// 
const configureViewEngine = (app) => {
    app.use(express.static('../src/public'));
    app.set('view engine', 'ejs'); // định nghĩa sử dụng công cụ  để viết html với ejs
    app.set('views', './src/views'); // đinhj nghĩa nơi lưu trữ các file views
}

export default configureViewEngine;