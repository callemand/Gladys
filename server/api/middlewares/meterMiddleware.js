const logger = require('../../utils/logger');


function meterMiddleware(gladys) {
    return (req, res, next) => {
        const service = gladys.service.getService('monitor')
        if(service !== undefined){
            service.getCollection().meter('requestsPerSecond').mark();
        }
        next();
    };
}


module.exports = {
    meterMiddleware,
};
