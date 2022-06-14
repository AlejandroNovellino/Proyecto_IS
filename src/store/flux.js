const URLAPI = "http://localhost:5000";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			username: null,
			firstName: null,
			lastName: null,
			age: null,
			nationality: null,
			bio: null,
			projects: null,
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
						});
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
						});
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
				});
			},
			setToken: (token, user) => {
				setStore({
					token,
					user: JSON.parse(user),
				});
			},
			uploadCathedrasFile: async myFile => {
				try {
					const response = await fetch(`${URLAPI}/upload-cathedras`, {
						method: "POST",
						body: myFile,
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
			uploadCoursesFile: async myFile => {
				try {
					const response = await fetch(`${URLAPI}/upload-courses`, {
						method: "POST",
						body: myFile,
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
			uploadGradesFile: async myFile => {
				try {
					const response = await fetch(`${URLAPI}/upload-grades`, {
						method: "POST",
						body: myFile,
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
			uploadProfessorsFile: async myFile => {
				try {
					const response = await fetch(`${URLAPI}/upload-professors`, {
						method: "POST",
						body: myFile,
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
			uploadStudentsFile: async myFile => {
				try {
					const response = await fetch(`${URLAPI}/upload-students`, {
						method: "POST",
						body: myFile,
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
			getAllCountries: async _ => {
				try {
					let response = await fetch(
						"https://restcountries.eu/rest/v2/all?fields=name"
					);

					if (response.ok) {
						const data = await response.json();
						setStore({
							nationalities: data,
						});
					} else {
						return [];
					}
				} catch {
					return [];
				}
			},
			getAllCareers: async () => {
				try {
					let response = await fetch(`${URLAPI}/careers`);

					if (response.ok) {
						const data = await response.json();
						let careers = data.map(element => {
							return element[0].toUpperCase() + element.slice(1);
						});
						setStore({
							careers: careers,
						});
					} else {
						return null;
					}
				} catch {
					return null;
				}
			},
			getAllElementInfo: async elementName => {
				try {
					const response = await fetch(`${URLAPI}/${elementName}/info`);

					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						return null;
					}
				} catch {
					return null;
				}
			},
			getAllCathedrasFromCareer: async career => {
				try {
					const response = await fetch(`${URLAPI}/cathedras/${career}`);

					if (response.ok) {
						const data = await response.json();
						setStore({
							cathedras: data,
						});
					} else {
						return null;
					}
				} catch {
					return null;
				}
			},
			getActivesCoursesFromCareer: async career => {
				try {
					const response = await fetch(`${URLAPI}/courses/${career}`);

					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						return null;
					}
				} catch {
					return null;
				}
			},
			getCourseByCode: async code => {
				try {
					const response = await fetch(`${URLAPI}/courses/byCode/${code}`);
					if (response.ok) {
						const data = response.json();
						return data;
					} else {
						return null;
					}
				} catch {
					return null;
				}
			},
			createUser: async (email, password, role, professor_id) => {
				try {
					let response = await fetch(`${URLAPI}/sign-up`, {
						method: "POST",
						body: {
							email: email,
							password: password,
							role: role,
							professor_id: professor_id,
						},
						header: {
							"Content-Type": "application/json",
						},
					});

					if (response.ok) {
						const new_professor = response.json();
						return new_professor;
					} else {
						return null;
					}
				} catch {
					return null;
				}
			},
			createProfessor: async (...params) => {
				try {
					const response = await fetch(`${URLAPI}/professor`, {
						method: "POST",
						body: JSON.stringify({
							fullName: params[0],
							ci: params[1],
							phoneNumber: params[2],
							age: params[3],
							nationality: params[4],
							residence: params[5],
							career: params[6],
							cathedras: params[7],
							email: params[8],
							role: params[9],
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
				} catch {
					return null;
				}
			},
			createStudent: async (...params) => {
				try {
					const response = await fetch(`${URLAPI}/student`, {
						method: "POST",
						body: JSON.stringify({
							fullName: params[0],
							ci: params[1],
							phoneNumber: params[2],
							age: params[3],
							nationality: params[4],
							residence: params[5],
							career: params[6],
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (response.ok) {
						const data = response.json();
						return data;
					} else {
						return null;
					}
				} catch {
					return null;
				}
			},
			createInscription: async (student_id, course_id) => {
				try {
					const response = await fetch(`${URLAPI}/inscription`, {
						method: "GET",
						body: JSON.stringify({
							student_id: student_id,
							course_id: course_id,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (response.ok) {
						const data = response.json();
						return data;
					} else {
						return null;
					}
				} catch {
					return null;
				}
			},
			createEvaluation: async (course_id, name, percentage) => {
				try {
					const response = await fetch(`${URLAPI}/evaluation`, {
						method: "POST",
						body: JSON.stringify({
							course_id,
							name,
							percentage,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						return null;
					}
				} catch {
					return null;
				}
			},
			modifyUserRole: async (email, role) => {
				try {
					const response = await fetch(`${URLAPI}/users/${email}`, {
						method: "PUT",
						body: JSON.stringify({
							role,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						return null;
					}
				} catch {
					return null;
				}
			},
			createInfoFile: async neededInfo => {
				try {
					const response = await fetch(`${URLAPI}/create/${neededInfo}/file`, {
						method: "POST",
						headers: {
							"Content-Type": "multipart/form-data",
						},
					});

					if (response.ok) {
						const data = await response.json();
						return data.fileName;
					} else {
						return false;
					}
				} catch {
					return false;
				}
			},
			getFileUrl: async (nature, fileName) => {
				return `${URLAPI}/static-file/${nature}/${fileName}`;
			},
		},
	};
};

export default getState;
