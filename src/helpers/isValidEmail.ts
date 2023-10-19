const emailRegex = /^[A-Z0-9._%+-]*[A-Z]+[A-Z0-9._%+-]*@gmail\.com$/i;

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}
