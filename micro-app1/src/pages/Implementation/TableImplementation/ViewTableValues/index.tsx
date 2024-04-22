import { Button, Col, Divider, Input, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { useEffect, useState } from 'react';
import CustomPagination from 'components/common/CustomPagination';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import ViewTable from './ViewTable';
import { useDispatch, useSelector } from 'react-redux';
import { getTableValues } from 'redux/actions/ImplementationActions/tableActions';
import { EMPTY, implementationTableState } from 'types/enums';
import { useTranslation } from 'react-i18next';
const ViewTableValues: React.FC<any> = ({
    setShowTableDetails,
    selectedTable,
}) => {
    const { t } = useTranslation('translation');
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [search, setSearch] = useState<string | null>(null);
    const [attributeSearchTimeout, setAttributeSearchTimeout] =
        useState<any>(undefined);

    const selectedAsset = useSelector(
        (state: any) => state?.implementation?.attribute?.selectedAsset
    );
    const totalCount = useSelector(
        (state: any) =>
            state?.implementation?.table?.tableValuesList?.totalRecords
    );
    useEffect(() => {
        dispatch(
            getTableValues({
                assetId: selectedAsset?.key,
                tableId: selectedTable?.id,
                search: search,
                page: page,
                pageSize: pageSize,
            })
        );
    }, [page, pageSize]);

    return (
        <>
            <div className="tableImplementation">
                <Row className="tableImplementation__header">
                    <Col span={20}>
                        <BackIcon
                            className="tableImplementation__backIcon"
                            onClick={() => {
                                setShowTableDetails(null);
                            }}
                        />
                        <span className="fw-500 fs-16 tableImplementation__assignText">
                            {`${t('implementation.table.view')} ${selectedTable?.name}`}
                        </span>
                    </Col>
                    <Col span={4}>
                        <div className="tableImplementation__editBtn">
                            <Button
                                type="primary"
                                ghost
                                onClick={() => {
                                    setShowTableDetails(implementationTableState.EDIT);
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Divider />
                <div className="tableImplementation__searchBox">
                    <Input
                        allowClear
                        className="tableImplementation__search"
                        placeholder={t('commonStr.search')}
                        prefix={<SearchOutlined />}
                        value={search ?? EMPTY.string}
                        onChange={(e: any) => {
                            setSearch(e.target.value);
                            if (attributeSearchTimeout) {
                                clearTimeout(attributeSearchTimeout);
                            }
                            setPageSize(PAGE_SIZE);
                            setPage(PAGE);
                            setAttributeSearchTimeout(
                                setTimeout(() => {
                                    dispatch(
                                        getTableValues({
                                            assetId: selectedAsset?.key,
                                            tableId: selectedTable?.id,
                                            page: PAGE,
                                            pageSize: PAGE_SIZE,
                                            search: e.target.value,
                                        })
                                    );
                                }, 1000)
                            );
                        }}
                    />
                </div>
                <div className="tableImplementationTable">
                    <ViewTable
                        search={search ?? EMPTY.string}
                        pageSize={pageSize}
                        setPage={setPage}
                        setPageSize={setPageSize}
                    />
                </div>
                <div>
                    {totalCount > pageSize && (
                        <CustomPagination
                            defaultPageSize={pageSize}
                            customClassName="tableImplementation__assignedPagination"
                            totalRecords={totalCount}
                            setPage={setPage}
                            page={page}
                            setPageSize={setPageSize}
                            pageSize={pageSize}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
export default ViewTableValues;
