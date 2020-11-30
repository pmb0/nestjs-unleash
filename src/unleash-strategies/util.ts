import * as murmurHash3 from 'murmurhash3js'

const DEFAULT_NORMALIZER = 100

export function normalizedValue(
  id: string,
  groupId: string,
  normalizer = DEFAULT_NORMALIZER,
): number {
  return (murmurHash3.x86.hash32(`${groupId}:${id}`) % normalizer) + 1
}

export function randomGenerator(): number {
  // eslint-disable-next-line no-magic-numbers
  return Math.round(Math.random() * 100) + 1
}
