import { ISchoolSchema } from '../models/schoolModel';

export interface IBlog {
  title: string;
  content: string;
  category: string;
  school: ISchoolSchema['_id'];
}
