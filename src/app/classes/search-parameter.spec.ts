import { SearchParameter } from './search-parameter';

describe('Create valid SearchParameter', () => {
  it('should create a valid instance', () => {
    expect(new SearchParameter("Search string", true, true, true, true, true, true)).toBeTruthy();
  });
});