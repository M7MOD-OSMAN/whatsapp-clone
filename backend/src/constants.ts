const encoder = new TextEncoder();
export const JWT_SECRET_KEY = encoder.encode(process.env["JWT_SECRET_KEY"]);
