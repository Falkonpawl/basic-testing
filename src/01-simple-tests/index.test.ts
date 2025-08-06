import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const INPUT = {
      a: 5,
      b: 3,
      action: Action.Add,
    };
    const RESULT = 8;
    const actualResult = simpleCalculator(INPUT);
    expect(actualResult).toBe(RESULT);
  });

  test('should subtract two numbers', () => {
    const INPUT = {
      a: 5,
      b: 3,
      action: Action.Subtract,
    };
    const RESULT = 2;
    const actualResult = simpleCalculator(INPUT);
    expect(actualResult).toBe(RESULT);
  });

  test('should multiply two numbers', () => {
    const INPUT = {
      a: 5,
      b: 3,
      action: Action.Multiply,
    };
    const RESULT = 15;
    const actualResult = simpleCalculator(INPUT);
    expect(actualResult).toBe(RESULT);
  });

  test('should divide two numbers', () => {
    const INPUT = {
      a: 10,
      b: 5,
      action: Action.Divide,
    };
    const RESULT = 2;
    const actualResult = simpleCalculator(INPUT);
    expect(actualResult).toBe(RESULT);
  });

  test('should exponentiate two numbers', () => {
    const INPUT = {
      a: 2,
      b: 5,
      action: Action.Exponentiate,
    };
    const RESULT = 32;
    const actualResult = simpleCalculator(INPUT);
    expect(actualResult).toBe(RESULT);
  });

  test('should return null for invalid action', () => {
    const INPUT = {
      a: 2,
      b: 5,
      action: '^&^&',
    };
    const RESULT = null;
    const actualResult = simpleCalculator(INPUT);
    expect(actualResult).toBe(RESULT);
  });

  test('should return null for invalid arguments', () => {
    const INPUT = {
      a: 'er',
      b: 'er',
      action: Action.Add,
    };
    const RESULT = null;
    const actualResult = simpleCalculator(INPUT);
    expect(actualResult).toBe(RESULT);
  });
});
