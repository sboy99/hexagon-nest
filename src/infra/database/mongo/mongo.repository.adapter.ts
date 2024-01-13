import { AbstractEntity } from '@app/common/abstracts';
import { IRepositoryPort } from '@app/core/ports';
import { Logger } from '@nestjs/common';
import { HydratedDocument, Model, Types } from 'mongoose';

type TMongoEntity<TEntity extends AbstractEntity<TEntity>> = Omit<
  TEntity,
  'id'
> & { _id: Types.ObjectId };

export abstract class MongoRepositoryAdapter<
  TEntity extends AbstractEntity<TEntity>,
> implements IRepositoryPort<TEntity>
{
  protected abstract readonly logger: Logger;

  constructor(private readonly model: Model<TEntity>) {}

  public async create(entity: TEntity): Promise<TEntity> {
    const id = entity?.id || this.createId();
    const slug = entity?.slug || (await this.createSlug(entity.name));
    // save to database
    const data = await this.model.create<TMongoEntity<TEntity>>({
      _id: id,
      slug,
      ...entity,
    });

    return this.serializeOne(data);
  }

  public async createSlug(name: string, delimeter = ''): Promise<string> {
    return name.trim().toLowerCase().replaceAll(' ', delimeter);
  }

  public async readById(id: string): Promise<TEntity> {
    const data = await this.model.findById(id);
    return this.serializeOne(data);
  }

  public async readBySlug(slug: string): Promise<TEntity> {
    const data = await this.model.findOne({
      slug,
    });
    return this.serializeOne(data);
  }

  public async list(): Promise<TEntity[]> {
    const dataList = await this.model.find();
    return this.serializeMany(dataList);
  }

  // -----------------------------PRIVATE----------------------------------- //

  private createId(): Types.ObjectId {
    return new Types.ObjectId();
  }

  private serialize(entity: TMongoEntity<TEntity>): TEntity {
    const { _id, ...restEntity } = entity;
    // serialize id
    const id = _id?.toString('hex');

    return {
      id,
      ...restEntity,
    } as unknown as TEntity;
  }

  private serializeOne(data: HydratedDocument<TEntity>): TEntity {
    return this.serialize(data.toObject<TEntity>());
  }

  private serializeMany(dataList: HydratedDocument<TEntity>[]): TEntity[] {
    return dataList.map((data) => this.serializeOne(data));
  }
}
