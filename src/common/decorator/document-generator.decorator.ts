import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  IntersectionType,
} from '@nestjs/swagger';

export const ApiType = (type: Type<unknown>): Type<unknown> =>
  IntersectionType(type, type);

type FunctionType = (args: unknown) => unknown;

class DocumentGeneratorParam {
  name: string;
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | string
    | FunctionType
    | Type<unknown>
    | [FunctionType];
}

export class DocumentGeneratorInfo {
  summary: string;
  description?: string;
  params?: DocumentGeneratorParam[];
  200?: Type<unknown> | Type<unknown>[];
  201?: Type<unknown> | Type<unknown>[];
}

export function DocumentGenerator(
  documentGeneratorInfo: DocumentGeneratorInfo,
): <TFunction extends FunctionType, Y>(
  target: unknown | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  const decorators: MethodDecorator[] = [
    ApiOperation({
      summary: documentGeneratorInfo.summary,
      description: documentGeneratorInfo.description,
    }),
  ];
  if (documentGeneratorInfo[200]) {
    decorators.push(
      ApiOkResponse({
        description: 'Result',
        // TODO: add api Interface
        type: Array.isArray(documentGeneratorInfo[200])
          ? (documentGeneratorInfo[200] as unknown as Type<unknown>)
          : ApiType(documentGeneratorInfo[200]),
      }),
    );
  }
  if (documentGeneratorInfo[201]) {
    decorators.push(
      ApiOkResponse({
        description: 'Result',
        // TODO: add api Interface
        type: Array.isArray(documentGeneratorInfo[201])
          ? (documentGeneratorInfo[201] as unknown as Type<unknown>)
          : ApiType(documentGeneratorInfo[201]),
      }),
    );
  }
  if (documentGeneratorInfo.params) {
    documentGeneratorInfo.params.forEach((item: DocumentGeneratorParam) => {
      decorators.push(
        ApiParam({
          name: item.name,
          type: item.type,
        }),
      );
    });
  }

  return applyDecorators(...decorators);
}
