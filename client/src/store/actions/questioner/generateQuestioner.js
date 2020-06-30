import axios from 'axios';

import {API_URL} from '../../../config';

export default () => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.post(`${API_URL}/questioner`);
      dispatch({type: 'SET_QUESTIONER', payload: data});
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
