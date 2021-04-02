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
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let token = window.sessionStorage.getItem('token');
      xhr.open(method, request.baseUrl + url);
      xhr.setRequestHeader('Authorization', token?token:"");
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(obj));
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
request.uploadFile = (url, obj)=> {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      Object.keys(obj).map((item)=>{
        formData.append(item, obj[item]);
      })
      let xhr = new XMLHttpRequest();
      let token = window.sessionStorage.getItem('token');
      xhr.open('post', request.baseUrl + url);
      xhr.setRequestHeader('Authorization', token?token:"");
      xhr.send(formData);
      xhr.onload = function() {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject("失败");
        }
      }
    })
};
export default request;