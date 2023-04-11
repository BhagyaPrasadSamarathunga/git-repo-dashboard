// const isPopularRepo = require('../src/js/home.js');
import {isPopularRepo} from '../src/js/home.js';

test('Returns the repo is not popular', function () {
	expect(isPopularRepo(1,2)).toBe('Not Popular');
});

test('Returns the repo is popular', function () {
	expect(isPopularRepo(100,300)).toBe('Popular');
});