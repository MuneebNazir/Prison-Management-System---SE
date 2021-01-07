var createError = require('http-errors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var prisonersRouter = require('./routes/prisoners');
var transferRequestsRouter = require('./routes/transferRequest');
var transferRequestPostRouter = require('./routes/transfers');
var transferListRouter = require('./routes/transfersList');
var complaintFormRouter = require('./routes/Complaint');
var fileComplaintRouter = require('./routes/fileComplaint');
var complaintsListRouter = require('./routes/complaintsList');
var crimeHistoryFormRouter = require('./routes/crimeRecordForm');
var transfersHandlerRouter = require('./routes/transferHandler');
var complaintsHandlerRouter = require('./routes/complaintsHandler');
var jailerInterfaceRouter = require('./routes/jailerInterface');
var jailOfficerInterfaceRouter = require('./routes/jailOfficerInterface');
var jailerPrisonersViewRouter = require('./routes/jailerPrisonersView');
var crimeRecordPostRouter = require('./routes/crimeRecordPost');
var crimeHistoryViewRouter = require('./routes/crimeHistory');
var prisonerFormRouter = require('./routes/prisonerAddForm');
var prisonerAddRouter = require('./routes/prisonerAdd');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/prisoners', prisonersRouter);
app.use('/transfersList', transferListRouter);
app.use('/Complaint', complaintFormRouter);
app.use('/Complaint', fileComplaintRouter);
app.use('/transferRequest', transferRequestsRouter);
app.use('/transferRequest', transferRequestPostRouter);
app.use('/complaintsList', complaintsListRouter);
app.use('/crimeRecordForm', crimeHistoryFormRouter);
app.use('/transfersHandler', transfersHandlerRouter);
app.use('/complaintsHandler', complaintsHandlerRouter);
app.use('/jailerInterface', jailerInterfaceRouter);
app.use('/jailOfficerInterface', jailOfficerInterfaceRouter);
app.use('/jailerPrisonersView', jailerPrisonersViewRouter);
app.use('/crimeRecordPost', crimeRecordPostRouter);
app.use('/crimeHistory', crimeHistoryViewRouter);
app.use('/addPrisoner', prisonerFormRouter);
app.use('/prisonerAdd', prisonerAddRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
