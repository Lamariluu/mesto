export default class UserInfo {
  constructor({ name, bio }) {
    this._userName = name;
    this._userBio = bio;
  }

  getUserInfo() {
    const profileData = {
      name: this._userName.textContent,
      bio: this._userBio.textContent,
    }
    return profileData;
  }

  setUserInfo(profileData) {
    this._userName.textContent = profileData.name;
    this._userBio.textContent = profileData.bio;
  }
}
