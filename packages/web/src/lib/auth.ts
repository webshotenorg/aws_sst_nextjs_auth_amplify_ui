"use client";

import {
    confirmSignUp,
    getCurrentUser,
    signIn,
    signOut,
    signUp,
} from "aws-amplify/auth";

export async function doSignUp(email: string, password: string) {
    return await signUp({ username: email, password });
}

export async function doConfirmSignUp(email: string, code: string) {
    return await confirmSignUp({ username: email, confirmationCode: code });
}

export async function doSignIn(email: string, password: string) {
    return await signIn({ username: email, password });
}

export async function doSignOut() {
    return await signOut();
}

export async function fetchCurrentUser() {
    try {
        return await getCurrentUser();
    } catch {
        return null;
    }
}
