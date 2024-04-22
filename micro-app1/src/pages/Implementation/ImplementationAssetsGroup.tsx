import { Card, Input, Popover, Tree, Divider, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getModelList,
    getNodeList,
} from 'redux/actions/DataExplorer/DataVisualizationActions';
import { CLEAR_ASSET_DATA_ON_MODEL_CHANGE } from 'redux/types/calendarConfiguratorTypes';
import { mapTree } from 'utils/commonFunction';
import { ReactComponent as SearchIcon } from 'assets/icons/searchIcon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/closeIcon.svg';
import { ReactComponent as WarningIcon } from 'assets/icons/warningIcon.svg';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { selectedAsset } from 'redux/actions/ImplementationActions/attributeActions';
import { useTranslation } from 'react-i18next';
const ImplementationAssetsGroup: React.FC<any> = () =>
    // NOTE- will be used later
    // setSelectedAsset,
    // setSelectedAssetChildrenKey,
    // setDropdownClicked,

    {
        const { t } = useTranslation('translation');
        const [isSearchVisible, setIsSearchVisible] = useState(false);

        const handleClickOutside = (event: any): void => {
            const targetClassName = event?.target?.className?.toString() || '';

            if (
                isSearchVisible &&
                !event?.target?.id?.includes('assetsGroup__searchIconId') &&
                !targetClassName.includes('assetsGroup__search') &&
                !targetClassName.includes('assetsGroup__searchHeading') &&
                !targetClassName.includes('ant-input') &&
                event?.target?.nodeName !== 'SPAN' &&
                !targetClassName.includes('assetsNode') &&
                !targetClassName.includes('assetsNodeLabel')
            ) {
                setIsSearchVisible(false);
                setSearchValue('');
            }
        };
        useEffect(() => {
            dispatch(selectedAsset({}));
        }, []);
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
            // NOTE- will be used later
            // setSelectedAsset('');
            dispatch(selectedAsset({}));
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
            return () => dispatch(selectedAsset(''));
        }, []);

        const nodeList: any = useSelector(
            (state: any) => state?.dataVisualization?.nodeList
        );
        const modelList: any = useSelector(
            (state: any) => state?.dataVisualization?.modelList
        );
        const modelListOptions = (): any => {
            const result: any = [];
            modelList?.map((modelObject: any) => {
                result?.push({
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
                if (node?.children && node?.children?.length > 0) {
                    for (const child of node.children) {
                        // NOTE- will be used later
                        // setSelectedAssetChildrenKey((prevKeys: string[]) => [
                        //     ...prevKeys,
                        //     child?.key,
                        // ]);
                        collectChildKeys(child);
                    }
                }
            };

            // setSelectedAssetChildrenKey([]);

            if (item?.children && item?.children?.length > 0) {
                collectChildKeys(item);
            }
        };
        const findSite = (data: any, targetTitle: any): any => {
            const lowerCaseTarget = targetTitle.toLowerCase();

            const searchInChildren = (node: any): any => {
                // Check if the current node's title matches the search value
                const matchesTitle = node?.title
                    ?.toLowerCase()
                    .includes(lowerCaseTarget);

                // Recursively search through each child node
                const childrenMatches = node?.children
                    ?.map((child: any) => searchInChildren(child))
                    ?.filter((match: any) => match !== null);

                // If the current node or any of its children match the search value, return the node
                if (
                    matchesTitle ||
                    (childrenMatches && childrenMatches.length > 0)
                ) {
                    return {
                        title: node?.title,
                        key: node?.key,
                        value: node?.value,
                        children: childrenMatches,
                    };
                }

                // If neither the current node nor its children match, return null
                return null;
            };

            // Start the search from the root node
            return searchInChildren(data);
        };

        const onOkHandler = (): any => {
            onRadioChange(selectedAssetNode?.key);
            searchChildrenIds(selectedAssetNode);
            setIsSelectedKeyChange(false);
            // NOTE- will be used
            dispatch(selectedAsset(selectedAssetNode));
            // setSelectedAsset(selectedAssetNode);
            // setDropdownClicked(false);
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
                                searchChildrenIds(item);
                                dispatch(selectedAsset(item));
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
                                            // setSelectedAsset(item);
                                            dispatch(selectedAsset(item));
                                            searchChildrenIds(item);
                                        }
                                    }}
                                    checked={nodeKey === item?.key}
                                    key={item?.key}
                                />
                                {searchValue ? (
                                    <span>
                                        {item?.title
                                            ?.split(
                                                new RegExp(
                                                    `(${searchValue})`,
                                                    'i'
                                                )
                                            )
                                            ?.map((part: any, index: any) =>
                                                part?.toLowerCase() ===
                                                searchValue?.toLowerCase() ? (
                                                    <span key={index}>
                                                        {part}
                                                    </span>
                                                ) : (
                                                    <span key={index}>
                                                        {part}
                                                    </span>
                                                )
                                            )}
                                    </span>
                                ) : (
                                    <span>
                                        {item?.title?.length > 10 ? (
                                            <Popover
                                                content={item?.title}
                                                trigger="hover"
                                            >
                                                {/* LOGIC- In this we are slicing the word till length-> 8, after that ... is appended and the complete word is displayed in a popover. */}
                                                <span>
                                                    {item?.title?.slice(0, 8) +
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
                                    autoFocus
                                    className="assetsGroup__searchBox"
                                    placeholder={t('commonStr.search')}
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
                                        {t('implementation.assetsGroup')}
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
                                placeholder={t('implementation.selectModel')}
                                size="small"
                                options={modelListOptions()}
                                onSelect={modelSelectHandler}
                                onClear={() => {
                                    setSelectedModel(null);
                                    dispatch(selectedAsset(''));
                                    // setSelectedAsset('');
                                    setSelectedKey(null);
                                }}
                            />
                        </div>
                        <div className="assetsGroup__tree">
                            {searchValue && expandedKeys?.length === 0 && (
                                <div className="assetsGroup__notFound">
                                   {t('implementation.noAssetFound')}
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
                                        onRadioChange(node?.key as string);
                                    }}
                                    checkedKeys={
                                        selectedKey ? [selectedKey] : []
                                    }
                                >
                                    {renderFilteredTreeNodes([
                                        findSite(
                                            mapTree(nodeList?.node),
                                            searchValue
                                        ),
                                    ])}
                                </Tree>
                            ) : (
                                <Tree
                                    defaultExpandAll={autoExpandAll}
                                    onCheck={(_, { node }) => {
                                        onRadioChange(node?.key as string);
                                    }}
                                    checkedKeys={
                                        selectedKey ? [selectedKey] : []
                                    }
                                >
                                    {renderFilteredTreeNodes([
                                        mapTree(nodeList?.node),
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
export default ImplementationAssetsGroup;
