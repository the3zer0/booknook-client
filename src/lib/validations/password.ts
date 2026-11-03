export function passwordError(password: string) {
  if (password.length < 6) return "Use at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Add an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Add a lowercase letter.";
  return null;
}
