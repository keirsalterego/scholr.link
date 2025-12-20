export function requiredEnv(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required env var ${name}`);
  }
  return value;
}

export function optionalEnv(name: string, fallback?: string) {
  return process.env[name] ?? fallback;
}
