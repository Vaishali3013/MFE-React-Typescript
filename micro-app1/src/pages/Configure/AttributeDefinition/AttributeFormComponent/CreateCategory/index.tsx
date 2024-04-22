import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CustomButton from 'components/common/CustomButton';
import './index.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from 'redux/actions/ConfigureActions/attributeActions';
import { parseJwt } from 'utils/jwtTokenFunction';

const CategoryCreationContent: React.FC<any> = ({ setCategoryCreate }) => {
    const details = parseJwt();
    const [categoryNameState, setCategoryNameState] = useState('');
    const [categoryDescriptionState, setCategoryDescriptionState] =
        useState('');
    const dispatch = useDispatch();
    return (
        <>
            <div className="createCategoryContent">
                <div className="createCategoryContent__heading">
                    <div className="createCategoryContent__heading__name">
                        Create Category
                    </div>
                    <span>
                        <CloseOutlined
                            onClick={() => {
                                setCategoryCreate(false);
                                setCategoryNameState('');
                                setCategoryDescriptionState('');
                            }}
                        />
                    </span>
                </div>
                <div className="createCategoryContent__bodyWrapper">
                    <div className="createCategoryContent__body">
                        <div className="createCategoryContent__body__label">
                            <span className="mandatoryClass">*</span> Name
                        </div>
                        <Input
                            maxLength={100}
                            placeholder="Enter Category Name"
                            value={categoryNameState}
                            onChange={(e) => {
                                setCategoryNameState(e.target.value);
                            }}
                        />
                    </div>
                    <div className="createCategoryContent__body">
                        <div className="createCategoryContent__body__label">
                            Description
                        </div>

                        <Input.TextArea
                            showCount
                            maxLength={200}
                            placeholder="Enter your description"
                            value={categoryDescriptionState}
                            onChange={(e) => {
                                setCategoryDescriptionState(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="createCategoryContent__footer">
                    <div className="createCategoryContent__footer__buttonDiv">
                        <CustomButton
                            type={'Cancel'}
                            disabled={false}
                            handleClick={() => {
                                setCategoryCreate(false);
                                setCategoryNameState('');
                                setCategoryDescriptionState('');
                            }}
                        />
                        <CustomButton
                            type={'Save'}
                            typeOfButton="submit"
                            disabled={categoryNameState === ''}
                            handleClick={() => {
                                dispatch(
                                    createCategory({
                                        name: categoryNameState,
                                        description: categoryDescriptionState,
                                        requestedBy: details?.username,
                                    })
                                );
                                setCategoryCreate(false);
                                setCategoryNameState('');
                                setCategoryDescriptionState('');
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default CategoryCreationContent;
