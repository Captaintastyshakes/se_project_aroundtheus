export default class UserInfo {
  constructor({ name, job }) {  
    this._profileInfo = document.querySelector(".profile__info");
    this._name = this._profileInfo.querySelector(name);
    this._job = this._profileInfo.querySelector(job);    
    this._avatar = document.querySelector("#avatar");//user info needs to handle avatar src as well
  }

  getUserInfo() {
    const userObj = {
      name: this._name.textContent,
      job: this._job.textContent,
      source: this._avatar.src
    };
    return userObj;
  }

  setUserInfo({ newName, newJob}) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
  }

  setAvatar(source) {//keeping the avatar handling seperate for clarity's sake.
    this._avatar.src = source;
  }
}
