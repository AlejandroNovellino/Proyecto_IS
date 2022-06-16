const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
const nameRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/;

module.exports = {
	emailRegex,
	passwordRegex,
	nameRegex,
};
