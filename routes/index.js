var express = require('express'),
    bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var users = mongoose.Schema({
    name: String,
    password: String,
    subjects: [{type: Schema.ObjectId ,ref:'subjects'}],
    titration:String
});
var subjects = mongoose.Schema({
    name: String,
    users:[{type: Schema.ObjectId ,ref:'users'}],
    when:String
});
mongoose.connect("mongodb://localhost:27017/users", function(err) {
    if(!err) {
        console.log("We are connected")
    }
});
var Usuario = mongoose.model('users', users);
var Subject = mongoose.model('subjects', subjects);
var u;
app.use(express.static('public'));
app.use(bodyParser.json());
app.put('/updsub', function (req, res) {
    Usuario.find({name: req.body.name}, function (err, usuario) {
        u = usuario;
            Subject.update({name: req.body.subject}, {$push: {users: u[0]._id}}, function (err, subj) {
                console.log(subj);
            });
    });
    Subject.find({name:req.body.subject},function (err, subj) {
        Usuario.update({name: req.body.name}, {$push: {subjects: subj[0]._id}}, function (err, usr) {
        })
    })
});
app.post('/detailsubj',function (req, res) {
    Subject.find({name:req.body.name},function (err,resp) {
        res.send(resp);
    })

});

app.post('/userdetail',function (req, res) {
    var subjList=[];
    Usuario.find({name:req.body.name},function (err, usuario) {
        Subject.populate(usuario,{path:'subjects'},function (err, result) {
            for (var i = 0; i < result[0].subjects.length; i++) {
                subjList.push({name: result[0].subjects[i].name, when: result[0].subjects[i].when});
            }
            res.send({user:usuario,subjects:subjList});
        })
    });

});

app.post('/addSubj',function (req,res) {

    s=new Subject({name:req.body.name,when:req.body.when});
    s.save().then(function () {});

});


app.post('/push', function (req, res) {

        Subject.find({name:req.body.subject},function (err, subject) {
            u=new Usuario({name:req.body.name,password:req.body.password,subjects:subject[0]._id,titration:req.body.title});
            u.save().then(function(){
                Usuario.find({name: req.body.name}, function (err, usuario) {
                    u = usuario;
                    console.log(usuario);
                    Subject.update({name: req.body.subject}, {$push: {users: u[0]._id}}, function (err, subj) {
                        console.log(subj);
                    });
            });
        });

    });
    res.send('Got a POST request')
});
app.post('/userssubj', function (req, res) {
    var subjList=[];
    var name=req.body.name;
    Usuario.find({titration: name},function(err,usuarios){
            for (var i = 0; i < usuarios.length; i++) {
                subjList.push({name: usuarios[i].name,password:usuarios[i].password,titration:usuarios[i].titration});
            }
            res.send(subjList);
        });
});
app.post('/login', function (req, res) {
        Usuario.find({name:req.body.name,password:req.body.password}).then(function(response){
            res.send(response[0]);
        });
});
app.put('/update', function (req, res) {
    var userList=[];
    Usuario.findOneAndUpdate({name:req.body.name},{password:req.body.new}).then(function () {
        Usuario.find(function (err, usuarios) {
            for (var i = 0; i < usuarios.length; i++) {
                userList.push({name: usuarios[i].name, password: usuarios[i].password});
            }
            res.send(userList);

        });
    })
});


app.delete('/delete', function (req, res) {

        Usuario.findOneAndRemove({name:req.body.name,password:req.body.password}, function (err, user) {

             var userList = [];
             Usuario.find(function (err,usuarios) {
                 for(var i = 0; i< usuarios.length;i++){
                     userList.push({name: usuarios[i].name, password: usuarios[i].password});
                 }
                 res.send(userList);

             });
    });
});
app.get('/all', function (req,res) {
    var users = [];
    Usuario.find({},null,{sort:{name:1}},function(err,usuarios){
        for (var i = 0; i < usuarios.length; i++) {
            users.push({name: usuarios[i].name, password: usuarios[i].password,titration:usuarios[i].titration});
        }
        res.send(users);
    });
});
app.get('/subjects', function (req,res) {
    var users = [];
    Subject.find({},null,{sort:{name:1}},function(err,subj){
        for (var i = 0; i < subj.length; i++) {
            users.push({name:subj[i].name,l:subj[i].users.length});
        }
        users.sort(function(a, b){
            return a.l-b.l
        });
        res.send(users);
    });
});
app.get('/filterdb/:letter', function (req, res) {
    var subjList=[];
    var letter=req.params.letter;
    Subject.find({"name":{"$regex": letter} },function (err, us) {
        for (var i = 0; i < us.length; i++) {
            subjList.push({name: us[i].name,l:us[i].users.length});
        }
        res.send(subjList);
    });
});

app.listen(3500, function () {
    console.log('App listening on port 3500!!')
});

