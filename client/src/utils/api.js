import { API_ROOT } from './api-config';

const api = { 

  getUsers: function() {
    return fetch(`${API_ROOT}/users`)
      .then(res => { return res.json() })
      // .then(res => {
      //   return res;
      // });
  }

}

export default api;