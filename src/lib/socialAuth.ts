// src/lib/socialAuth.ts
export const authConfig = {
    google: {
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirectUri: "http://localhost:5173/auth/google/callback",
    },
    github: {
        clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
        redirectUri: "http://localhost:5173/auth/github/callback",
    },
    facebook: {
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        redirectUri: "http://localhost:5173/auth/facebook/callback",
    },
};
