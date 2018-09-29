import axios from 'axios'


axios.defaults.headers.post['Content-Type'] = 'application/x-www-from-urlencoded;charset=UTF-8';
//跨域
axios.defaults.withCredentials = true;

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if (type.toLocaleLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data;
    }
    axios(option).then(res => {
      // console.log(JSON.stringify(option))
      if (res.status === 200) {
        if (res.data.result == -1) {
          location.replace('/')
        } else {
          resolve(res.data)
          this.$message.error(res.data.message)
        }
      } else {
        this.$message.error(res.data.message)
        reject(res.data)
      }
    }).catch(err => {

    })
  })
}
