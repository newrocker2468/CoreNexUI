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

csschallengesSchema.methods.getSortedSubmissions = function () {
  const sortedSubmissions = this.submissions.sort(
    (a, b) => b.votes.length - a.votes.length
  );
  return sortedSubmissions;
};

csschallengesSchema.methods.vote = function (userId, submissionId) {
  const currentDate = new Date();
  const votingStartDate = new Date(this.date.to);
  const votingEndDate = new Date(this.date.to);
  votingEndDate.setDate(votingEndDate.getDate() + 4);

  if (currentDate < votingStartDate) {
    const timeDiff = Math.abs(
      votingStartDate.getTime() - currentDate.getTime()
    );
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `Voting period will start in ${diffDays} day(s)`;
  }

  if (currentDate > votingEndDate) {
    return "Voting period has ended";
  }

  const submission = this.submissions.id(submissionId);

  if (submission.votes.includes(userId)) {
    submission.votes.pull(userId);
    return "Vote removed";
  }

  const userVotes = [
    ...new Set(this.submissions.flatMap((submission) => submission.votes)),
  ].filter((vote) => vote.equals(userId)).length;

  if (userVotes >= 3) {
    return {
      message:
        "You have reached your maximum of 3 votes. You can revoke and reuse your votes before the voting period ends.",
      remainingVotes: 0,
    };
  }

  submission.votes.push(userId);
  const remainingVotes = 3 - userVotes - 1;
  return {
    message: "Vote added",
    remainingVotes: remainingVotes,
  };
};

csschallengesSchema.methods.getStatus = function () {
  const currentDate = new Date();
  const startDate = new Date(this.date.from);
  const endDate = new Date(this.date.to);
  const votingEndDate = new Date(this.date.to);
  votingEndDate.setDate(votingEndDate.getDate() + 4);

  if (currentDate < startDate) {
    const timeDiff = Math.abs(startDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `Starts in ${diffDays} day(s)`;
  } else if (currentDate >= startDate && currentDate <= endDate) {
    const timeDiff = Math.abs(endDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `Ongoing`;
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
