
class ControllerBase {

    sendSuccess(statusCode, message, res, data={}) {
        const result = {
            message: message,
            data: data,
        };
        return res.status(statusCode).json(result);
    }

    sendError(statusCode, message, res) {
        return res.status(statusCode).json({
            message: message,
        });
    }
}

module.exports = ControllerBase