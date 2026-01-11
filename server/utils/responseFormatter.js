// utils/responseFormatter.js
function formatResponse(success, data = null, message = null) {
  return {
    success,
    message,
    data,
  };
}

// Specialized error formatter
function formatError(error, code = 500, ) {
  let message = "An unexpected error occurred";

  // If error is an Error object, extract message
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  return {
    success: false,
    message,
    data: null,
  };
}

module.exports = { formatResponse, formatError };
