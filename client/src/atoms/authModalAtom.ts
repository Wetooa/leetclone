"use client";

import { atom } from "recoil";

interface AuthModalState {
	isOpen: boolean;
	type: "login" | "register" | "forgotPassword";
}

const initialAuthModalState: AuthModalState = {
	isOpen: false,
	type: "login",
};

export const authModalState = atom<AuthModalState>({
	key: "authModalState",
	default: initialAuthModalState,
});
