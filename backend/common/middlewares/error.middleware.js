require("dotenv").config()

const ErrorHandler = (err , req , resp , next) => {
    console.log(err)

    const message = err.message || "Internal Server Error"
    const statusCode = err.statusCode || 500

    return resp.status(statusCode).json({
        success : false,
        message : message,
        statusCode : statusCode,
        ...(process.env.NODE_ENV === "development" && {stack : err.stack})
    })
}

module.exports = ErrorHandler;