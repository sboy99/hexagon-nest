import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { IProductController } from './product.controller.interface';
import { TApiResponseAsync } from '@app/common/types';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
  ListProductsResponseDto,
} from '@app/dtos/product';
import { ProductService } from '@app/core/services';
import { Product, User } from '@app/core/domain/entities';
import { UserCategory } from '@app/core/domain/enums';
import { ProductTransformer } from '@app/adapters/transformers';

@Controller('products')
export class ProductController implements IProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productTransformer: ProductTransformer,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createProduct(
    @Body() dto: CreateProductRequestDto,
  ): TApiResponseAsync<CreateProductResponseDto> {
    const product = await this.productService.create(dto.name, dto.price);

    // transfrom result
    const data = new CreateProductResponseDto(product);

    return {
      code: 'created',
      message: `product created successfully`,
      data,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async listProducts(): TApiResponseAsync<ListProductsResponseDto[]> {
    const products = await this.productService.list();

    const dataList = products.map(
      (product) => new ListProductsResponseDto(product),
    );

    return {
      code: 'listed',
      message: `Listed products successfully`,
      data: dataList,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async readProduct(
    @Param('id') id: string,
  ): TApiResponseAsync<Partial<Product>> {
    const user = new User({
      id: '123',
      category: [UserCategory.USER],
      name: 'Sagar',
      slug: 'sagar',
    });

    const product = await this.productService.read(id);

    // transfrom result
    const data = this.productTransformer.transformReadProduct(user, product);

    return {
      code: 'read',
      message: `product read successfully`,
      data,
    };
  }
}
