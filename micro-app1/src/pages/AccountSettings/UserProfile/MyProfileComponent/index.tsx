import { Card, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import ImageUpload from 'components/common/ImageUpload';
import CustomButton from 'components/common/CustomButton';
import { type MyProfileTypeProps } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from 'redux/actions/UserManagementActions/usersAction';
import { useTranslation } from 'react-i18next';
const MyProfileComponent: React.FC<MyProfileTypeProps> = ({ userDetails }) => {
    const { t } = useTranslation('translation');
    const userDetailsRedux: any = useSelector(
        (state: any) => state.userManagement.users.loggedInUserDetails
    );
    const dispatch = useDispatch();

    const [personalInformation, setPersonalInformation] = useState<any>({
        firstName: userDetails?.firstName || '',
        lastName: userDetails?.lastName || '',
        employeeId: userDetails?.employeeId || '',
        email: userDetails?.email || '',
        mobileNo: userDetails?.mobileNo || '',
        designation: userDetails?.designation || '',
    });
    const [address, setAddress] = useState({
        country: userDetails?.address?.country || '',
        city: userDetails?.address?.city || '',
        state: userDetails?.address?.state || '',
        zipCode: userDetails?.address?.zipCode || '',
    });
    const [imageUrl, setImageUrl] = useState<any>();
    const [editPersonalInfo, setEditPersonalInfo] = useState(false);
    const [editAddressInfo, setEditAddressInfo] = useState(false);
    const { firstName, lastName, employeeId, email, mobileNo, designation } =
        personalInformation;
    const { country, city, state, zipCode } = address;
    const editPersonalDetails = (
        evt: React.ChangeEvent<HTMLInputElement>
    ): boolean => {
        if (editPersonalInfo) {
            const personalDetailsPayload = {
                ...userDetailsRedux,
                ...personalInformation,
            };
            dispatch(updateUserDetails(personalDetailsPayload));

            setEditPersonalInfo(false);
        } else {
            setEditPersonalInfo(true);
        }
        return true;
    };
    const [personalForm] = Form.useForm();
    const [addressForm] = Form.useForm();
    const editAdressDetails = (
        evt: React.ChangeEvent<HTMLInputElement>
    ): boolean => {
        if (editAddressInfo) {
            const addressPayload = { ...userDetailsRedux, address };
            dispatch(updateUserDetails(addressPayload));

            setEditAddressInfo(false);
        } else {
            setEditAddressInfo(true);
        }
        return true;
    };
    const deleteImage = (): void => {
        const deleteImageData: any = userDetailsRedux;
        deleteImageData.profileImage = '';
        dispatch(updateUserDetails(deleteImageData));
    };
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const value = evt.target.value;
        if (editPersonalInfo) {
            setPersonalInformation({
                ...personalInformation,
                [evt.target.name]: value,
            });
        } else {
            setAddress({ ...address, [evt.target.name]: value });
        }
    };

    useEffect(() => {
        setPersonalInformation({
            firstName: userDetails?.firstName || '',
            lastName: userDetails?.lastName || '',
            employeeId: userDetails?.employeeId || '',
            email: userDetails?.email || '',
            mobileNo: userDetails?.mobileNo || '',
            designation: userDetails?.designation || '',
        });
        setAddress({
            country: userDetails?.address?.country || '',
            city: userDetails?.address?.city || '',
            state: userDetails?.address?.state || '',
            zipCode: userDetails?.address?.zipCode || '',
        });
    }, [userDetails]);
    useEffect(() => {
        setImageUrl(userDetailsRedux?.profileImage);
    }, [userDetailsRedux]);

    useEffect(() => {
        if (imageUrl?.length) {
            const ImagePayload: any = userDetailsRedux;
            ImagePayload.profileImage = imageUrl;
            dispatch(updateUserDetails(ImagePayload));
        }
    }, [imageUrl]);

    return (
        <div className="profileComponent">
            <Card>
                <div className="profileContainer">
                    <Row className="profileContainer">
                        <Col span={24} className="profileContainer__heading">
                            <ScreenNameHeading
                                heading={t('accountSettings.myProfile.myProfile')}
                                subHeading={t(
                                    'accountSettings.myProfile.profileDesp'
                                )}
                            />
                        </Col>
                        <Col className="profileContainer__content" span={24}>
                            <Row className="profileContainer__content__child">
                                <Col
                                    span={24}
                                    className="profileContainer__content__image"
                                >
                                    <ImageUpload
                                        setImageUrl={setImageUrl}
                                        imageUrl={imageUrl}
                                        deleteImage={deleteImage}
                                    />
                                </Col>
                                <Col span={24}>
                                    <Row className="profileContainer__content__details">
                                        <Col
                                            span={24}
                                            className="profileContainer__content__items"
                                        >
                                            <Card className="contentCard">
                                                <Form
                                                    form={personalForm}
                                                    initialValues={{
                                                        firstName:
                                                            userDetails?.firstName,
                                                        lastName:
                                                            userDetails?.lastName,
                                                        employeeId:
                                                            userDetails?.employeeId,
                                                        email: userDetails?.email,
                                                        mobileNo:
                                                            userDetails?.mobileNo,
                                                        designation:
                                                            userDetails?.designation,
                                                    }}
                                                    onFinish={
                                                        editPersonalDetails
                                                    }
                                                >
                                                    <Col
                                                        span={24}
                                                        className="contentCard__header"
                                                    >
                                                        <span className="contentCard__heading">
                                                            {t(
                                                                'accountSettings.myProfile.personalInfo'
                                                            )}
                                                        </span>
                                                        <div>
                                                            <CustomButton
                                                                type={
                                                                    editPersonalInfo
                                                                        ? 'Save'
                                                                        : 'Edit'
                                                                }
                                                                disabled={false}
                                                                typeOfButton="submit"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        span={24}
                                                        className="contentCard__fields"
                                                    >
                                                        <div className="contentCard__fields__details">
                                                            {!editPersonalInfo ? (
                                                                <Form.Item
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'users.userDetails.firstName'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <span>
                                                                        {
                                                                            firstName
                                                                        }
                                                                    </span>
                                                                </Form.Item>
                                                            ) : (
                                                                <Form.Item
                                                                    name="firstName"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                               ' users.userDetails.firstName'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                    rules={[
                                                                        {
                                                                            required:
                                                                                true,
                                                                            message:
                                                                                t(
                                                                            'accountSettings.myProfile.enterAlphabetOnly'
                                                                                ),
                                                                            pattern:
                                                                                /^[a-zA-Z-]+$/i,
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input
                                                                        name="firstName"
                                                                        defaultValue={
                                                                            firstName
                                                                        }
                                                                        value={
                                                                            firstName
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            )}

                                                            {!editPersonalInfo ? (
                                                                <Form.Item
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'users.userDetails.lastName'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <span>
                                                                        {
                                                                            lastName
                                                                        }
                                                                    </span>
                                                                </Form.Item>
                                                            ) : (
                                                                <Form.Item
                                                                    name="lastName"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'users.userDetails.lastName'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                    rules={[
                                                                        {
                                                                            message:
                                                                                t(
                                                                                   ' accountSettings.myProfile.enterAlphabetOnly'
                                                                                ),
                                                                            pattern:
                                                                                /^[a-zA-Z-]+$/i,
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input
                                                                        name="lastName"
                                                                        defaultValue={
                                                                            lastName
                                                                        }
                                                                        value={
                                                                            lastName
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            )}
                                                            {!editPersonalInfo ? (
                                                                <Form.Item
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'accountSettings.myProfile.employeeID'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <span>
                                                                        {
                                                                            employeeId
                                                                        }
                                                                    </span>
                                                                </Form.Item>
                                                            ) : (
                                                                <Form.Item
                                                                    name="employeeId"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'accountSettings.myProfile.employeeID'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <Input
                                                                        name="employeeId"
                                                                        defaultValue={
                                                                            employeeId
                                                                        }
                                                                        value={
                                                                            employeeId
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            )}
                                                        </div>
                                                        <div className="contentCard__fields__details">
                                                            {!editPersonalInfo ? (
                                                                <Form.Item
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'users.userDetails.workEmail'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <span>
                                                                        {email}
                                                                    </span>
                                                                </Form.Item>
                                                            ) : (
                                                                <Form.Item
                                                                    name="email"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'users.userDetails.workEmail'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <Input
                                                                        name="email"
                                                                        defaultValue={
                                                                            email
                                                                        }
                                                                        value={
                                                                            email
                                                                        }
                                                                        disabled
                                                                    />
                                                                </Form.Item>
                                                            )}
                                                            {!editPersonalInfo ? (
                                                                <Form.Item
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'accountSettings.myProfile.mobileNo'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <span>
                                                                        {
                                                                            mobileNo
                                                                        }
                                                                    </span>
                                                                </Form.Item>
                                                            ) : (
                                                                <Form.Item
                                                                    name="mobileNo"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'accountSettings.myProfile.mobileNo'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                    rules={[
                                                                        {
                                                                            max: 13,
                                                                            message:
                                                                                t(
                                                                                  '  accountSettings.myProfile.mobileDigitValidation'
                                                                                ),
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input
                                                                        name="mobileNo"
                                                                        defaultValue={
                                                                            mobileNo
                                                                        }
                                                                        value={
                                                                            mobileNo
                                                                        }
                                                                        className="hide-sorting"
                                                                        type="number"
                                                                        maxLength={
                                                                            10
                                                                        }
                                                                        // onKeyPress={}
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            )}
                                                            {!editPersonalInfo ? (
                                                                <Form.Item
                                                                    name="designation"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'users.userDetails.designation'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <span>
                                                                        {
                                                                            designation
                                                                        }
                                                                    </span>
                                                                </Form.Item>
                                                            ) : (
                                                                <Form.Item
                                                                    name="designation"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'users.userDetails.designation'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    {!editPersonalInfo ? (
                                                                        <span>
                                                                            {
                                                                                designation
                                                                            }
                                                                        </span>
                                                                    ) : (
                                                                        <Input
                                                                            name="designation"
                                                                            defaultValue={
                                                                                designation
                                                                            }
                                                                            value={
                                                                                designation
                                                                            }
                                                                            onChange={
                                                                                handleChange
                                                                            }
                                                                        />
                                                                    )}
                                                                </Form.Item>
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Form>
                                            </Card>
                                        </Col>
                                        <Col
                                            span={24}
                                            className="profileContainer__content__items"
                                        >
                                            <Card className="contentCard">
                                                <Form
                                                    form={addressForm}
                                                    initialValues={{
                                                        country:
                                                            userDetails?.address
                                                                ?.country,
                                                        city: userDetails
                                                            ?.address?.city,
                                                        state: userDetails
                                                            ?.address?.state,
                                                        zipCode:
                                                            userDetails?.address
                                                                ?.zipCode,
                                                    }}
                                                    onFinish={editAdressDetails}
                                                >
                                                    <Col
                                                        span={24}
                                                        className="contentCard__header"
                                                    >
                                                        <span className="contentCard__heading">
                                                            {t(
                                                                'commonStr.address'
                                                            )}
                                                        </span>
                                                        <div>
                                                            <CustomButton
                                                                type={
                                                                    editAddressInfo
                                                                        ? 'Save'
                                                                        : 'Edit'
                                                                }
                                                                disabled={false}
                                                                typeOfButton="submit"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        span={24}
                                                        className="contentCard__fields"
                                                    >
                                                        <div className="contentCard__fields__details">
                                                            {!editAddressInfo ? (
                                                                <Form.Item
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'commonStr.country'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <span>
                                                                        {
                                                                            country
                                                                        }
                                                                    </span>
                                                                </Form.Item>
                                                            ) : (
                                                                <Form.Item
                                                                    name="country"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'commonStr.country'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                    rules={[
                                                                        {
                                                                            message:
                                                                                t(
                                                                                    'accountSettings.myProfile .enterAlphabetOnly'
                                                                                ),
                                                                            pattern:
                                                                                /^[a-zA-Z-]+$/i,
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input
                                                                        name="country"
                                                                        defaultValue={
                                                                            country
                                                                        }
                                                                        value={
                                                                            country
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            )}
                                                            {!editAddressInfo ? (
                                                                <Form.Item
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'commonStr.city'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <span>
                                                                        {city}
                                                                    </span>
                                                                </Form.Item>
                                                            ) : (
                                                                <Form.Item
                                                                    name="city"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'commonStr.city'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                    rules={[
                                                                        {
                                                                            message:
                                                                                t(
                                                                                    'accountSettings.myProfile.enterAlphabetOnly'
                                                                                ),
                                                                            pattern:
                                                                                /^[a-zA-Z-]+$/i,
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input
                                                                        name="city"
                                                                        defaultValue={
                                                                            city
                                                                        }
                                                                        value={
                                                                            city
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            )}
                                                            {!editAddressInfo ? (
                                                                <Form.Item
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'commonStr.state'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <span>
                                                                        {state}
                                                                    </span>
                                                                </Form.Item>
                                                            ) : (
                                                                <Form.Item
                                                                    name="state"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'commonStr.state'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                    rules={[
                                                                        {
                                                                            message:
                                                                                t(
                                                                                    'accountSettings.myProfile.enterAlphabetOnly'
                                                                                ),
                                                                            pattern:
                                                                                /^[a-zA-Z-]+$/i,
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input
                                                                        name="state"
                                                                        defaultValue={
                                                                            state
                                                                        }
                                                                        value={
                                                                            state
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            )}
                                                        </div>
                                                        <div className="contentCard__fields__details">
                                                            {!editAddressInfo ? (
                                                                <Form.Item
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'commonStr.zipCode'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <span>
                                                                        {
                                                                            zipCode
                                                                        }
                                                                    </span>
                                                                </Form.Item>
                                                            ) : (
                                                                <Form.Item
                                                                    name="zipCode"
                                                                    label={
                                                                        <span>
                                                                            {t(
                                                                                'commonStr.zipCode'
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    <Input
                                                                        name="zipCode"
                                                                        defaultValue={
                                                                            zipCode
                                                                        }
                                                                        value={
                                                                            zipCode
                                                                        }
                                                                        className="hide-sorting"
                                                                        type="number"
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Form>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
    );
};

export default MyProfileComponent;
