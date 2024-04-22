import { type ReactNode } from 'react';

export interface DataType {
  key: string;
  groupName: string;
  subItems: SubItemsProps[];
  status: string;
  createdBy: string;
  createdOn: string;
  lastModified: string;
}
export interface SubItemsProps {
  resourceType: string;
  data: SubItemsDatProps[];
}
export interface SubItemsDatProps {
  key: string;
  subItem: string;
}
export interface GroupTableProps {
  data: any;
  payload?: any;
   paginationPayload?: any;
 
}
export interface SideDrawerData {
  option: string;
  items: SideDrawerItems[];
}
export interface SideDrawerItems {
  key: string;
  subItem: string;
}
export interface GroupDrawerProps {
  onClose?: Function | any;
  editData?: any;
  formDisable?: boolean;
  openEditDrawer?: (arg: boolean) => void;
  onEditClick?: () => void;
  paginationPayload?: any;
}
export interface SubItemProp {
  key: string;
}
export interface SideDrawerProps {
  title: string;
  Open: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export interface DataType {
  key: string;
  id: number;
  groupName: string;
  subItems: SubItemsProps[];
  active: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  resourceType: ResourceTypeProps;
  resourceList: ResourceListProps[];
}
export interface ResourceListProps {
  resourceId:number;
  resourceName: string;
}
export interface ResourceTypeProps {
  id: number;
  resourceTypeName?: string;
}
export interface SubItemsProps {
  resourceType: string;
  data: SubItemsDatProps[];
}
export interface SubItemsDatProps {
  key: string;
  subItem: string;
}
export interface GroupTableProps {
  data: any;
}
export interface SideDrawerData {
  option: string;
  items: SideDrawerItems[];
}
export interface SideDrawerItems {
  key: string;
  subItem: string;
}
export interface GroupDrawerProps {
  onClose?: Function | any;
  editData?: any;
  formDisable?: boolean;
  openEditDrawer?: (arg: boolean) => void;
  onEditClick?: () => void;
}
export interface SubItemProp {
  key: string;
}
export interface SideDrawerProps {
  title: string;
  Open: boolean;
  onClose?: () => void;
  children?: ReactNode;
}
