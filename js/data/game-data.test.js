import assert from 'assert';
import {initialState, setLives, setStats, tick, nextLevel} from './data';

describe(`Game`, () => {
  describe(`Character lives`, () => {
    it(`should update lives`, () => {
      assert.equal(setLives(initialState, 1).lives, 1);
    });
    it(`shouldn't allow set negative lives`, () => {
      const setNegativeLives = () => {
        setLives(initialState, -1);
      };
      assert.throws(setNegativeLives);
    });
    it(`should have 3 lives in start game`, () => {
      assert.equal(initialState.lives, 3);
    });
  });

  describe(`character next level`, () => {
    it(`should update level`, () => {
      assert.equal(nextLevel(initialState).level, 2);
      assert.equal(nextLevel(Object.assign({}, initialState, {
        level: 10
      })), false);
    });
    it(`should bedins game at 1 level`, () => {
      assert.equal(initialState.level, 1);
    });
  });

  describe(`Character set point`, () => {
    it(`should correct getPoint`, () => {
      assert.equal(setStats(true, 15).point, 100);
      assert.equal(setStats(true, 25).point, 150);
      assert.equal(setStats(true, 5).point, 50);
      assert.equal(setStats(true, 0).point, 0);
      assert.equal(setStats(false, 15).point, 0);
      assert.equal(setStats(false, 25).point, 0);
      assert.equal(setStats(false, 5).point, 0);
    });
    it(`should correct getStats`, () => {
      assert.equal(setStats(true, 15).stats, `stats__result--correct`);
      assert.equal(setStats(true, 25).stats, `stats__result--fast`);
      assert.equal(setStats(true, 5).stats, `stats__result--slow`);
      assert.equal(setStats(true, 0).stats, `stats__result--wrong`);
      assert.equal(setStats(false, 15).stats, `stats__result--wrong`);
      assert.equal(setStats(false, 25).stats, `stats__result--wrong`);
      assert.equal(setStats(false, 5).stats, `stats__result--wrong`);
    });
    it(`should not correct time in function`, () => {
      const setNegativeTime = () => {
        setStats(true, -10);
      };
      const setBiggestTime = () => {
        setStats(true, 40);
      };
      assert.throws(setNegativeTime);
      assert.throws(setBiggestTime);
    });
  });

  describe(`Character tick time function`, () => {
    it(`should correct time`, () => {
      assert.equal(tick(initialState).time, 29);
      assert.equal(tick(Object.assign({}, initialState, {
        time: 25
      })).time, 24);
    });
  });
});
