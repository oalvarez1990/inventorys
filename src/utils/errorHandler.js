const errorHandler = (error, _req, res, _next) => {
    if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });

        return res.status(400).send(errors);
    }
		console.log(error);
    return res.status(500).json({
        message: error.message,
        error: error
    });
}

module.exports = errorHandler;