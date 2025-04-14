import express from "express";
import { searchEmails } from "../controllers/emailController.js";
import { suggestReply } from "../controllers/emailController.js";

const router = express.Router();

router.get('/search', searchEmails);
router.post('/suggest-reply', suggestReply);

export default router;
