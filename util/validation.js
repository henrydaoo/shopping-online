function isEmpty(value) {
  return !value || value.trim() == "";
}

function userCredentialAreValid(email, password) {
  return email && password && password.trim().length >= 6;
}

function userDetailAraValid(email, password, name, street, city) {
  return (
    userCredentialAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(city)
  );
}

module.exports = {
  userDetailAraValid: userDetailAraValid,
};
