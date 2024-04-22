import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CustomButton from 'components/common/CustomButton';
import './index.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createIndustry } from 'redux/actions/ConfigureActions/attributeActions';
import { parseJwt } from 'utils/jwtTokenFunction';

const CategoryIndustryContent: React.FC<any> = ({ setIndustryCreate }) => {
    const [industryNameState, setIndustryNameState] = useState('');
    const details = parseJwt();
    const dispatch = useDispatch();
    return (
        <>
            <div className="createIndustryContent">
                <div className="createIndustryContent__heading">
                    <div className="createIndustryContent__heading__name">
                        Add Industry
                    </div>
                    <span>
                        <CloseOutlined
                            onClick={() => {
                                setIndustryCreate(false);
                                setIndustryNameState('')
                            }}
                        />
                    </span>
                </div>
                <div className="createIndustryContent__bodyWrapper">
                    <div className="createIndustryContent__body">
                        <div className="createIndustryContent__body__label">
                            <span className="mandatoryClass">*</span> Name
                        </div>
                        <Input
                           maxLength={100}
                            placeholder="Enter Industry Name"
                            value={industryNameState}
                            onChange={(e) => {
                                setIndustryNameState(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="createIndustryContent__footer">
                    <div className="createIndustryContent__footer__buttonDiv">
                        <CustomButton
                            type={'Cancel'}
                            disabled={false}
                            handleClick={() => {
                                setIndustryCreate(false);
                                setIndustryNameState('')
                            }}
                        />
                        <CustomButton
                            type={'Save'}
                            typeOfButton="submit"
                            disabled={industryNameState === ''}
                            handleClick={() => {
                                dispatch(
                                    createIndustry({
                                        name: industryNameState,
                                        requestedBy: details?.username,
                                    })
                                );
                                setIndustryCreate(false);
                                setIndustryNameState('')
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default CategoryIndustryContent;
