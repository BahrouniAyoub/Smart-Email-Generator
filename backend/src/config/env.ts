function getRequiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is not configured`)
    }

    return value
}

export const env = {
    databaseUrl: getRequiredEnv("DATABASE_URL"),
    groqApiKey: getRequiredEnv("GROQ_API_KEY"),
    jwtSecret: getRequiredEnv("JWT_SECRET"),
    frontendUrl: getRequiredEnv("FRONTEND_URL"),
}