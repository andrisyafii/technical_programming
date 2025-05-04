"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../controller/api");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Apply auth middleware to all routes
router.use(authMiddleware_1.authMiddleware);
router.get('/fetch-user-data/:userId', api_1.fetchUserData);
router.put('/update-user-data/:userId', api_1.updateUserData);
exports.default = router;
