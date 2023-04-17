import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

/**
 * Find user request model
 */
export class FindUserRequest {
  /**
   * user id
   */
  @IsDefined()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number, example: -1 })
  user_id: number;
}
