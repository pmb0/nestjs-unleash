import { UnleashModuleOptions } from '.'
import { Request } from '../unleash-strategies'
import { UnleashContext } from './unleash.context'

function createRequest(
  data: Partial<Request<{ id: string }>> = {},
): Request<{ id: string }> {
  return data
}

interface MyCustomData {
  foo: boolean
  bar: string
}

describe('UnleashContext', () => {
  let context: UnleashContext
  let req: Request<{
    id: string
  }>

  beforeEach(() => {
    req = createRequest({
      ip: '1.2.3.4',
      user: {
        id: '123',
      },
      session: {
        id: 'abc',
      },
    })
    context = new UnleashContext(req, {} as UnleashModuleOptions)
  })

  test('getUserId()', () => {
    expect(context.getUserId()).toBe('123')
  })

  test('getRemoteAddress()', () => {
    expect(context.getRemoteAddress()).toBe('1.2.3.4')
  })

  test('getSessionId()', () => {
    expect(context.getSessionId()).toBe('abc')

    // @ts-ignore
    context.request.session = { sessionId: 'def' }
    expect(context.getSessionId()).toBe('def')
  })

  test('getRequest()', () => {
    expect(context.getRequest()).toStrictEqual(req)

    // @ts-ignore
    context.request = { hello: 'world' }
    expect(context.getRequest()).toStrictEqual({ hello: 'world' })
  })

  describe('Custom data', () => {
    test('extend()', () => {
      const context = new UnleashContext<MyCustomData>(
        req,
        {} as UnleashModuleOptions,
      )
      const extendedContext = context.extend({ foo: true, bar: 'baz' })
      expect(extendedContext.customData).toEqual({ foo: true, bar: 'baz' })
    })
  })
})
