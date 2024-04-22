import { EMPTY } from "types/enums";

export const sideNavSearchFilter = (
  data: string[],
  searchValue: string,
  setMenuData: Function
): any => {
  if (data && searchValue !== EMPTY.string) {
    const tempCategories = [...data];
    const filterData = tempCategories?.filter((value: any) => {
      const searchText = searchValue?.toLowerCase();
      if (
        value?.key?.toLowerCase().includes(searchText?.toLowerCase()) ||
        value?.children?.some((child: any) =>
          child?.key.toLowerCase().includes(searchText?.toLowerCase())
        )
      ) {
        return value;
      }
    });
    setMenuData(filterData);
  } else {
    setMenuData(data);
  }
};
// will work on this
export const findObjectByTerm = (
  data: any,
  searchValue: string,
  parent = null
): any => {
  for (const item of data) {
    if (item?.key?.toLowerCase()?.includes(searchValue?.toLowerCase())) {
      return parent;
    }
    if (item?.children) {
      const childResult: any = findObjectByTerm(
        item.children,
        searchValue,
        item
      );
      if (childResult) {
        return childResult;
      }
    }
  }

  return data;
};

export const getObjectsById = (arr: any[], ids: any): any => {
  return arr?.reduce((result, obj) => {
    if (ids?.includes(obj?.menuIds)) {
      const filteredObj = {
        ...obj,
        children: getObjectsById(obj?.children, ids),
      };
      result.push(filteredObj);
    }
    return result;
  }, []);
};
// will use later
// export const getParentByChildId = (items: any, allowedTabList?: any): any => {
//     const resultArray = [] as any;
//     for (const menuItem of items) {
//         if (menuItem?.children && menuItem?.children.length > 0) {
//             for (const childItem of menuItem?.children) {
//                 if (allowedTabList?.includes(childItem?.menuIds)) {
//                     resultArray.push(menuItem?.menuIds, childItem?.menuIds);
//                 }
//             }
//             getParentByChildId(menuItem?.children);
//         }
//     }
//     return resultArray;
// };

export const findParentMenuIds = (data: any, menuIds: any): any => {
  const result = [] as any;

  const findIds = (menuItems: any, parentPath: any): any => {
    for (const item of menuItems) {
      const itemPath = [...parentPath, item?.key];

      if (menuIds?.includes(item?.key)) {
        result.push(...itemPath);
      }

      if (item?.children) {
        findIds(item?.children, itemPath);
      }
    }
  };

  findIds(data, []);

  return result;
};
