var crypto = require('crypto');
var User = require('./user.js')
module.exports = function (app) {
    app.get('/', checkLogin);
    app.get('/', function (req, res) {
        res.render('index', {
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.get('/login', checkNotLogin)
    app.get('/login', function (req, res) {
        res.render('login', {
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    })
    app.post('/login', checkNotLogin)
    app.post('/login', function (req, res) {
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');
        var name = req.body.name;
        User.get(name, password, function (err, user) {
            if (!user) {
                req.flash('error', '登录失败');
                return res.redirect('/login');
            }
            console.log(user);
            req.session.user = user;
            req.flash('success', '登录成功');
            return res.redirect('/');
        })
    })
    app.get('/reg', checkNotLogin)
    app.get('/reg', function (req, res) {
        res.render('reg', {
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })
    })
    app.post('/login', checkNotLogin)
    app.post('/reg', function (req, res) {
        var name = req.body.name;
        var password = req.body.password;
        var passwordConfirm = req.body.passwordConfirm;
        if (password != passwordConfirm) {

            req.flash('error', '两次输入的密码不一致!');
            return res.redirect('/reg');
        }
        var md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');
        var newUser = new User({
            name: name,
            password: password,
        });
        User.checkUserName(newUser.name, function (err, user) {

            if (user) {

                req.flash('error', '用户名已存在');
                return res.redirect('/reg');
            }
            newUser.save(function (err, user) {
                if (err) {

                    req.flash('error', err);
                    return res.redirect('/reg');
                }

                req.session.user = user;
                req.flash('success', '注册成功!');
                res.redirect('/');
            })
        })
    })
    app.get('/logout', function (req, res) {
        if (req.session.user) {
            req.session.user = null;
        }
        return res.end('1');
    })

}


function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录!');
        return res.redirect('/login');
    }
    next();
}
function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录!');
        return res.redirect('back');
    }
    next();
}

