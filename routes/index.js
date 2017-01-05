/**
 *
 * @param {function}handler - The function for controller
 * @description controllers Handler.
 * @returns {Function(*=, *=, *)} - the wrap function
 */
function wrapHandler(handler) {
    return (req,res,next) => {
        handler(req,res,(err) => {
            if (err){
                console.error(err.stack);

                res.status(503).json({
                    code:'controller_error',
                    message:typeof(err) === 'string' ? err : err.message
                }).end();
            }
            else{
                next();
            }
        });
    }
}

/**
 * @description append handler to controllers
 * @param {object} controllers - The controllers list (object).
 * @returns {*}
 */
function wrapControllers(controllers) {
    for (var k in controllers){
        controllers[k] = wrapHandler(controllers[k]);
    }

    return controllers;
}


/**
 * Creates and return the controllers object for routes.
 * @param {object} main - The application instance.
 * @returns {object} controller object.
 */
function makeControllers(main) {
    let controllers = {

        Alive : require('./Alive')(main),
        News : require('./news')(main)
    };

    return wrapControllers({
        'alive.post': controllers.Alive.PostAlive,
        'news.post':controllers.News.Add
    });
}

module.exports = makeControllers;