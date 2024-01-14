import { AbstractEntity, AbstractEntityWithSlug } from '@app/core/domain';
import { TRepositoryPort, TRepositoryWithSlugPort } from '@app/core/ports';
import { Logger } from '@nestjs/common';
import { HydratedDocument, Model, Types } from 'mongoose';

type TMongoEntity<TEntity extends AbstractEntity<TEntity>> = Omit<
  TEntity,
  'id'
> & { _id: Types.ObjectId };

type TMongoEntityWithSlug<TEntity extends AbstractEntityWithSlug<TEntity>> =
  Omit<TEntity, 'id'> & { _id: Types.ObjectId };

export abstract class MongoRepositoryAdapter<
  TEntity extends AbstractEntity<TEntity>,
> implements TRepositoryPort<TEntity>
{
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TEntity>) {}

  public async create(entity: TEntity): Promise<TEntity> {
    const id = entity?.id || this.createId();
    // save to database
    const data = await this.model.create<TMongoEntity<TEntity>>({
      _id: id,
      ...entity,
    });

    return this.serializeOne(data);
  }

  public async readById(id: string): Promise<TEntity> {
    const data = await this.model.findById(id);
    return this.serializeOne(data);
  }

  public async list(): Promise<TEntity[]> {
    const dataList = await this.model.find();
    return this.serializeMany(dataList);
  }

  // -----------------------------PROTECTED----------------------------------- //

  protected createId(): Types.ObjectId {
    return new Types.ObjectId();
  }

  protected serialize(entity: TMongoEntity<TEntity>): TEntity {
    const { _id, ...restEntity } = entity;
    // serialize id
    const id = _id?.toString('hex');

    return {
      id,
      ...restEntity,
    } as unknown as TEntity;
  }

  protected serializeOne(data: HydratedDocument<TEntity>): TEntity {
    return this.serialize(data.toObject<TEntity>());
  }

  protected serializeMany(dataList: HydratedDocument<TEntity>[]): TEntity[] {
    return dataList.map((data) => this.serializeOne(data));
  }
}

export abstract class MongoRepositoryWithSlugAdapter<
    TEntity extends AbstractEntityWithSlug<TEntity>,
  >
  extends MongoRepositoryAdapter<TEntity>
  implements TRepositoryWithSlugPort<TEntity>
{
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TEntity>) {
    super(model);
  }

  public async create(entity: TEntity): Promise<TEntity> {
    const id = entity?.id || this.createId();
    const slug = entity?.slug || (await this.createSlug(entity.name));
    // save to database
    const data = await this.model.create<TMongoEntityWithSlug<TEntity>>({
      _id: id,
      slug,
      ...entity,
    });

    return this.serializeOne(data);
  }

  public async createSlug(name: string, delimeter = ''): Promise<string> {
    return name.trim().toLowerCase().replaceAll(' ', delimeter);
  }

  public async readBySlug(slug: string): Promise<TEntity> {
    const data = await this.model.findOne({
      slug,
    });
    return this.serializeOne(data);
  }
}
