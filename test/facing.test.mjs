import test from 'node:test';
import assert from 'node:assert/strict';
import { toPoint, opposite, facing, normalizeBearing, headingFromEvent, sunNote, POINTS, SUN_NOTES } from '../src/assets/js/lib/facing.js';

test('cardinal and intercardinal bearings', () => {
  const cases = [[0, 'N'], [45, 'NE'], [90, 'E'], [135, 'SE'], [180, 'S'], [225, 'SW'], [270, 'W'], [315, 'NW'], [360, 'N']];
  for (const [b, p] of cases) assert.equal(toPoint(b), p, `bearing ${b}`);
});

test('sector edges at 22.5 degrees', () => {
  assert.equal(toPoint(22.4), 'N');
  assert.equal(toPoint(22.6), 'NE');
  assert.equal(toPoint(337.4), 'NW');
  assert.equal(toPoint(337.6), 'N');
});

test('wraps negative and large bearings', () => {
  assert.equal(normalizeBearing(-90), 270);
  assert.equal(normalizeBearing(725), 5);
  assert.equal(toPoint(-45), 'NW');
  assert.equal(toPoint('abc'), null);
});

test('backyard is the opposite point', () => {
  assert.equal(opposite('N'), 'S');
  assert.equal(opposite('SW'), 'NE');
  assert.equal(opposite('X'), null);
  const f = facing(100);
  assert.deepEqual([f.front, f.back, f.backBearing], ['E', 'W', 280]);
});

test('compass events: iOS heading, absolute alpha, relative alpha', () => {
  assert.equal(headingFromEvent({ webkitCompassHeading: 92 }), 92);
  assert.equal(headingFromEvent({ absolute: true, alpha: 90 }), 270);
  assert.equal(headingFromEvent({ absolute: false, alpha: 90 }), null);
  assert.equal(headingFromEvent(null), null);
});

test('every point has a sun note in English and Spanish', () => {
  for (const p of POINTS) {
    assert.ok(SUN_NOTES.en[p].length > 40);
    assert.ok(SUN_NOTES.es[p].length > 40);
  }
  assert.match(sunNote('W', 'en'), /afternoon/);
  assert.match(sunNote('W', 'es'), /tarde/);
});
