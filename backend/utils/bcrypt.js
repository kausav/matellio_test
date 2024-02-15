const bcrypt= require('bcryptjs');
const config =require ('config');

function createHash(text) {
  return bcrypt.hashSync(text, config.get('hashLength'))
}

function compareHash(text, hash) {
  return bcrypt.compareSync(text, hash)
}

module.exports = {
  createHash,
  compareHash,
}