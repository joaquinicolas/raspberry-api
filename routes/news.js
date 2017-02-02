
function News(main){
    return {
        Add:function(req,res,next){
            let news = req.body;
            main.libs.News.Create(news)
            .then((err,recordset) => {
                if (err) {
                    next(err);
                }

                res.sendStatus(200);
            })
            .catch(err => {
                next(err);
            })
            
        }
    }
}

module.exports = News;