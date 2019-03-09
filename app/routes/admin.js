module.exports = function(application){
	application.get('/formulario_inclusao_noticia', function(req, res){
		res.render("admin/form_add_noticia");
	});

	application.post('/noticias/salvar', function(req, res){
		// recupera informações enviadas via POST
		const noticia = req.body;

		// recupera conexão como banco de dados
		var connection = application.config.dbConnection();
		//recupera model que possui métodos de acesso a BD
		var noticiasModel = application.app.models.noticiasModel;

		noticiasModel.salvarNoticia(noticia, connection, function(error, result){
			// método redireciona pra outra página do projeto.
			// Assim evita de ao usuário clicar em F5, reenvie o formulário,
			// fazendo uma nova inserção no BD
			res.redirect('/noticias');
		});
	});
}

