import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';

/**
 * Add money to user wallet response
 */
@Exclude()
export class AddMoneyResponse {
  /**
   * reference of transaction
   */
  @Expose()
  @IsString()
  @Type(() => String)
  @ApiProperty({ type: String, example: '123456' })
  reference_id: string;
}
