<div align="center">
  <h1>NestJS-Unleash</h1>
  <a href="https://www.npmjs.com/package/nestjs-unleash">
    <img src="https://badge.fury.io/js/nestjs-unleash.svg">
  </a>
  <a href="https://coveralls.io/r/pmb0/nestjs-unleash?branch=master">
    <img src="https://img.shields.io/coveralls/pmb0/nestjs-unleash/master.svg">
  </a>
  <a href="https://github.com/pmb0/nestjs-unleash/actions?query=workflow%3ATests">
    <img src="https://github.com/pmb0/nestjs-unleash/workflows/Tests/badge.svg">
  </a>
  <p>
    <a href="https://github.com/Unleash/unleash">Unleash</a> module for <a href="https://nestjs.com/">NestJS</a>
  </p>
</div>

# Table of contents <!-- omit in toc -->

- [Usage](#usage)
  - [Configuration](#configuration)
  - [Custom strategies](#custom-strategies)
- [License](#license)

# Usage

```sh
$ npm install --save nestjs-unleash
```

Import the module with `UnleashModule.forRoot(...)`:

```ts
@Module({
  imports: [
    UnleashModule.forRoot({
      url: "https://example.com/unleash",
      appName: "my-app-name",
      instanceId: "my-unique-instance",
    }),
  ],
})
export class MyModule {}
```

In your controller use the `UnleashService` or the `@IfEnabled(...)` route decorator:

```ts
import { UnleashService } from "nestjs-unleash";

@Controller()
@UseGuards(UserGuard)
export class AppController {
  constructor(private readonly unleash: UnleashService) {}

  @Get("/")
  index(): string {
    // the UnleashService can be used in all controllerrs and provideers
    return this.unleash.isEnabled("test")
      ? "feature is active"
      : "feature is not active";
  }

  // Throws a NotFoundException if the feature is not enabled
  @IfEnabled("test")
  @Get("/foo")
  getFoo(): string {
    return "my foo";
  }
}
```

## Configuration

NestJS-Unleash can be configured with the following options:

```ts
interface UnleashModuleOptions {
  /**
   * If "true", registers `UnleashModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   *
   * @default true
   */
  global?: boolean;

  /**
   * URL of your Unleash server
   *
   * @example http://unleash.herokuapp.com/api/client
   */
  url: string;

  /**
   * Name of the application seen by unleash-server
   */
  appName: string;

  /**
   * Instance id for this application (typically hostname, podId or similar)
   */
  instanceId: string;

  timeout?: number;

  /**
   * At which interval, in milliseconds, will this client update its feature
   * state
   */
  refreshInterval?: number;

  /**
   * At which interval, in milliseconds, will this client send metrics
   */
  metricsInterval?: number;

  /**
   * Array of custom strategies. These classes mus implement the `UnleashStrategy` interface.
   */
  strategies?: Type<UnleashStrategy>[];
}
```

## Custom strategies

In order to create a custom strategy you have to create a class wich inplements the `UnleashStrategy` interface:

```ts
import { UnleashContext } from "nestjs-unleash";

export interface UnleashStrategy {
  /**
   * Must match the name you used to create the strategy in your Unleash
   * server UI
   */
  name: string;

  /**
   * Determines whether the feature toggle is active
   *
   * @param parameters Custom paramemters as configured in Unleash server UI
   * @param context applicaton/request context, i.e. UserID
   */
  isEnabled(parameters: unknown, context: UnleashContext): boolean;
}
```

Example custom strategy:

```ts
import { Injectable } from "@nestjs/common";
import { UnleashContext, UnleashStrategy } from "nestjs-unleash";

@Injectable()
export class MyCustomStrategy implements UnleashStrategy {
  name = "MyCustomStrategy";

  isEnabled(parameters: any, context: UnleashContext): boolean {
    return Math.random() < 0.5;
  }
}
```

Now you can use it your module setup as follows:

```ts
import { MyCustomStrategy } from "./my-custom-strategy";

@Module({
  imports: [
    UnleashModule.forRoot({
      // ...
      strategies: [MyCustomStrategy],
    }),
  ],
})
export class ApplicationModule {}
```

# License

nestjs-unleash is distributed under the MIT license. [See LICENSE](./LICENSE) for details.
