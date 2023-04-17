import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

/**
 * Create transaction request model
 */
export class CreateTransactionRequest {
  /**
   * user wallet's id
   */
  @IsDefined()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number, example: 1 })
  wallet_id: number;

  /**
   * transaction reference id
   */
  @IsDefined()
  @IsString()
  @Type(() => String)
  @ApiProperty({ type: String, example: '123456' })
  reference_id: string;

  /**
   * amount of transaction
   */
  @IsDefined()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number, example: -1 })
  amount: number;
}
