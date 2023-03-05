export default class UserInfo {
  constructor({ userNameSelector, userBioSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userBio = document.querySelector(userBioSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      bio: this._userBio.textContent,
      _id: this._id,
    };
  }

  setUserInfo(name, bio, avatar, id) {
    this._userName.textContent = name;
    this._userBio.textContent = bio;
    this.setUserAvatar(avatar);
    this._id = id
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
