import current from '@/store/current.module';

describe('current module', () => {
  describe('mutations', () => {
    it('set message state when called success', () => {
      const { success } = current.mutations;
      const state = { message: '' };

      success(state, 'new message');

      expect(state.message).toBe('new message');
    });
  });
});
