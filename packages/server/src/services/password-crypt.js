const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10; // number of salt rounds determines the complexity of the hashing
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  hashPassword,
  comparePasswords,
};
