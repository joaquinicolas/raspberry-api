/**
 * @param {Object} main Application instance
 *
 */
function Alive(main) {
  this.sqlConnection = main.db;
    this.sql = main.sql;
}
/**
 * Update connection status of station
 * @param {string} mac the client mac address
 * @returns {Promise.<err,recordset>} A promise that returns a recordset if resolved,
 * or an Error if rejected.
 */

Alive.prototype.keepAlive = function(mac) {

    let sql = this.sql;
    console.log("****keepAlive method ****");
    let request = new this.sql.Request(this.sqlConnection);
      console.log("***Request has been created***");
      console.log(new Date().smallDate())
      return request.query(
                'INSERT INTO [estoyvivo] '+
                    '([mac] '+
                    ',[fecha]) ' +
                'VALUES '+
                    '(\''+ mac + '\' '+
                    ',\''+ new Date().smallDate() + '\' )'
        );
    /*return this.sqlConnection.connect().then(() => {

      let request = new this.sql.Request(this.sqlConnection);
      console.log("***Request has been created***");
      console.log(new Date().smallDate())
      return request.query(
                'INSERT INTO [estoyvivo] '+
                    '([mac] '+
                    ',[fecha]) ' +
                'VALUES '+
                    '(\''+ mac + '\' '+
                    ',\''+ new Date().smallDate() + '\' )'
        );
            })
            .catch(err => {
                throw err;
            })
*/
};

/**
id            int          Unchecked
mac       nchar(100)          Checked
fecha    smalldatetime  Checked**/
module.exports = Alive;
