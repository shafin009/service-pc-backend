"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = void 0;
const emailRegex = /^[A-Z0-9._%+-]*[A-Z]+[A-Z0-9._%+-]*@gmail\.com$/i;
function isValidEmail(email) {
    return emailRegex.test(email);
}
exports.isValidEmail = isValidEmail;
