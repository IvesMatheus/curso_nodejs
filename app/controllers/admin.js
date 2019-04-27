module.exports.formulario_inclusao_noticia = function (application, req, res) {
    res.render("admin/form_add_noticia", { validacao: {}, noticia: {}});
};

module.exports.noticias_salvar = function (application, req, res) {
    // recupera informações enviadas via POST
    const noticia = req.body;

    req.assert('titulo', 'Título não pode ser vazio').notEmpty();
    req.assert('resumo', 'Resumo não pode ser vazio').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor', 'Autor não pode ser vazio').notEmpty();
    req.assert('data_noticia', 'Data não pode ser vazia').notEmpty();
    req.assert('noticia', 'Notícia não pode ser vazia').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.render("admin/form_add_noticia", { validacao : erros, noticia });

        return;
    }

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
};
