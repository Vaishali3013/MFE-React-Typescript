import { Pagination, type PaginationProps } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { type CustomPaginationProps } from 'types/interfaces/PropsInterfaces';

const CustomPagination: React.FC<CustomPaginationProps> = ({
    totalRecords,
    setPage,
    page,
    setPageSize,
    pageSize,
    pageSizeOptions,
    defaultPageSize,
    customClassName,
    isPositionFixed,
}) => {
    const [current, setCurrent] = useState(page ?? 1);
    const [currentPageSize, setCurrentPageSize] = useState<any>(pageSize ?? 50);
    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        setCurrent(pageNumber);
        setPage(pageNumber);
    };
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
        current,
        pageSize
    ) => {
        setPageSize(pageSize);
    };

    useEffect(() => {
        setCurrent(page ?? 1);
        setCurrentPageSize(pageSize ?? 50);
    }, [page, pageSize]);

    return (
        <div
            className={
                customClassName ??
                (isPositionFixed
                    ? 'customPagination'
                    : 'customPaginationStatic')
            }
        >
            <Pagination
                key={`${page}_${pageSize}`}
                total={totalRecords}
                showTotal={(total: Number) =>
                    `${page ?? '1'} of ${Math.ceil(
                        Number(total) / Number(pageSize)
                    )} pages`
                }
                defaultCurrent={1}
                current={current}
                showSizeChanger
                defaultPageSize={defaultPageSize ?? 50}
                pageSize={currentPageSize}
                onShowSizeChange={onShowSizeChange}
                onChange={onChange}
                pageSizeOptions={pageSizeOptions ?? [50, 100, 200]}
            />
        </div>
    );
};

CustomPagination.defaultProps = {
    isPositionFixed: true,
};

export default CustomPagination;
