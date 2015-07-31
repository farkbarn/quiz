var path = require('path');

// cargar model ORM
var Sequelize = require('sequelize');

// usar BBDD SQLite_3
var sequelize = new Sequelize(null,null,null,
	{dialext: "sqlite", storage: "quiz.sqlite"}
);

// Import definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //exportando definición de tabla quiz

// sequelize.sync() crea e inicializa la tabla de preguntas de DB
sequelize.sync().success(function(){
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if (count === 0){
			// la tabla se inicializa solo si está vacía
			Quiz.create({ pregunta: 'Capital de Italia',
				      respuesta: 'Roma'
			})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});
