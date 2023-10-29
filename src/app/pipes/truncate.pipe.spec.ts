import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same string if it is shorter than the limit', () => {
    const inputString = 'Short text';
    const output = pipe.transform(inputString, 20, '...');
    expect(output).toEqual(inputString);
  });

  it('should truncate the string if it is longer than the limit', () => {
    const inputString = 'This is a long text that needs to be truncated';
    const output = pipe.transform(inputString, 10, '...');
    expect(output).toEqual('This is a ...');
  });

  it('should truncate the string with default trail if trail is not provided', () => {
    const inputString = 'This is a long text that needs to be truncated';
    const output = pipe.transform(inputString, 10);
    expect(output).toEqual('This is a ...');
  });

  it('should handle empty string input', () => {
    const inputString = '';
    const output = pipe.transform(inputString, 10, '...');
    expect(output).toEqual('');
  });

  it('should handle null input', () => {
    const inputString = null;
    const output = pipe.transform(inputString, 10, '...');
    expect(output).toEqual('');
  });

  it('should handle undefined input', () => {
    const inputString = undefined;
    const output = pipe.transform(inputString, 10, '...');
    expect(output).toEqual('');
  });
});
