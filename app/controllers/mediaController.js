const path = require('path');

const getMedia = async (req, res) => {
  const { filename } = req.params;
  return res.sendFile(path.join(__dirname, '../../images/', filename));
};

module.exports = {
  getMedia,
};
