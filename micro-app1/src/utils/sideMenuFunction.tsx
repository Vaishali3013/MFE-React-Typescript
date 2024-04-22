import { Link } from 'react-router-dom';

function getItem(
    menuIds: any,
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: any,
    disabled?: boolean
): any {
    return {
        key,
        icon,
        children,
        menuIds,
        label,
        disabled,
    } satisfies any;
}

export const getSideNavMenu = (data: any, parentId?: number): any => {
    let node = [] as any;
    const result = [] as any;
    data?.map((item: any) => {
        if (item?.children) {
            node = getSideNavMenu(item?.children, item.key);
        }
        result.push(
            ...[
                getItem(
                    item?.key || parentId,
                    <Link to={item?.path}>{item?.name}</Link>,
                    item?.key,
                    item?.icon,
                    node?.length > 0 ? node : null,
                    item?.disabled
                ),
            ]
        );
    });
    return result;
};
