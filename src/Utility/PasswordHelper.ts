import bcrypt from "bcrypt";

class PasswordHelper {
  private static saltRounds = 10;

  public static async hashPassword(
    plainPassword: string
  ): Promise<{ hash: string; salt: string }> {
    const salt = await bcrypt.genSalt(PasswordHelper.saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    return { hash, salt };
  }

  public static async validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default PasswordHelper;
