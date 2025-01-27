export default async function RandomQuoteGenerator() {
  const quotes = [
    "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie",
    "The most damaging phrase in the language is: 'It's always been done that way.' - Grace Hopper",
    "The best way to predict the future is to invent it. - Alan Kay",
    "The most important property of a program is whether it accomplishes the intention of its user. - C.A.R. Hoare",
    "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
    "The best thing about a boolean is even if you are wrong, you are only off by a bit. - Anonymous",
    "The best method for accelerating a computer is the one that boosts it by 9.8 m/s^2. - Anonymous",
    "The best way to get accurate information on Usenet is to post something wrong and wait for corrections. - Matthew Austern",
    "The best performance improvement is the transition from the nonworking state to the working state. - J. Osterhout",
    "The best way to get the right answer on the internet is not to ask a question; it's to post the wrong answer. - Cunningham's Law",
    "The best way to learn is to do; the worst way to teach is to talk. - Paul Halmos",
    "The best way to learn is to teach. - Frank Oppenheimer",
    "The best way to learn is to learn by doing. - Richard Branson",
    "Programs must be written for people to read, and only incidentally for machines to execute. - Harold Abelson",
    "I'm not a great programmer; I'm just a good programmer with great habits. - Kent Beck",
    "Any sufficiently advanced technology is indistinguishable from magic. - Arthur C. Clarke",
    "Code is like humor. When you have to explain it, it’s bad. - Cory House",
    "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
    "In software, the most beautiful code, the most beautiful functions, and the most beautiful programs are sometimes not there at all. - Jon Bentley",
    "If you don't fail at least 90% of the time, you're not aiming high enough.  - Alan Kay",
    "Optimism is an occupational hazard of programming: feedback is the treatment. - Kent Beck",
    "An expert is a person who has made all the mistakes that can be made in a very narrow field. - Niels Bohr",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
  ];
  const random = Math.floor(Math.random() * quotes.length);
  return quotes[random];
}
