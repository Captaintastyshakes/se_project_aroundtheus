export default class UserInfo {
  constructor({ name, job }) {
    this._profileInfo = document.querySelector(".profile__info");
    this._name = this._profileInfo.querySelector(name);
    this._job = this._profileInfo.querySelector(job);
  }

  getUserInfo() {
    let userObj = {};

    userObj = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userObj;
  }

  setUserInfo({ newName, newJob }) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
  }
}
