export default class UserInfo {
  constructor({ name, job }) {
    this._profileInfo = document.querySelector(".profile__info");
    this._name = this._profileInfo.querySelector(name);
    this._job = this._profileInfo.querySelector(job);
  }

  getUserInfo() {
    /*let userObj = {};
    userObj = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userObj;*/
    const userObj = {
      name: this._name.textContent,
      job: this._job.textContent,
    };//just doing the above in one stroke now, i know doing it the above way was obviously redundant but I was having trouble with it before, iirc; doesn't matter now, it works
    return userObj;
  }

  setUserInfo({ newName, newJob }) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
  }
}
