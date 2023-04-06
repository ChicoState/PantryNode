describe('smoke test', () => {
  test('returns an integer 2', () => {
    expect(1+1).toBe(2);
  });

  test('can import entry point without errors', () => {
    expect(() => require('../backend/routes/index.js')).not.toThrow();
  });
  
});

