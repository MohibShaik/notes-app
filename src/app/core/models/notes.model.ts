import { Category } from "./category.model";
import { LabelItem } from "./label.model";

export interface NotesItem {
  _id: string;
  userId: string;
  title: string;
  label: LabelItem[];
  category: Category[];
  description: string;
  createdDate: string;
  __v: number;
}
