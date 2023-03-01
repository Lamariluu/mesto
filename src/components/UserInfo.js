export default class UserInfo {
  constructor({ userNameSelector, userBioSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userBio = document.querySelector(userBioSelector);
    console.log({ userNameSelector, userBioSelector })
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      bio: this._userBio.textContent,
    };
  }

  setUserInfo(name, bio) {
    this._userName.textContent = name;
    this._userBio.textContent = bio;
  }
}
