/**
 * @param {Object} main. The application context
 */
function News(main){
    this.sqlConnection = main.db;
    this.sql = main.sql;
}


/**
 * Insert a news into table Repositorio
 * @param {Object} news
 * @returns {Promise.<err,recordset>} A promise that returns a recordset if resolved,
 * or an Error if rejected.
 * 
 */
News.prototype.Create = function(news = {}){
    console.log(news)
    if (news == {}) throw new Error("undefined message");
    return this.sqlConnection.connect()
    .then(() => {

        let request = new this.sql.Request(this.sqlConnection);
        return request.query(
            'INSERT INTO [Repositorio] ' +
            '([Mac] ' +
            ',[Fproceso] ' +
            ',[Data] ' +
            ',[procesado]) ' +
        'VALUES ' +
            '(\'' + news.Mac + ' \'' +
            ',\''+new Date().smallDate() +'\'' +
            ',\'' + news.Data  + '\'' +
            ',0)'
        )

    })
    .catch(err =>{
        throw err;
    });
}

module.exports = News;