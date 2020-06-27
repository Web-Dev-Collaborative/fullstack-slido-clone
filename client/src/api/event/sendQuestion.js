import axios from 'axios';

import {API_URL} from '../../config';

export default ({questionerId, eventId, question}) =>
  axios.post(`${API_URL}/event/question`, {questionerId, eventId, question});
