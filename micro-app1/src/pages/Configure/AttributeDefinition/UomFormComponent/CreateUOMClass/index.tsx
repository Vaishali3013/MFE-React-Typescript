import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CustomButton from 'components/common/CustomButton';
import './index.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUomClass } from 'redux/actions/ConfigureActions/attributeActions';
import { parseJwt } from 'utils/jwtTokenFunction';
import { BUTTONTYPE } from 'types/enums';

const CategoryUOMClassContent: React.FC<any> = ({ setUomClassCreate }) => {
    const dispatch = useDispatch();
    const details = parseJwt();
    const [uomClassName, setuomClassName] = useState('');
    return (
        <>
            <div className="createUOMClassContent">
                <div className="createUOMClassContent__heading">
                    <div className="createUOMClassContent__heading__name">
                        Add UOM Class
                    </div>
                    <span>
                        <CloseOutlined
                            onClick={() => {
                                setUomClassCreate(false);
                                setuomClassName('');
                            }}
                        />
                    </span>
                </div>
                <div className="createUOMClassContent__bodyWrapper">
                    <div className="createUOMClassContent__body">
                        <div className="createUOMClassContent__body__label">
                            <span className="mandatoryClass">*</span> Name
                        </div>
                        <Input
                            maxLength={100}
                            placeholder="Enter UOM Class"
                            value={uomClassName}
                            onChange={(e) => {
                                setuomClassName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="createUOMClassContent__footer">
                    <div className="createUOMClassContent__footer__buttonDiv">
                        <CustomButton
                            type={BUTTONTYPE.cancel}
                            disabled={false}
                            handleClick={() => {
                                setUomClassCreate(false);
                                setuomClassName('');
                            }}
                        />
                        <CustomButton
                            type={BUTTONTYPE.save}
                            typeOfButton="submit"
                            disabled={uomClassName === ''}
                            handleClick={() => {
                                dispatch(
                                    createUomClass({
                                        name: uomClassName,
                                        requestedBy: details?.username,
                                    })
                                );
                                setUomClassCreate(false);
                                setuomClassName('');
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default CategoryUOMClassContent;
