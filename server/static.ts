import express, { type Express, type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import path from "path";
import { isBot } from "./bot-detector";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  app.use("*", (req, res) => {
    const userAgent = req.headers["user-agent"];
    
    if (isBot(userAgent)) {
      const botHtmlPath = path.resolve(distPath, "index-bot.html");
      if (fs.existsSync(botHtmlPath)) {
        res.sendFile(botHtmlPath);
        return;
      }
    }
    
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

export function serveBotHtml(req: Request, res: Response, next: NextFunction) {
  const clientDir = path.resolve(import.meta.dirname, "..", "client");
  const botHtmlPath = path.resolve(clientDir, "index-bot.html");
  
  if (fs.existsSync(botHtmlPath)) {
    res.sendFile(botHtmlPath);
  } else {
    next();
  }
}
