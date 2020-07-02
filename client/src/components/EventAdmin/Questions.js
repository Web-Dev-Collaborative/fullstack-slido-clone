import React, {useEffect, useState, Fragment} from 'react';

import {socket} from '../../config';
import {compareValues} from '../../utils';

import {
  getQuestions,
  deleteQuestion,
  highlightQuestion,
} from '../../api/question';

function Questions({eventId}) {
  const [questions, setQuestions] = useState('');
  const [isPopularSelected, setIsPopularSelected] = useState(true);

  useEffect(() => {
    if (eventId) {
      handleGetQuestions();
      socket.emit('joinEvent', eventId);

      socket.on('set-questions', () => {
        console.log('socket on');
        handleGetQuestions();
      });
    }
  }, [eventId]);

  useEffect(() => {
    if (questions) sortQuestions(questions);
    console.log(isPopularSelected);
  }, [isPopularSelected]);

  const sortQuestions = (questionsToSort) => {
    console.log(isPopularSelected);
    if (isPopularSelected === true) {
      const questionsSortedByPopularity = [...questionsToSort].sort(
        compareValues('likeCount', 'desc')
      );
      setQuestions(questionsSortedByPopularity);
      return;
    }

    const questionsSortedByRecent = [...questionsToSort].sort(
      compareValues('generatedAt', 'desc')
    );
    setQuestions(questionsSortedByRecent);
  };

  const handleGetQuestions = async () => {
    try {
      const {data} = await getQuestions({eventId});
      sortQuestions(data);
      /* setQuestions(data); */
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteQuestion = async (e) => {
    const questionId = e.target.parentElement.id;
    const questionerId = e.target.parentElement.className;
    deleteQuestion({eventId, questionerId, questionId});
  };

  const handleHighlightQuestion = (e) => {
    const questionId = e.target.parentElement.id;
    const questionerId = e.target.parentElement.className;
    highlightQuestion({eventId, questionerId, questionId});
  };

  const renderQuestions = () => {
    if (questions) {
      return questions.map(
        ({
          _id,
          question,
          generatedAt,
          isAnon,
          isHighlighted,
          ownerQuestionerId,
          likeCount,
        }) => {
          return (
            <div
              key={_id}
              id={_id}
              className={ownerQuestionerId._id}
              style={{background: isHighlighted && 'tomato'}}
            >
              <b>{isAnon ? 'Anon' : ownerQuestionerId.name}: </b>
              {question} <small>{generatedAt}</small>
              <br />
              <span style={{color: 'blue'}} onClick={handleDeleteQuestion}>
                delete
              </span>
              <span style={{color: 'red'}} onClick={handleHighlightQuestion}>
                highlight
              </span>
              <span style={{color: 'green'}}>{likeCount}</span>
            </div>
          );
        }
      );
    }
  };

  return (
    <Fragment>
      <p onClick={() => setIsPopularSelected(true)}>popular</p>
      <p onClick={() => setIsPopularSelected(false)}>recent</p>
      <p>total {questions.length} questions</p>
      {renderQuestions()}
    </Fragment>
  );
}

export default Questions;
