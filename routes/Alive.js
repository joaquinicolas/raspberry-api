
function Alive(main) {
    return{

        PostAlive:(req,res,next) => {
            console.log("Alive Post Request");
                let mac = req.body.mac;
                console.log(mac);
                main.libs.Alive.keepAlive(mac)
                .then((err,recordset) => {
                    console.log("***Called then***");
                    if (err) {
                        return next(err);
                    }
                    res.sendStatus(200);
                })
                .catch(err => next(err));
        }
    }
}

module.exports = Alive;