export const mergeAndRemoveDuplicatesAddHandler = (
    selectedRows: any,
    data: any
): any => {
    const mergedArray = selectedRows.concat(data);
    const uniqueObjects = new Set();
    const resultArray = mergedArray.filter((obj: any) => {
        const userId = obj.userId;
        if (!uniqueObjects.has(userId)) {
            uniqueObjects.add(userId);
            return true;
        }
        return false;
    });

    return resultArray;
};

export const filterArrayRemoveHandler = (data: any, selectedRows: any): any => {
    const userIds = selectedRows.map((item: any) => item.userId);
    const filteredArray = data.filter(
        (items: any) => !userIds.includes(items.userId)
    );

    return filteredArray;
};
