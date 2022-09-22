import { ValidateIf, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  status: Status;

  @ValidateIf((data) => data.status === Status.APPROVED, { always: true })
  @IsNotEmpty()
  phoneNumber: string | number;

  @ValidateIf((data) => data.status === Status.APPROVED, { always: true })
  @IsNotEmpty()
  name: string;

  @ValidateIf((data) => data.status === Status.APPROVED)
  @IsNotEmpty()
  address: string;
}

export enum Status {
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
  AWAITED = 'AWAITED',
}
