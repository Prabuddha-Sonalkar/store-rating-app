// const validateSignup = (data) => {

//   const errors = [];

//   if (
//     !data.name ||
//     data.name.length < 20 ||
//     data.name.length > 60
//   ) {
//     errors.push(
//       "Name must be between 20 and 60 characters"
//     );
//   }

//   const emailRegex =
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (
//     !data.email ||
//     !emailRegex.test(data.email)
//   ) {
//     errors.push("Invalid email");
//   }

//   if (
//     !data.address ||
//     data.address.length > 400
//   ) {
//     errors.push(
//       "Address must be less than 400 characters"
//     );
//   }

//   const passwordRegex =
//     /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

//   if (
//     !data.password ||
//     !passwordRegex.test(data.password)
//   ) {
//     errors.push(
//       "Password must be 8-16 chars with uppercase and special character"
//     );
//   }

//   return errors;
// };

// module.exports = {
//   validateSignup
// };


const validateSignup = (data) => {
  const errors = [];

  if (!data.name || data.name.length < 3 || data.name.length > 60) {
    errors.push("Name must be 3–60 characters");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Invalid email");
  }

  if (!data.address || data.address.length > 400) {
    errors.push("Address must be less than 400 characters");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
  if (!data.password || !passwordRegex.test(data.password)) {
    errors.push("Password must be 8-16 chars with uppercase + special char");
  }

  return errors;
};

module.exports = { validateSignup };