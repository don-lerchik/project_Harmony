export const settingGames = Object.freeze({
  timeQuestion: 30,
  levelsCount: 10,
  maxLives: 3,
  serverId: `Vgan`
});
export const statsResultList = Object.freeze({
  wrong: `stats__result--wrong`,
  slow: `stats__result--slow`,
  fast: `stats__result--fast`,
  correct: `stats__result--correct`,
  unknown: `stats__result--unknown`
});
export const initialState = Object.freeze({
  name: ``,
  level: 1,
  lives: settingGames.maxLives,
  time: settingGames.timeQuestion,
  point: 0,
  answers: new Array(settingGames.levelsCount).fill(statsResultList.unknown)
});
export const setLives = (game, lives) => {
  if (lives < 0) {
    throw new RangeError(`Can't set negative lives`);
  }
  const newGame = Object.assign({}, game);
  newGame.lives = lives;
  return newGame;
};

export const getLevel = (number, question) => question[number];

export const nextLevel = (game) => {
  if (game.level >= settingGames.levelsCount) {
    return false;
  }
  const newGame = Object.assign({}, game);
  ++newGame.level;
  return newGame;
};
export const setStats = (answer = false, time) => {
  if (time < 0) {
    throw new RangeError(`Can't set negative time`);
  }
  if (time > settingGames.timeQuestion) {
    throw new RangeError(`Can't set time. Use time in interval 0 ... ${settingGames.timeQuestion}`);
  }
  let result = {
    stats: statsResultList.wrong,
    point: 0
  };
  if (time === 0) {
    return result;
  }
  if (answer) {
    result.point = 100;
    result.stats = statsResultList.correct;
    if (time >= 20) {
      result.stats = statsResultList.fast;
      result.point += 50;
    }
    if (time < 10) {
      result.stats = statsResultList.slow;
      result.point -= 50;
    }
  }
  return result;
};
export const setResult = (game, result) => {
  const newGame = Object.assign({}, game, {
    answers: [...game.answers]
  });
  newGame.point += result.point;
  const index = newGame.answers.indexOf(statsResultList.unknown);
  newGame.answers[index] = result.stats;
  return newGame;
};
export const tick = (game) => {
  const newGame = Object.assign({}, game);
  newGame.time--;
  return newGame;
};

export const countPoint = (answer, live) => {
  const point = {
    simple: 0,
    fast: {
      count: 0,
      sum: 0
    },
    slow: {
      count: 0,
      sum: 0
    },
    live: {
      count: 0,
      sum: 0
    }
  };
  answer.forEach((element) => {
    if (element !== statsResultList.wrong) {
      point.simple += 100;
    }
    if (element === statsResultList.fast) {
      point.fast.count += 1;
      point.fast.sum += 50;
    }
    if (element === statsResultList.slow) {
      point.slow.count++;
      point.slow.sum -= 50;
    }
  });
  point.live.count = live;
  point.live.sum = live * 50;
  return point;
};
