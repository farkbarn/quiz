var path = require('path');
//Postgres: postgres://user:passwd@host:port/database
//SQLite: sqlite://:@:/
//var dir = 'postgres://reyyzwfkqqeuhp:qacWJPWcJHHAsh_P_BsR3G_xCT@ec2-54-83-10-210.compute-1.amazonaws.com:5432/d2qbmejr0esq4p';
//var DATABASE_URL = 'postgres://reyyzwfkqqeuhp:qacWJPWcJHHAsh_P_BsR3G_xCT@ec2-54-83-10-210.compute-1.amazonaws.com:5432/d2qbmejr0esq4p';

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

//var url = process.env.DATABASE_URL.match((.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
//var url = process.env.DATABASE_URL.match(dir);
//var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);


tipo,user,pass,host,puerto,db
postgres
:
//
ncikxqbimskipr
:
4OfkxvJIR3t4hu67nrhCpzkAVb
@
ec2-54-83-10-210.compute-1.amazonaws.com
:
5432
/
d6eekqli3k37pg

var DB_name = (url[6]||null);
var user    = (url[2]||null);
var pwd     = (url[3]||null);
var protocol= (url[1]||null);
var dialect = (url[1]||null);
var port    = (url[5]||null);
var host    = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//.success(function(){console.log(url[6])});
console.log(url[6]);

// cargar model ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres	
var sequelize = new Sequelize (DB_name, user, pwd,
	{dialect:  protocol,
	 protocol: protocol,
	 port:	   port,
	 host:     storage, //solo SQLite (.env)
	 omitNull: true	// solo Postgres
	}
);

// usar BBDD SQLite_3
//var sequelize = new Sequelize(null,null,null,
//	{dialect: "sqlite", storage: "quiz.sqlite"}
//);

// Import definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

// mantener de la versión anterior
//var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //exportando definición de tabla quiz

// sequelize.sync() crea e inicializa la tabla de preguntas de DB
sequelize.sync().success(function() {
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count){
		if(count === 0){
			// la tabla se inicializa solo si está vacía
			Quiz.create({ pregunta: 'Capital de Italia',
				      respuesta: 'Roma'
			})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});
