import { getGreeting } from '../src';

describe('smoke test', () => {
  test('returns a string', () => {
    expect(typeof getGreeting()).toBe('string');
  });

  test('can import entry point without errors', () => {
    expect(() => require('../routes/index.js')).not.toThrow();
  });
  
});

