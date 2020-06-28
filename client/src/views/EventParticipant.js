import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {
  AskToSpeaker,
  Navbar,
  Polls,
  Questions,
  Sidebar,
} from '../components/EventParticipant';

import {getEventId} from '../api/event';
import {generateQuestioner} from '../api/questioner';

function Event({
  match: {
    params: {code},
  },
}) {
  const [eventId, setEventId] = useState('');
  const [questionerId, setQuestionerId] = useState('');
  const history = useHistory();

  useEffect(() => {
    findEventIdByCode();
    questionerChecker();
  }, []);

  const findEventIdByCode = async () => {
    try {
      const eventId = await getEventId({eventCode: code});
      setEventId(eventId);
      return;
    } catch (error) {
      history.push('/404');
    }
  };

  /* put this function to generaller place to check */
  const questionerChecker = async () => {
    const questionerId = localStorage.getItem('questionerId');
    if (questionerId) {
      setQuestionerId(questionerId);
      return;
    }

    const {data} = await generateQuestioner();
    localStorage.setItem('questionerId', data);
  };

  return (
    <Fragment>
      <Navbar eventId={eventId} />
      {/* <Sidebar/> */}
      <AskToSpeaker eventId={eventId} />
      <Questions eventId={eventId} />
    </Fragment>
  );
}

export default Event;
