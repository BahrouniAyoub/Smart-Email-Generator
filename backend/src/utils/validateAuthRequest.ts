interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export function validateRegisterInput(
  data: RegisterInput
): string | null {
  if (!data.name?.trim()) {
    return "Name is required.";
  }

  if (!data.email?.trim()) {
    return "Email is required.";
  }

  if (!data.password) {
    return "Password is required.";
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(data.email)) {
    return "Please enter a valid email address.";
  }

  if (data.password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  return null;
}

export function validateLoginInput(
  data: LoginInput
): string | null {
  if (!data.email?.trim()) {
    return "Email is required.";
  }

  if (!data.password) {
    return "Password is required.";
  }

  return null;
}