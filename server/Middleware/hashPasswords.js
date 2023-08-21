import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
    try {
      // Generate a salt to use during the hashing process
      const salt = await bcrypt.genSalt(10);
  
      // Hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);
  
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  };
  
  export default hashPassword;
  