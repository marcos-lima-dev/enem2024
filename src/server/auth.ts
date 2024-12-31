// src/server/auth.ts

import express from "express";
import axios from "axios";

const router = express.Router();

// Configurações
const config = {
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        tokenUrl: "https://github.com/login/oauth/access_token",
        userUrl: "https://api.github.com/user",
    },
    facebook: {
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
        tokenUrl: "https://graph.facebook.com/v12.0/oauth/access_token",
        userUrl: "https://graph.facebook.com/me",
    },
};

// GitHub callback
router.get("/auth/github/callback", async (req, res) => {
    const { code } = req.query;

    try {
        const { data: tokenData } = await axios.post(config.github.tokenUrl, {
            client_id: config.github.clientId,
            client_secret: config.github.clientSecret,
            code,
        });

        const accessToken = tokenData.access_token;

        const { data: userData } = await axios.get(config.github.userUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Crie/atualize usuário no banco
        const user = await db.user.upsert({
            where: { githubId: userData.id },
            create: {
                email: userData.email,
                name: userData.name,
                githubId: userData.id,
            },
            update: {
                email: userData.email,
                name: userData.name,
            },
        });

        // Gere JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Erro na autenticação" });
    }
});

// Facebook callback similar...

export default router;
