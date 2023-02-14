## [2.2.4](https://github.com/pmb0/nestjs-unleash/compare/v2.2.3...v2.2.4) (2023-02-14)


### Bug Fixes

* support nestjs 9 ([#446](https://github.com/pmb0/nestjs-unleash/issues/446)) ([5ab113e](https://github.com/pmb0/nestjs-unleash/commit/5ab113ec3079f5d4b2ea4ee40f16d3eb26271109))

## [2.2.3](https://github.com/pmb0/nestjs-unleash/compare/v2.2.2...v2.2.3) (2022-05-11)


### Bug Fixes

* **deps:** update dependency ip to v1.1.8 ([a39eb4c](https://github.com/pmb0/nestjs-unleash/commit/a39eb4c71f213eac629080d1f1ca53e5a96bdaf2))

## [2.2.2](https://github.com/pmb0/nestjs-unleash/compare/v2.2.1...v2.2.2) (2022-05-10)


### Bug Fixes

* **deps:** update dependency ip to v1.1.7 ([ec046f5](https://github.com/pmb0/nestjs-unleash/commit/ec046f57510132c40978e05e692f82c138cd63a9))

## [2.2.1](https://github.com/pmb0/nestjs-unleash/compare/v2.2.0...v2.2.1) (2022-05-10)


### Bug Fixes

* **deps:** update dependency ip to v1.1.6 ([8657bbd](https://github.com/pmb0/nestjs-unleash/commit/8657bbd5d9d39bf6b97f4656665de8fe5692d231))

# [2.2.0](https://github.com/pmb0/nestjs-unleash/compare/v2.1.0...v2.2.0) (2021-10-18)


### Features

* allow user defined context data ([#199](https://github.com/pmb0/nestjs-unleash/issues/199)) ([cb3b054](https://github.com/pmb0/nestjs-unleash/commit/cb3b0545ecaa441d403bcb394470e54ff499aaba))

# [2.1.0](https://github.com/pmb0/nestjs-unleash/compare/v2.0.0...v2.1.0) (2021-09-16)


### Features

* Add request to UnleashContext ([90b7966](https://github.com/pmb0/nestjs-unleash/commit/90b79664e18cbd10954ea4b3540ba0dbe45313fb))

# [2.0.0](https://github.com/pmb0/nestjs-unleash/compare/v1.4.5...v2.0.0) (2021-07-31)


### Bug Fixes

* upgrade NestJS to major version 8 ([d4a99a0](https://github.com/pmb0/nestjs-unleash/commit/d4a99a00f1cca855e0719e7a3df88585ab541ef2))


### BREAKING CHANGES

* The peer dependencies of NestJS and rxjs have been increased
to the next major version. To use the new nestjs-unleash version, your project
must be updated to NestJS 8 and rxjs 7.

## [1.4.5](https://github.com/pmb0/nestjs-unleash/compare/v1.4.4...v1.4.5) (2021-07-31)


### Bug Fixes

* last release contained breaking changes ([ef8c9ac](https://github.com/pmb0/nestjs-unleash/commit/ef8c9ac8c1293c9f164e8c9dff69aace6a741c85))

## [1.4.3](https://github.com/pmb0/nestjs-unleash/compare/v1.4.2...v1.4.3) (2021-07-25)


### Bug Fixes

* export `ToggleRepository` ([612ceb9](https://github.com/pmb0/nestjs-unleash/commit/612ceb943e0180ea16f3b2b16f1f020b32b37961))

## [1.4.2](https://github.com/pmb0/nestjs-unleash/compare/v1.4.1...v1.4.2) (2021-05-22)

### Bug Fixes

- add missing `UnleashService` export ([#120](https://github.com/pmb0/nestjs-unleash/pull/120)) ([12d81bb](https://github.com/pmb0/nestjs-unleash/commit/12d81bb52fb02867962e4242164c9e0ae2fec337))

## [1.4.1](https://github.com/pmb0/nestjs-unleash/compare/v1.4.0...v1.4.1) (2021-05-15)

### Bug Fixes

- use "ES2019" as output target ([#22](https://github.com/pmb0/nestjs-unleash/issues/22)) ([617b147](https://github.com/pmb0/nestjs-unleash/commit/617b1474204ea1b70db0ca272e92a7bf58bb36d9))

# [1.4.0](https://github.com/pmb0/nestjs-unleash/compare/v1.3.0...v1.4.0) (2021-03-02)

### Features

- add `userIdFactory` option ([#63](https://github.com/pmb0/nestjs-unleash/issues/63)) ([2831f1b](https://github.com/pmb0/nestjs-unleash/commit/2831f1ba7524ae67df2b838143216c68463c5865))

# [1.3.0](https://github.com/pmb0/nestjs-unleash/compare/v1.2.0...v1.3.0) (2021-03-02)

### Features

- make initial registration deactivatable ([#61](https://github.com/pmb0/nestjs-unleash/issues/61)) ([2b7f095](https://github.com/pmb0/nestjs-unleash/commit/2b7f095cb1c81b2234c01779ebd983c8d2f8a2ad))

# [1.2.0](https://github.com/pmb0/nestjs-unleash/compare/v1.1.1...v1.2.0) (2020-12-26)

### Features

- support custom HTTP config/headers ([20f3996](https://github.com/pmb0/nestjs-unleash/commit/20f3996ef942289855c9997103b87475fae887b1))
- warn if a toggle is stale ([28417e8](https://github.com/pmb0/nestjs-unleash/commit/28417e8c2c377f40b661c9a52e10f2b753b2a999))

## [1.1.1](https://github.com/pmb0/nestjs-unleash/compare/v1.1.0...v1.1.1) (2020-12-21)

### Bug Fixes

- main/types ([017976e](https://github.com/pmb0/nestjs-unleash/commit/017976edd415e434ece5edbbce780c48bb618389))

# [1.1.0](https://github.com/pmb0/nestjs-unleash/compare/v1.0.4...v1.1.0) (2020-12-07)

### Features

- add forRootAsync() ([aff1cb9](https://github.com/pmb0/nestjs-unleash/commit/aff1cb97bc5d268ac1f161583ec08e5923f576bf))

## [1.0.4](https://github.com/pmb0/nestjs-unleash/compare/v1.0.3...v1.0.4) (2020-12-07)

### Bug Fixes

- **register-client:** do not log line breaks ([b638602](https://github.com/pmb0/nestjs-unleash/commit/b63860209c7032999bf2e1465f70efe255ce0a5d))
- **unleash-client:** baseUrl in log was always undefined ([5faf9b7](https://github.com/pmb0/nestjs-unleash/commit/5faf9b77c2887647cba6e30957a4eaa5ce15b64a))

## [1.0.3](https://github.com/pmb0/nestjs-unleash/compare/v1.0.2...v1.0.3) (2020-12-05)

### Bug Fixes

- add missing logging ([ea1ce26](https://github.com/pmb0/nestjs-unleash/commit/ea1ce265d83e2171abfb4e3a1e5f5e556406358a))

## [1.0.2](https://github.com/pmb0/nestjs-unleash/compare/v1.0.1...v1.0.2) (2020-12-03)

### Bug Fixes

- add missing provider declaration ([c32b13d](https://github.com/pmb0/nestjs-unleash/commit/c32b13d6b607424820e56049a2f97dc12d5b299c))

## [1.0.1](https://github.com/pmb0/nestjs-unleash/compare/v1.0.0...v1.0.1) (2020-12-03)

### Bug Fixes

- enable GradualRolloutUserIdStrategy and GradualRolloutSessionIdStrategy ([afb355a](https://github.com/pmb0/nestjs-unleash/commit/afb355adf0c8626b81dae77514bf78fd41a991d9))
- ignore invalid CIDRs ([44e1f71](https://github.com/pmb0/nestjs-unleash/commit/44e1f7115d35ebaab5a46a1e0728abc9b5e311dd))

# 1.0.0 (2020-12-02)

### Bug Fixes

- do not inject scoped service into updater ([b28f6ba](https://github.com/pmb0/nestjs-unleash/commit/b28f6bac9a0bc72021f41856ef8108b38d497712))

### Features

- enable app registering ([1897ae5](https://github.com/pmb0/nestjs-unleash/commit/1897ae56c6afc1c3f99065a9d426996b3e8f2276))
