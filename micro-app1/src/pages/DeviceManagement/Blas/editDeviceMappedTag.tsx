import { Col, Input, Row, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import { useTranslation } from 'react-i18next';

const EditDeviceMappedTag: React.FC<{
    selectedTagKey: any;
    setSelectedTagKey: any;
}> = ({ selectedTagKey, setSelectedTagKey }) => {
    const [tableData, setTableData] = useState<any>([]);

    const allBlasList = useSelector(
        (state: any) => state.deviceManagement.tags.tagListByDeviceId
    );
    const { t } = useTranslation('translation');
    const rowSelection: any = {
        onSelect: (record: any, selected: boolean) => {
            if (selected) {
                setSelectedTagKey([...selectedTagKey, record.tagId]);
            } else {
                setSelectedTagKey(
                    selectedTagKey.filter((id: any) => id !== record.tagId)
                );
            }
        },
        selectedRowKeys: selectedTagKey,
    };

    const columns = [
        {
            title: 'Tag Name',
            dataIndex: 'tagName',
            render: (_: any, record: any) => {
                return (
                    <>
                        <div className="blaTableWrapper__nameData">
                            <div className="blaTableWrapper__status">
                                {record.isActive ? (
                                    <>
                                        <ActiveDotIcon />
                                    </>
                                ) : (
                                    <InactiveDotIcon />
                                )}
                                <span>{record.tagName}</span>
                            </div>
                        </div>
                    </>
                );
            },
        },
        {
            title: 'Tag ID',
            dataIndex: 'tagId',
        },
        {
            title: 'Data Type',
            dataIndex: 'dataType',
        },
    ];

    const tableDataMapper = (): [] => {
        const temp: any = [];
        allBlasList?.map((item: any, index: number) => {
            temp?.push({
                ...item,
                key: item.tagId,
            });
        });
        return temp;
    };
    useEffect(() => {
        setTableData(tableDataMapper());
    }, [allBlasList]);

    return (
        <>
            <div className="editDevice__mappedTag__tableContainer">
                <Row>
                    <Col span={24} className="editBlaWrapper__header">
                        <Input
                            className="editBlaWrapper__search"
                            placeholder={t('deviceMang.bla.searchTags')}
                            prefix={<SearchOutlined />}
                        />
                    </Col>
                </Row>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    pagination={false}
                    columns={columns}
                    dataSource={tableData}
                />
            </div>
        </>
    );
};

export default EditDeviceMappedTag;
