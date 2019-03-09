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
		var noticiasModel = new application.app.models.NoticiasDAO(connection);

		noticiasModel.salvarNoticia(noticia, function(error, result){
			// método redireciona pra outra página do projeto.
			// Assim evita de ao usuário clicar em F5, reenvie o formulário,
			// fazendo uma nova inserção no BD
			res.redirect('/noticias');
		});
	});
}

