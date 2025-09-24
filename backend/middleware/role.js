module.exports = function(roles = []) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Forbidden: You don't have access" });
    }
    next();
  };
};
