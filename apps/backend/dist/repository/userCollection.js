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
exports.updateUser = exports.getUserById = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const userCollection = firebaseConfig_1.db.collection('USERS');
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDoc = yield userCollection.doc(userId).get();
        if (!userDoc.exists) {
            return null;
        }
        return Object.assign({ id: userDoc.id }, userDoc.data());
    }
    catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
});
exports.getUserById = getUserById;
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userCollection.doc(userId).update(userData);
        const updatedUser = yield (0, exports.getUserById)(userId);
        if (!updatedUser) {
            throw new Error('User not found after update');
        }
        return updatedUser;
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
});
exports.updateUser = updateUser;
