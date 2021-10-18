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

- [Setup](#setup)
  - [Synchronous configuration](#synchronous-configuration)
  - [Asynchronous configuration](#asynchronous-configuration)
- [Usage in controllers or providers](#usage-in-controllers-or-providers)
  - [Custom context](#custom-context)
  - [Configuration](#configuration)
  - [Default strategies](#default-strategies)
  - [Custom strategies](#custom-strategies)
- [License](#license)

# Setup

```sh
$ npm install --save nestjs-unleash
```

Import the module with `UnleashModule.forRoot(...)` or `UnleashModule.forRootAsync(...)`.

## Synchronous configuration

Use `UnleashModule.forRoot()`. Available options are described in the [UnleashModuleOptions interface](#configuration).

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

## Asynchronous configuration

If you want to use your [Unleash options](#configuration) dynamically, use `UnleashModule.forRootAsync()`. Use `useFactory` and `inject` to import your dependencies. Example using the `ConfigService`:

```ts
@Module({
  imports: [
    UnleashModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        url: config.get("UNLEASH_URL"),
        appName: config.get("UNLEASH_APP_NAME"),
        instanceId: config.get("UNLEASH_INSTANCE_ID"),
        refreshInterval: config.get("UNLEASH_REFRESH_INTERVAL"),
        metricsInterval: config.get("UNLEASH_METRICS_INTERVAL"),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MyModule {}
```

# Usage in controllers or providers

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

## Custom context

The `UnleashContext` grants access to request related information like user ID or IP address.

In addition, the context can be dynamically enriched with further information and subsequently used in a separate strategy:

```ts
export interface MyCustomData {
  foo: string;
  bar: number;
}

@Injectable()
class SomeProvider {
  constructor(private readonly unleash: UnleashService<MyCustomData>) {}

  someMethod() {
    return this.unleash.isEnabled("someToggleName", undefined, {
      foo: "bar",
      bar: 123,
    })
      ? "feature is active"
      : "feature is not active";
  }
}

// Custom strategy with custom data:
@Injectable()
export class MyCustomStrategy implements UnleashStrategy {
  name = "MyCustomStrategy";

  isEnabled(
    _parameters: unknown,
    context: UnleashContext<MyCustomData>
  ): boolean {
    return context.customData?.foo === "bar";
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

  /**
   * Additional options for the HTTP request to the Unleash server, e.g. custom
   * HTTP headers
   */
  http?: AxiosRequestConfig;

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

  /**
   * `nestjs-unleash` sends an initial registration request to the unleash server at startup. This behavior can be disabled by this option.
   */
  disableRegistration?: boolean;

  /**
   * Some strategies depend on the user ID of the currently logged in user. The
   * user ID is expected by default in `request.user.id`. To customize this
   * behavior, a custom user ID factory can be provided.
   */
  userIdFactory?: (request: Request<{ id: string }>) => string;
}
```

## Default strategies

This module supports the [official standard activation strategies](https://docs.getunleash.io/docs/user_guide/activation_strategy). They do not need to be activated separately and work out of the box.

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
