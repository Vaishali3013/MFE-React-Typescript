export interface ImageUploadProps {
  setImageUrl?: Function | any;
  imageUrl?: string;
  deleteImage?: () => void;
}
export interface TimeSegment {
  label: string;
  value: number;
}
export interface customHeaderProps {
  heading: string;
  customDateTimePicker: boolean;
  currentTimePicker: boolean;
  applyClickHandler?: Function;
  infoTooltip?: boolean;
}
