"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserData = exports.fetchUserData = void 0;
const userCollection_1 = require("../repository/userCollection");
const fetchUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = yield (0, userCollection_1.getUserById)(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.fetchUserData = fetchUserData;
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const updatedUser = yield (0, userCollection_1.updateUser)(userId, userData);
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error('Error updating user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateUserData = updateUserData;
