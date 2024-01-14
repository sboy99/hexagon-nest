import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { TProductControllerPort } from './product.controller.port';
import {
  TApiResponseAsync,
  Product,
  User,
  UserCategoryEnum,
} from '@app/core/domain';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
  ListProductsResponseDto,
} from '@app/dtos/product';
import { ProductTransformerPort, TProductTransformerPort } from '@app/adapters';
import { ProductServicePort, TProductServicePort } from '@app/core/ports';

@Controller('products')
export class ProductController implements TProductControllerPort {
  constructor(
    @Inject(ProductServicePort)
    private readonly productService: TProductServicePort,
    @Inject(ProductTransformerPort)
    private readonly productTransformer: TProductTransformerPort,
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
  @Get('count')
  public async countProducts(): TApiResponseAsync<number> {
    const count = await this.productService.count();
    return {
      code: 'read',
      data: count,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async readProduct(
    @Param('id') id: string,
  ): TApiResponseAsync<Partial<Product>> {
    const user = new User({
      id: '123',
      category: [UserCategoryEnum.USER, UserCategoryEnum.ADMIN],
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
