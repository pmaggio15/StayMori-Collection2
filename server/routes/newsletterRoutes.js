import express from "express";
import { subscribeNewsletter, getSubscribers, unsubscribeNewsletter } from "../controllers/newsletterController.js";

const newsletterRouter = express.Router();

// Public routes
newsletterRouter.post("/subscribe", subscribeNewsletter);
newsletterRouter.post("/unsubscribe", unsubscribeNewsletter);

// Admin route (you can add auth middleware later)
newsletterRouter.get("/subscribers", getSubscribers);

export default newsletterRouter;