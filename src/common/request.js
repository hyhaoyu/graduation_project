const request = {};

request.baseUrl = "";

['get', 'delete'].forEach(method => {
  request[method] = (url)=>{
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let token = window.sessionStorage.getItem('token');
      xhr.open(method, request.baseUrl + url);
      xhr.setRequestHeader('Authorization', token?token:"");
      xhr.send();
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(`失败`);
        }
      };
    });
  }
});
['post', 'put'].forEach(method => {
  request[method] = (url, obj)=> {
    let arr = [];
    let str = "";
    Object.keys(obj).map((item) => {
      arr.push(`${item}=${obj[item]}`);
    });
    str = arr.join("&");
    console.log(str);
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let token = window.sessionStorage.getItem('token');
      xhr.open(method, request.baseUrl + url);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader('Authorization', token?token:"");
      xhr.send(str);
      xhr.onload = function() {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject("失败");
        }
      }
    })
  }
});
export default request;