import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { BoilerParts } from './boiler-parts.model'
import { IBoilerPartsFilter, IBoilerPartsQuery } from './types'

@Injectable()
export class BoilerPartsService {
  constructor(
    @InjectModel(BoilerParts)
    private boilerPartsModel: typeof BoilerParts,
  ) {}

  async paginateAndFilter(
    query: IBoilerPartsQuery,
  ): Promise<{ count: number; rows: BoilerParts[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<IBoilerPartsFilter>;

    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [+query.priceFrom, +query.priceTo],
      };
    }

    if (query.boiler) {
      filter.boiler_manufacturer = JSON.parse(decodeURIComponent(query.boiler));
    }

    if (query.parts) {
      filter.parts_manufacturer = JSON.parse(decodeURIComponent(query.parts));
    }

    return this.boilerPartsModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  }

  async bestsellers(): Promise<{ count: number; rows: BoilerParts[] }> {
    const { count, rows } = await this.boilerPartsModel.findAndCountAll({
      where: { bestseller: true },
      order: [['id', 'ASC']],
    });
  
    const updatedRows = rows.map((item, index) => {
      if (index < 23) {
        item.images = JSON.stringify([
          `/images/boiler-parts/part-${index + 1}.png`,
        ]);
      } else {
        item.images = JSON.stringify(['/images/boiler-parts/placeholder.webp']);
      }
      return item;
    });
  
    return { count, rows: updatedRows };
  }

  async new(): Promise<{ count: number; rows: BoilerParts[] }> {
    const { count, rows } = await this.boilerPartsModel.findAndCountAll({
      where: { new: true },
      order: [['id', 'ASC']],
    });
  
    const updatedRows = rows.map((item, index) => {
      if (index < 23) {
        item.images = JSON.stringify([
          `/images/boiler-parts/part-${index + 1}.webp`,
        ]);
      } else {
        item.images = JSON.stringify(['/images/boiler-parts/placeholder.webp']);
      }
      return item;
    });
  
    return { count, rows: updatedRows };
  }

  async findOne(id: number | string): Promise<BoilerParts> {
    return this.boilerPartsModel.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<BoilerParts> {
    return this.boilerPartsModel.findOne({
      where: { name },
    });
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: BoilerParts[] }> {
    return this.boilerPartsModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
