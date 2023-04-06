describe('smoke test', () => {
  test('returns an integer 2', () => {
    expect(1+1).toBe(2);
  });

  test('can import entry point without errors', () => {
<<<<<<< HEAD
    expect(() => require('../routes/index.js')).not.toThrow();
=======
    expect(() => require('../backend/routes/index.js')).not.toThrow();
>>>>>>> de5bac2 (resolving merge errors)
  });
  
});

