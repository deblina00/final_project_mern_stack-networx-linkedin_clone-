exports.validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({
        error: "Validation failed",
        message: error.details[0].message,
      });
    }
    next();
  };
};
