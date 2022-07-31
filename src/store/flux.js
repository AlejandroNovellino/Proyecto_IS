const URLAPI = "http://localhost:5000";
const TOKEN = "ABCDEFGHIJK12345678";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			token: "",
			workingProjectId: null,
		},
		actions: {
			// Use getActions to call a function within a function
			signIn: async userInfo => {
				try {
					let response = await fetch(`${URLAPI}/artist`, {
						method: "POST",
						body: JSON.stringify({
							...userInfo,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (response.ok) {
						let body = await response.json();
						setStore({
							user: body.artist,
							token: TOKEN,
						});
						// set the local storage
						localStorage.setItem("token", TOKEN);
						localStorage.setItem("user", JSON.stringify(body.artist));

						return true;
					}
					return false;
				} catch {
					return false;
				}
			},
			logIn: async userInfo => {
				try {
					let response = await fetch(`${URLAPI}/artist/log-in`, {
						method: "POST",
						body: JSON.stringify({
							...userInfo,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (response.ok) {
						let body = await response.json();
						setStore({
							user: body.artist,
							token: TOKEN,
						});
						// set the local storage
						localStorage.setItem("token", TOKEN);
						localStorage.setItem("user", JSON.stringify(body.artist));

						return true;
					}
					return false;
				} catch {
					return false;
				}
			},
			logOut: _ => {
				setStore({
					user: null,
					token: "",
				});
			},
			setToken: (token, user) => {
				setStore({
					user: JSON.parse(user),
					token,
				});
			},
			createProject: async projectInfo => {
				try {
					let response = await fetch(`${URLAPI}/project`, {
						method: "POST",
						body: JSON.stringify({
							...projectInfo,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (response.ok) {
						let body = await response.json();
						setStore({
							user: body.artist,
						});

						return true;
					}
					return false;
				} catch {
					return false;
				}
			},
			createProjectVersion: async projectInfo => {
				try {
					let response = await fetch(`${URLAPI}/project-version`, {
						method: "POST",
						body: JSON.stringify({
							...projectInfo,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (response.ok) {
						let body = await response.json();
						setStore({
							user: body.artist,
						});

						return true;
					}
					return false;
				} catch {
					return false;
				}
			},
			setWorkingProjectId: projectId => {
				setStore({
					workingProjectId: projectId,
				});
			},
			createPoll: async pollInfo => {
				try {
					let response = await fetch(`${URLAPI}/poll`, {
						method: "POST",
						body: JSON.stringify({
							...pollInfo,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (response.ok) {
						let body = await response.json();
						setStore({
							user: body.artist,
						});

						return true;
					}
					return false;
				} catch {
					return false;
				}
			},
			getAllProjects: async _ => {
				try {
					let response = await fetch(`${URLAPI}/projects`);
					if (response.ok) {
						let body = await response.json();

						return body.projects;
					}
					return null;
				} catch {
					return null;
				}
			},
			getProjectById: _ => {
				if (!getStore().workingProjectId) return null;

				const idToFind = getStore().workingProjectId;
				const project = getStore().user?.projects.filter(
					project => project.id == idToFind
				);

				return project[0];
			},
			uploadBaseProjectFile: async data => {
				try {
					const response = await fetch(`${URLAPI}/file`, {
						method: "POST",
						body: data,
					});

					if (response.ok) {
						let body = await response.json();
						setStore({
							user: body.artist,
						});

						return true;
					} else {
						return false;
					}
				} catch {
					return false;
				}
			},
			updatePoll: async data => {
				try {
					const response = await fetch(`${URLAPI}/poll`, {
						method: "PUT",
						body: JSON.stringify({
							...data,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (response.ok) {
						return true;
					} else {
						return false;
					}
				} catch {
					return false;
				}
			},
			createComment: async data => {
				try {
					const response = await fetch(`${URLAPI}/comment`, {
						method: "POST",
						body: JSON.stringify({
							...data,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (response.ok) {
						let body = await response.json();
						setStore({
							user: body.artist,
						});

						return true;
					} else {
						return false;
					}
				} catch {
					return false;
				}
			},
		},
	};
};

export default getState;
