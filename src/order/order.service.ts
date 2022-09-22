import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.OrderCreateInput) {
    return this.prisma.order.create({
      data,
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id: id },
    });
  }

  update(id: number, data: Prisma.OrderCreateInput) {
    return this.prisma.order.update({
      where: { id: id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.order.delete({
      where: { id: id },
    });
  }

  getStatistic() {
    return this.prisma.$queryRaw`
      WITH cte AS (
        select 
          date_trunc('day', tb."createdAt") o_date,
          cast(count(case when tb."status" = 'AWAITED' then 1 else null end) as decimal)  count_awaited,
          cast(count(case when tb."status" = 'CANCELLED' then 1 else null end) as decimal) count_canceled,
          cast(count(case when tb."status" = 'APPROVED' then 1 else null end) as decimal) count_approved
        from "Order" tb
        group by o_date
        )
        select
          o_date
          count_awaited,
          count_canceled,
          count_approved,
          count_awaited / (count_awaited + count_canceled + count_approved) * 100 percent_awaited,
          count_canceled / (count_awaited + count_canceled + count_approved) * 100 percent_canceled,
          count_approved / (count_awaited + count_canceled + count_approved) * 100 percent_approved
        from cte;
    `;
  }
}
