import express from 'express';

import {
  generatePoll,
  sendAnswer,
  getActivePoll,
  getPollsByEvent,
  setActiveState
} from '../controllers/poll';

const router = express.Router();

router.get('/', getPollsByEvent);
router.get('/active', getActivePoll);
router.post('/', generatePoll);
router.post('/answer', sendAnswer);
router.patch('/set-active', setActiveState);

export default router;
