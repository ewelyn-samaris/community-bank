export interface IRepository<T> {
  save(entity: T): Promise<T>;
  findAll(): Promise<T[]>;
}
