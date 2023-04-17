import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

/**
 * Find user response
 */
@Exclude()
export class FindUserResponse {
  /**
   * balance of user wallet
   */
  @Expose()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number, example: 2000 })
  balance: number;
}
