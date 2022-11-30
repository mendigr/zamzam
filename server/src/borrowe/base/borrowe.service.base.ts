/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "nestjs-prisma";
import { Prisma, Borrowe } from "@prisma/client";

export class BorroweServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.BorroweFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BorroweFindManyArgs>
  ): Promise<number> {
    return this.prisma.borrowe.count(args);
  }

  async findMany<T extends Prisma.BorroweFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BorroweFindManyArgs>
  ): Promise<Borrowe[]> {
    return this.prisma.borrowe.findMany(args);
  }
  async findOne<T extends Prisma.BorroweFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BorroweFindUniqueArgs>
  ): Promise<Borrowe | null> {
    return this.prisma.borrowe.findUnique(args);
  }
  async create<T extends Prisma.BorroweCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BorroweCreateArgs>
  ): Promise<Borrowe> {
    return this.prisma.borrowe.create<T>(args);
  }
  async update<T extends Prisma.BorroweUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BorroweUpdateArgs>
  ): Promise<Borrowe> {
    return this.prisma.borrowe.update<T>(args);
  }
  async delete<T extends Prisma.BorroweDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BorroweDeleteArgs>
  ): Promise<Borrowe> {
    return this.prisma.borrowe.delete(args);
  }
}