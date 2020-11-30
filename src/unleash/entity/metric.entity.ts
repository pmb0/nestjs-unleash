export class MetricEntity {
  id!: string

  yes = 0
  no = 0

  createdAt = new Date()

  constructor(data: Partial<MetricEntity>) {
    Object.assign(this, data)
  }
}
