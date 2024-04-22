import { Pagination, type PaginationProps } from 'antd';
import React from 'react';
import './index.scss';
import { type CustomPaginationProps } from 'types/interfaces/PropsInterfaces';

const CustomPagination: React.FC<CustomPaginationProps> = ({
    totalRecords,
    setPage,
    page,
    setPageSize,
    pageSize,
    pageSizeOptions,
    defaultPageSize
}) => {
    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        setPage(pageNumber);
    };
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
        current,
        pageSize
    ) => {
        setPageSize(pageSize);
    };

    return (
        <div className="customPagination">
            <Pagination
                total={totalRecords}
                showTotal={(total: Number) =>
                    `${page ?? '1'} of ${Math.ceil(
                        Number(total) / Number(pageSize)
                    )} pages`
                }
                defaultCurrent={1}
                showSizeChanger
                defaultPageSize={defaultPageSize ?? 50}
                onShowSizeChange={onShowSizeChange}
                onChange={onChange}
                pageSizeOptions={pageSizeOptions ?? [50, 100, 200]}
            />
        </div>
    );
};

export default CustomPagination;
