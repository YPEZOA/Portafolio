import { IComment } from './comment.interface';

export interface IResponse {
  status: boolean;
  data: IComment[];
}
