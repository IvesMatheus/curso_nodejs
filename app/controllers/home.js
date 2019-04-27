module.exports.index = function (application, req, res) {
    const connection = application.config.dbConnection();
    var noticiasModel = new application.app.models.NoticiasDAO(connection);

    noticiasModel.getLastFiveNews(function (error, result) {
        res.render("home/index", {noticias: result});
    });
};
