export interface User {
  id: number
  name: string
}

export class UsersService {
  private users: User[] = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'bar' },
    { id: 4, name: 'bar' },
  ]

  find(id: number): User | undefined {
    return this.users.find((user) => user.id === id)
  }
}
