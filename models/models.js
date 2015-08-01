var path = require('path');
//Postgres: postgres://user:passwd@host:port/database
//SQLite: sqlite://:@:/

//var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

//var url = process.env.DATABASE_URL.match((.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
//var DB_name = (url[6]||null);
//var user    = (url[2]||null);
//var pwd     = (url[3]||null);
//var protocol= (url[1]||null);
//var dialect = (url[1]||null);
//var port    = (url[5]||null);
//var host    = (url[4]||null);
//var storage = process.env.DATABASE_STORAGE;

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
