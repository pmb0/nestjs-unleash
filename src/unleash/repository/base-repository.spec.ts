import { BaseRepository } from './base-repository'

interface MyEntity {
  id: string
  name: string
}

class MyRepository extends BaseRepository<MyEntity> {}

const row: MyEntity = { id: '1', name: 'my name' }

describe('BaseRepository', () => {
  let repository: BaseRepository<MyEntity>

  beforeEach(() => {
    repository = new MyRepository()
  })

  test('updateOrCreate()', () => {
    repository.updateOrCreate('1', row)
    expect(repository).toMatchSnapshot()

    repository.updateOrCreate('1', { id: '1', name: 'my new name' })
    expect(repository).toMatchSnapshot()
  })

  test('create()', () => {
    repository.create(row)
    expect(repository).toMatchSnapshot()
  })

  test('update()', () => {
    repository.create(row)
    repository.update('1', { id: '1', name: 'updated' })
    expect(repository).toMatchSnapshot()
  })

  test('delete()', () => {
    repository.create(row)
    repository.delete('1')
    expect(repository.findAll()).toHaveLength(0)
  })

  test('find()', () => {
    expect(repository.find('1')).toBeUndefined()

    repository.create(row)
    expect(repository.find('1')).toEqual(row)
  })

  test('findAll()', () => {
    expect(repository.findAll()).toHaveLength(0)

    repository.create(row)
    repository.create({ id: '2', name: 'other' })
    expect(repository.findAll()).toMatchSnapshot()
  })
})
