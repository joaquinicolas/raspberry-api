var expect = require("chai").expect;
var Alive = require('../libs/Alive');
var sql = require("mssql");

describe('Alive End Point', () => {

  it('insert entry ', (done) => {
    sql.connect("mssql://clinica:Ffs6sn664jkldsfc84f@localhost/ElcaDB")
      .then(() => {
        new Alive({
          db:sql
        })
          .then((recordset) => {
            console.log(recordset);

          })
          .catch((err) => {
            expect(err).to.be.null;

          })
      })
      .catch((err) => {
        console.log(err)
        expect(err).to.be.null;

      });

  });
});
