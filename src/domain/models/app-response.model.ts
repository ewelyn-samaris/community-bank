import { HttpStatus } from '@nestjs/common';

export class AppResponse<T> {
  statusCode: HttpStatus;
  message: string;
  date: string;
  data?: T | T[];
}
