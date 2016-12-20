var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

// expose node_modules to client app
// app.use(express.static(__dirname + "/node_modules"));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());

// Do we need this?
app.use(require('stylus').middleware(path.join(__dirname, '.')));

app.use(express.static(path.join(__dirname, './src')));
// app.use('*', function(req,res) {
//   res.send(path.join(__dirname,'src/index.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


// app.set('port', process.env.PORT || 4244);

app.listen(4444);
module.exports = app;
