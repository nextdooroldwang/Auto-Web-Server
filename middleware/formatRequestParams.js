const formatRequestParams = (req, res, next) => {
  req.body = formatParams(req.body);
  req.query = formatParams(req.query);
  next();
};

function formatParams(params) {
  if (typeof params === "object") {
    if (Array.isArray(params)) {
      return params.map(formatParams);
    } else {
      const formattedParams = {};
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const formattedKey = key.replace(/_([a-z])/g, (match, letter) =>
            letter.toUpperCase()
          );
          formattedParams[formattedKey] = formatParams(params[key]);
        }
      }
      return formattedParams;
    }
  }
  return params;
}

module.exports = formatRequestParams;
