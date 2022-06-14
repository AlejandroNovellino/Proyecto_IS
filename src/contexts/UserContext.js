import { createContext } from "react";

export const themes = {
	dark: "",
	light: "white-content",
};

export const UserContext = createContext({
	username: null,
	firstName: null,
	lastName: null,
	age: null,
	nationality: null,
	bio: null,
	projects: null,
	changeTheme: () => {},
});
