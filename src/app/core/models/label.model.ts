export interface Labels {
  status: number;
  data: LabelItem[];
}

export interface LabelItem {
  name: string;
  description: string;
  createdBy: string;
  createdDate: string;
  id: string;
  bgColor?: string;
}
