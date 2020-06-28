import mongoose from 'mongoose';

import Question from '../../models/question';
import Questioner from '../../models/questioner';
import Event from '../../models/event';

export default async (req, res) => {
  let {questionerId, eventId, question} = req.body;
  if (!questionerId) {
    const {_id} = await Questioner.create({
      _id: mongoose.Types.ObjectId(),
    });
    questionerId = _id;
  }

  const questionId = mongoose.Types.ObjectId();
  Question.create({
    _id: questionId,
    ownerQuestionerId: questionerId,
    eventId,
    question,
  });

  const questioner = await Questioner.findById(questionerId).select({
    questions: 1,
  });
  const event = await Event.findById(eventId).select({questions: 1});
  questioner.questions.push(questionId);
  event.questions.push(questionId);
  event.save();
  questioner.save();

  res.send();
};
