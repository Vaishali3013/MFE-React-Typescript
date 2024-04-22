import { Card, Divider, Input, Popover, Select, Tree } from 'antd';
import './index.scss';
import { ReactComponent as SearchIcon } from 'assets/icons/searchIcon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/closeIcon.svg';

import { useEffect, useState } from 'react';
import {
    getModelList,
    getNodeList,
} from 'redux/actions/DataExplorer/DataVisualizationActions';
import { useDispatch, useSelector } from 'react-redux';
import { mapTree } from 'utils/commonFunction';
import {
    CLEAR_ASSET_DATA_ON_MODEL_CHANGE,
    CLEAR_DAY_DATA,
} from 'redux/types/calendarConfiguratorTypes';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as WarningIcon } from 'assets/icons/warningIcon.svg';
import {
    configChangeFalse,
    defaultConfigType,
    updateShiftConfig,
} from 'redux/actions/CalendarConfiguratorActions';

const AssetsGroup: React.FC<any> = ({
    setSelectedAsset,
    setSelectedAssetChildrenKey,
    setDropdownClicked,
}) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleClickOutside = (event: any): void => {
        if (
            isSearchVisible &&
            !event?.target?.id?.includes('assetsGroup__searchIconId') &&
            !event?.target?.className?.includes(
                'assetsGroup__search' || 'assetsGroup__searchHeading'
            ) &&
            !event?.target?.className?.includes('ant-input') &&
            event?.target?.nodeName !== 'SPAN' &&
            !event?.target?.className?.includes('assetsNode') &&
            !event?.target?.className?.includes('assetsNodeLabel')
        ) {
            setIsSearchVisible(!isSearchVisible);
            setSearchValue('');
        }
    };
    useEffect(() => {
        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [isSearchVisible]);
    const dispatch = useDispatch();
    const { TreeNode } = Tree;
    const [selectedModel, setSelectedModel] = useState(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [isSelectedKeyChange, setIsSelectedKeyChange] = useState(false);
    const [selectedAssetNode, setSelectedAssetNode] = useState<any>({});
    const onSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const value = e.target.value;
        setSearchValue(value);
    };
    useEffect(() => {
        selectedModel && dispatch(getNodeList(selectedModel));
    }, [selectedModel]);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const modelSelectHandler = (value: any): any => {
        setSelectedModel(value);
        dispatch({ type: CLEAR_ASSET_DATA_ON_MODEL_CHANGE });
        setSelectedAsset('');
        setSelectedKey(null);
    };
    const isConfigChange = useSelector(
        (state: any) => state?.calendarConfigurator?.isConfigChange
    );

    const toggleSearchVisibility = (): void => {
        setIsSearchVisible(!isSearchVisible);
    };
    useEffect(() => {
        dispatch(getModelList());
    }, []);

    const nodeList: any = useSelector(
        (state: any) => state.dataVisualization.nodeList
    );
    const modelList: any = useSelector(
        (state: any) => state.dataVisualization.modelList
    );
    const modelListOptions = (): any => {
        const result: any = [];
        modelList?.map((modelObject: any) => {
            result.push({
                label: modelObject?.name,
                value: modelObject?.rootNode?.id,
            });
        });
        return result;
    };
    const [nodeKey, setNodeKey] = useState<string | null>(null);
    const [expandedKeys, setExpandedKeys] = useState<any>([]);

    const onRadioChange = (key: string): void => {
        setSelectedKey(key);
    };

    useEffect(() => {
        setNodeKey(selectedKey);
        setExpandedKeys((prevKeys: any) => [...prevKeys, selectedKey]);
    }, [selectedKey]);

    const [autoExpandAll, setAutoExpandAll] = useState<boolean>(false);
    useEffect(() => {
        const result = findSite(mapTree(nodeList.node), searchValue);

        if (result) {
            const keys = getAllKeys(result);
            setExpandedKeys(keys?.map(String));
            setAutoExpandAll(true);
        } else {
            setExpandedKeys([]);
            setAutoExpandAll(false);
        }
    }, [searchValue, nodeList.node]);
    const getAllKeys = (node: any): string[] => {
        const keys: string[] = [node.key];
        if (node.children) {
            for (const child of node.children) {
                keys.push(...getAllKeys(child));
            }
        }
        return keys;
    };
    const searchChildrenIds = (item: any): void => {
        const collectChildKeys = (node: any): any => {
            if (node?.children && node.children.length > 0) {
                for (const child of node.children) {
                    setSelectedAssetChildrenKey((prevKeys: string[]) => [
                        ...prevKeys,
                        child.key,
                    ]);
                    collectChildKeys(child);
                }
            }
        };

        setSelectedAssetChildrenKey([]);

        if (item?.children && item.children.length > 0) {
            collectChildKeys(item);
        }
    };
    const findSite = (data: any, targetTitle: any): any => {
        const lowerCaseTarget = targetTitle?.toLowerCase();

        const findMatch = (node: any): any => {
            const lowerCaseTitle = node?.title?.toLowerCase();

            if (lowerCaseTitle?.includes(lowerCaseTarget)) {
                return {
                    title: node.title,
                    key: node.key,
                    value: node.value,
                };
            }

            if (node?.children) {
                for (let i = 0; i < node?.children?.length; i++) {
                    const result = findMatch(node?.children[i]);
                    if (result) {
                        return {
                            title: node?.title,
                            key: node.key,
                            value: node?.value,
                            children: [result],
                        };
                    }
                }
            }

            return null;
        };

        return findMatch(data);
    };

    const onOkHandler = (): any => {
        dispatch({ type: CLEAR_DAY_DATA });
        dispatch(configChangeFalse());
        dispatch(defaultConfigType());
        onRadioChange(selectedAssetNode?.key);
        setSelectedAsset(selectedAssetNode);
        searchChildrenIds(selectedAssetNode);
        setIsSelectedKeyChange(false);
        dispatch(updateShiftConfig([]));
        setDropdownClicked(false);
    };
    const renderFilteredTreeNodes = (data: any[]): any => {
        return data?.map((item: any) => {
            const title = (
                <label
                    className="assetsNodeLabel"
                    onClick={() => {
                        if (selectedKey && isConfigChange) {
                            setSelectedAssetNode(item);
                            setIsSelectedKeyChange(true);
                        } else {
                            onRadioChange(item?.key);
                            setSelectedAsset(item);
                            searchChildrenIds(item);
                            dispatch(updateShiftConfig([]));
                            if (!isConfigChange) {
                                dispatch(defaultConfigType());
                            }
                        }
                    }}
                >
                    {item?.title && (
                        <>
                            <input
                                className="assetsNode"
                                type="radio"
                                name="radio-group"
                                value={item?.key}
                                onChange={() => {
                                    if (selectedKey && isConfigChange) {
                                        setSelectedAssetNode(item);
                                        setIsSelectedKeyChange(true);
                                    } else {
                                        onRadioChange(item?.key);
                                        setSelectedAsset(item);
                                        searchChildrenIds(item);
                                        if (!isConfigChange) {
                                            dispatch(defaultConfigType());
                                        }
                                    }
                                }}
                                checked={nodeKey === item?.key}
                                key={item?.key}
                            />
                            {searchValue ? (
                                <span>
                                    {item?.title
                                        .split(
                                            new RegExp(`(${searchValue})`, 'i')
                                        )
                                        .map((part: any, index: any) =>
                                            part.toLowerCase() ===
                                            searchValue.toLowerCase() ? (
                                                <span key={index}>{part}</span>
                                            ) : (
                                                <span key={index}>{part}</span>
                                            )
                                        )}
                                </span>
                            ) : (
                                <span>
                                    {item?.title.length > 10 ? (
                                        <Popover
                                            content={item.title}
                                            trigger="hover"
                                        >
                                            <span>
                                                {item.title?.slice(0, 8) +
                                                    '...'}
                                            </span>
                                        </Popover>
                                    ) : (
                                        item?.title
                                    )}
                                </span>
                            )}
                        </>
                    )}
                </label>
            );

            return (
                selectedModel && (
                    <TreeNode title={title} key={item?.key}>
                        {item?.children &&
                            renderFilteredTreeNodes(item?.children)}
                    </TreeNode>
                )
            );
        });
    };
    return (
        <>
            <div className="assetsGroup">
                <Card>
                    <div>
                        {isSearchVisible && selectedModel ? (
                            <Input
                                className="assetsGroup__searchBox"
                                placeholder="Search"
                                prefix={
                                    <SearchIcon id="assetsGroup__searchIconId" />
                                }
                                onChange={onSearchInputChange}
                                suffix={
                                    searchValue?.length > 0 && (
                                        <CloseIcon
                                            className="assetsGroup__searchBoxCloseIcon"
                                            onClick={() => {
                                                setSearchValue('');
                                                setIsSearchVisible(false);
                                            }}
                                        />
                                    )
                                }
                            />
                        ) : (
                            <div
                                className="assetsGroup__search"
                                onClick={() => {
                                    toggleSearchVisibility();
                                }}
                            >
                                <p className="assetsGroup__searchHeading">
                                    Assets Group
                                </p>
                                <SearchIcon id="assetsGroup__searchIconId" />
                            </div>
                        )}
                    </div>
                    <Divider />
                    <div className="assetsGroup__selectModel">
                        <Select
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Select Model"
                            size="small"
                            options={modelListOptions()}
                            onSelect={modelSelectHandler}
                            onClear={() => {
                                setSelectedModel(null);
                                setSelectedAsset('');
                                setSelectedKey(null);
                            }}
                        />
                    </div>
                    <div className="assetsGroup__tree">
                        {searchValue && expandedKeys?.length === 0 && (
                            <div className="assetsGroup__notFound">
                                No Asset Found
                            </div>
                        )}
                        {searchValue ? (
                            <Tree
                                defaultExpandAll={autoExpandAll}
                                expandedKeys={expandedKeys}
                                onExpand={(keys) => {
                                    setExpandedKeys(keys);
                                }}
                                onCheck={(_, { node }) => {
                                    onRadioChange(node.key as string);
                                }}
                                checkedKeys={selectedKey ? [selectedKey] : []}
                            >
                                {renderFilteredTreeNodes([
                                    findSite(
                                        mapTree(nodeList.node),
                                        searchValue
                                    ),
                                ])}
                            </Tree>
                        ) : (
                            <Tree
                                defaultExpandAll={autoExpandAll}
                                onCheck={(_, { node }) => {
                                    onRadioChange(node.key as string);
                                }}
                                checkedKeys={selectedKey ? [selectedKey] : []}
                            >
                                {renderFilteredTreeNodes([
                                    mapTree(nodeList.node),
                                ])}{' '}
                            </Tree>
                        )}
                    </div>
                </Card>
            </div>
            {isSelectedKeyChange && isConfigChange && (
                <ConfirmationModal
                    icon={<WarningIcon />}
                    open={isSelectedKeyChange}
                    onOk={() => {
                        onOkHandler();
                    }}
                    onCancel={() => {
                        setIsSelectedKeyChange(false);
                    }}
                    text="All unsaved data will be lost by changing the asset selection do you wish to continue"
                />
            )}
        </>
    );
};
export default AssetsGroup;
