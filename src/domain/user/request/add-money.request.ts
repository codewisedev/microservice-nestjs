import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

/**
 * Add money request model
 */
export class AddMoneyRequest {
  /**
   * user id
   */
  @IsDefined()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number, example: -1 })
  user_id: number;

  /**
   * amount of transaction
   */
  @IsDefined()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number, example: -1 })
  amount: number;
}
