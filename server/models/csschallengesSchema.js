const mongoose = require("mongoose");

const csschallengesSchema = mongoose.Schema(
  {
    id: String,
    title: String,
    sdesc: String,
    description: String,
    img: String,
    status: String,
    date: { from: String, to: String },
    submissions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        html: {
          type: String,
          required: true,
        },
        css: {
          type: String,
          required: true,
        },
        status: String,
        isSelected: Boolean,
        elementtype: String,
        votes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);


csschallengesSchema.methods.vote = function (userId, submissionId) {
  const submission = this.submissions.id(submissionId);

  // Check if the user has already voted for this submission
  if (submission.votes.includes(userId)) {
    throw new Error("You have already voted for this submission");
  }

  // Check if the user has exceeded their maximum of 3 votes
  const userVotes = this.submissions.reduce((count, submission) => {
    return count + (submission.votes.includes(userId) ? 1 : 0);
  }, 0);

  if (userVotes >= 3) {
    throw new Error("You have reached your maximum of 3 votes");
  }

  // Add the user's vote to the submission
  submission.votes.push(userId);
};





csschallengesSchema.methods.getStatus = function () {
  const currentDate = new Date();
  const startDate = new Date(this.date.from);
  const endDate = new Date(this.date.to);
  const votingEndDate = new Date(this.date.to);
  votingEndDate.setDate(votingEndDate.getDate() + this.votingPeriod);

  if (currentDate < startDate) {
    const timeDiff = Math.abs(startDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `${diffDays} day(s) until the challenge starts`;
  } else if (currentDate >= startDate && currentDate <= endDate) {
    const timeDiff = Math.abs(endDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `Ongoing`
    // return `${diffDays} day(s) left in the challenge`;
  } else if (currentDate > endDate && currentDate <= votingEndDate) {
    const timeDiff = Math.abs(votingEndDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `${diffDays} day(s) left in the voting period`;
  } else {
    return "Challenge has finished";
  }
};
const Csschallengesdb = mongoose.model("csschallenges", csschallengesSchema);

module.exports = Csschallengesdb;
