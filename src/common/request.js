export default {
  get(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.setRequestHeader("token", window.sessionStorage.getItem("token"));
      xhr.send();
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject("加载失败");
        }
      };
    });
  },
  post(url, obj) {
    let arr = [];
    let str = "";
    Object.keys(obj).map((item) => {
      arr.push(`${item}=${obj[item]}`);
    });
    str = arr.join("&");
    console.log(str);
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("post", url);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(str);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject("添加失败");
        }
      }
    })
  },
  delete(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("delete", url);
      xhr.send();
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject("删除失败");
        }
      };
    });
  },
  put(url, obj) {
    let arr = [];
    let str = "";
    Object.keys(obj).map((item) => {
      arr.push(`${item}=${obj[item]}`);
    });
    str = arr.join("&");
    console.log(str);
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("put", url);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(str);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject("添加失败");
        }
      }
    })
  },

}