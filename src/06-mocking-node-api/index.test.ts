import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 3000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 3000);

    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 2000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 2000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinMock = join as jest.Mock;
    const existsMock = existsSync as jest.Mock;

    joinMock.mockReturnValue('/full/path/to/file.txt');
    existsMock.mockReturnValue(false);

    await readFileAsynchronously('file.txt');

    expect(joinMock).toHaveBeenCalledWith(expect.any(String), 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    const joinMock = join as jest.Mock;
    const existsMock = existsSync as jest.Mock;

    joinMock.mockReturnValue('/path');
    existsMock.mockReturnValue(false);

    const result = await readFileAsynchronously('missing.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const joinMock = join as jest.Mock;
    const existsMock = existsSync as jest.Mock;
    const readFileMock = readFile as jest.Mock;

    joinMock.mockReturnValue('/existing.txt');
    existsMock.mockReturnValue(true);
    readFileMock.mockResolvedValue(Buffer.from('Hello from file!'));

    const result = await readFileAsynchronously('existing.txt');

    expect(result).toBe('Hello from file!');
  });
});
