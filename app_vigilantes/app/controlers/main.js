function about (req, res){
    res.render('main/about',{
        titulo: 'Jogo Vigilantes da Floresta'
    });
}

function index (req, res){
    res.render('main/index', {
        titulo: 'Página Inicial'
    });
}

function ui (req, res){
    res.render('main/ui');
}

function game(req, res){
    res.render('main/game',{
        titulo: 'Vigilantes da Floresta'
    });
}

module.exports = { about, index, ui , game }