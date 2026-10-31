import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { MongoClient } from "mongodb";
import { passwordError } from "./utils";

function createAuth() {
  if (!process.env.MONGODB_URI || !process.env.BETTER_AUTH_SECRET)
    throw new Error("Authentication is not configured.");
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });
  const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";
  return betterAuth({
    appName: "Pataghor",
    baseURL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: mongodbAdapter(client.db(process.env.MONGODB_DB || "pataghor"), {
      client,
    }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
      autoSignIn: false,
      requireEmailVerification: false,
    },
    socialProviders:
      process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? {
            google: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
          }
        : {},
    hooks: {
      before: createAuthMiddleware(async (context) => {
        if (context.path === "/sign-up/email") {
          const message = passwordError(String(context.body?.password || ""));
          if (message) throw new APIError("BAD_REQUEST", { message });
        }
      }),
    },
    plugins: [
      jwt({
        jwks: { keyPairConfig: { alg: "EdDSA" } },
        jwt: {
          issuer: baseURL,
          audience: process.env.JWT_AUDIENCE || "pataghor-api",
          expirationTime: "5m",
          definePayload: ({ user }) => ({ email: user.email, name: user.name }),
        },
      }),
    ],
  });
}
type Auth = ReturnType<typeof createAuth>;
const shared = globalThis as typeof globalThis & { pataghorAuth?: Auth };
export function getAuth() {
  return (shared.pataghorAuth ??= createAuth());
}
