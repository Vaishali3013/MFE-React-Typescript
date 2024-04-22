export const extractResourcePermissions = (rolesData: any): any => {
    const resourcePermissions: any = {};
    rolesData?.forEach((role: any) => {
        role.resourcePermissionList.forEach((resourcePermission: any) => {
            const resourceName = resourcePermission?.resource?.resourceName;
            const permissions = resourcePermission?.permission;
            if (!resourcePermissions[resourceName]) {
                resourcePermissions[resourceName] = {
                    resourceName,
                    permission: [],
                };
            }
            resourcePermissions[resourceName].permission = Array.from(
                new Set([
                    ...resourcePermissions[resourceName]?.permission,
                    ...permissions,
                ])
            );
        });
    });
    return Object?.values(resourcePermissions);
};

export const getObjectByResourceName = (
    resourceNameToFind: any,
    data: any
): any => {
    return data?.find((item: any) => item?.resourceName === resourceNameToFind);
};

export const hasPermission = (data: any, access: string): any => {
    return data?.permission?.includes(access);
};
