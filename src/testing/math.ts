export function mockRandom(value: number): jest.SpyInstance {
  // https://xkcd.com/221/
  return jest.spyOn(global.Math, 'random').mockImplementation(() => value)
}
