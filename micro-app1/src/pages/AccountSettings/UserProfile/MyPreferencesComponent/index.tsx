import { Card, Col, Row } from 'antd';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import React, { useEffect, useState } from 'react';
import './index.scss';
import CustomButton from 'components/common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import PreferenceItem from './PreferenceItem';
import AccountPreference from '../AccountPreference';
import {
    type PreferenceValueObjectProps,
    type DropDownValProps,
} from 'types/interfaces/PropsInterfaces';
import {
    getLoggedInUserDetails,
    updateUserPreferences,
} from 'redux/actions/UserManagementActions/usersAction';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';
const MyPreferencesComponent: React.FC = () => {
    const { t } = useTranslation('translation');
    const languagesList: [] = useSelector(
        (state: any) =>
            state.userManagement?.users?.userPreferences?.languageList
    );
    const temperatureList: [] = useSelector(
        (state: any) =>
            state.userManagement.users?.userPreferences?.temperatureList
    );
    const metricsListData: [] = useSelector(
        (state: any) => state.userManagement.users?.userPreferences?.metricsList
    );
    const dateFormatsList: [] = useSelector(
        (state: any) =>
            state.userManagement.users?.userPreferences?.dateFormatList
    );
    const timezonesList: [] = useSelector(
        (state: any) =>
            state.userManagement.users?.userPreferences?.timeZoneList
    );
    const numberFormatsList: [] = useSelector(
        (state: any) =>
            state.userManagement.users?.userPreferences?.numberFormatList
    );
    const userDetailsRedux: any = useSelector(
        (state: any) => state.userManagement.users?.userDetails
    );
    const [generalSettingsInformation, setGeneralSettingsInformation] =
        useState({
            language: {
                languageId: userDetailsRedux.language?.languageId,
                languageName: userDetailsRedux.language?.languageName,
            },
            dateFormat: {
                dateFormatId: userDetailsRedux.dateFormat?.dateFormatId,
                dateFormat: userDetailsRedux.dateFormat?.dateFormat,
            },
            timeZone: {
                timeZoneId: userDetailsRedux.timeZone?.timeZoneId,
                timeZone: userDetailsRedux.timeZone?.timeZone,
            },
            temperature: {
                temperatureId: userDetailsRedux.temperature?.temperatureId,
                temperatureType: userDetailsRedux.temperature?.temperatueType,
            },
            metrics: {
                metricId: userDetailsRedux.metrics?.metricId,
                metricSystem: userDetailsRedux.metrics?.metricSystem,
            },
            numberFormat: {
                numberFormatId: userDetailsRedux.numberFormat?.numberFormatId,
                numberFormat: userDetailsRedux.numberFormat?.numberFormat,
            },
        });
    const [editGeneralSettingsInfo, setEditGeneralSettingsInfo] =
        useState(false);
    const dispatch = useDispatch();

    const userPreferences: any = useSelector(
        (state: any) => state.userManagement.users.editPreferences
    );
    const editGeneralSettings = (
        evt: React.ChangeEvent<HTMLInputElement>
    ): boolean => {
        const payload = { ...userDetailsRedux, ...generalSettingsInformation };
        dispatch(updateUserPreferences(payload));

        setEditGeneralSettingsInfo(false);
        return true;
    };
    const handlerFunction = (dropdownVal: DropDownValProps): void => {
        const name = dropdownVal.name;
        const value = dropdownVal.value;
        const label = dropdownVal.label;

        switch (name) {
            case 'language':
                setGeneralSettingsInformation({
                    ...generalSettingsInformation,
                    language: { languageId: value, languageName: label },
                });

                break;
            case 'dateFormat':
                setGeneralSettingsInformation({
                    ...generalSettingsInformation,
                    dateFormat: { dateFormatId: value, dateFormat: label },
                });

                break;
            case 'timeZone':
                setGeneralSettingsInformation({
                    ...generalSettingsInformation,
                    timeZone: { timeZoneId: value, timeZone: label },
                });

                break;
            case 'metrics':
                setGeneralSettingsInformation({
                    ...generalSettingsInformation,
                    metrics: { metricId: value, metricSystem: label },
                });

                break;
            case 'numberFormat':
                setGeneralSettingsInformation({
                    ...generalSettingsInformation,
                    numberFormat: {
                        numberFormatId: value,
                        numberFormat: label,
                    },
                });

                break;
            case 'temperature':
                setGeneralSettingsInformation({
                    ...generalSettingsInformation,
                    temperature: {
                        temperatureId: value,
                        temperatureType: label,
                    },
                });

                break;

            default:
                break;
        }
    };
    const iterateObject = (array: any, idName: any, nameVal: any): any => {
        const partialArrayItems = array?.reduce((res: any, item: any) => {
            res.push({ id: item[idName], name: item[nameVal] });
            return res;
        }, []);
        return partialArrayItems;
    };
    const PreferenceValueItems: PreferenceValueObjectProps[] = [
        {
            nameValue: 'language',
            labelValue: 'Language',
            editInfo: editGeneralSettingsInfo,
            onChange: handlerFunction,
            optionsDataVal: iterateObject(
                languagesList,
                'languageId',
                'languageName'
            ),
            value: userDetailsRedux.language?.languageName,
            showSearchbar: true,
        },
        {
            nameValue: 'dateFormat',
            labelValue: 'Date Format',
            editInfo: editGeneralSettingsInfo,
            onChange: handlerFunction,
            optionsDataVal: iterateObject(
                dateFormatsList,
                'dateFormatId',
                'dateFormat'
            ),
            value: userDetailsRedux.dateFormat?.dateFormat,
            showSearchbar: false,
        },
        {
            nameValue: 'timeZone',
            labelValue: 'Time Zone',
            editInfo: editGeneralSettingsInfo,
            onChange: handlerFunction,
            optionsDataVal: iterateObject(
                timezonesList,
                'timeZoneId',
                'timeZone'
            ),
            value: userDetailsRedux.timeZone?.timeZone,
            showSearchbar: true,
        },
        {
            nameValue: 'temperature',
            labelValue: 'Temperature',
            editInfo: editGeneralSettingsInfo,
            onChange: handlerFunction,
            optionsDataVal: iterateObject(
                temperatureList,
                'temperatureId',
                'temperatureType'
            ),

            value: userDetailsRedux.temperature?.temperatureType,
            showSearchbar: false,
        },
        {
            nameValue: 'metrics',
            labelValue: 'Metrics',
            editInfo: editGeneralSettingsInfo,
            onChange: handlerFunction,
            optionsDataVal: iterateObject(
                metricsListData,
                'metricId',
                'metricSystem'
            ),
            value: userDetailsRedux.metrics?.metricSystem,
            showSearchbar: false,
        },
        {
            nameValue: 'numberFormat',
            labelValue: 'Number Format',
            editInfo: editGeneralSettingsInfo,
            onChange: handlerFunction,
            optionsDataVal: iterateObject(
                numberFormatsList,
                'numberFormatId',
                'numberFormat'
            ),

            value: userDetailsRedux.numberFormat?.numberFormat,
            showSearchbar: false,
        },
    ];
    const user = parseJwt();
    useEffect(() => {
        dispatch(getLoggedInUserDetails(user.UserId));
    }, [userPreferences]);

    return (
        <div className="myPreferencesComponent">
            <Card>
                <Row className="preferenceContainer">
                    <Col span={24} className="preferenceContainer__heading">
                        <ScreenNameHeading
                            heading={t('accountSettings.preferences')}
                            subHeading={t('accountSettings.editTheme')}
                        />
                    </Col>
                    <Col className="preferenceContainer__content">
                        <Row className="preferenceContainer__content__child">
                            <Col span={24}>
                                <Row className="preferenceContainer__content__details">
                                    <Col
                                        span={24}
                                        className="preferenceContainer__content__items"
                                    >
                                        <Card className="contentCardOne">
                                            <div className="contentCardOne__header">
                                                <span>
                                                    {t('accountSettings.theme')}
                                                </span>
                                                <span>
                                                    {t(
                                                        'accountSettings.choosePreferedTheme'
                                                    )}
                                                </span>
                                            </div>

                                            <div className="contentCardOne__fields">
                                                <AccountPreference />
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col
                                        span={24}
                                        className="preferenceContainer__content__items"
                                    >
                                        <Card className="contentCardTwo">
                                            <Col
                                                span={24}
                                                className="contentCardTwo__header"
                                            >
                                                <span className="contentCardTwo__heading">
                                                    {t(
                                                        'accountSettings.generalSettings'
                                                    )}
                                                </span>
                                                <div>
                                                    {editGeneralSettingsInfo ? (
                                                        <CustomButton
                                                            type="Save"
                                                            disabled={false}
                                                            handleClick={(
                                                                e: React.ChangeEvent<HTMLInputElement>
                                                            ) =>
                                                                editGeneralSettings(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <CustomButton
                                                            type="Edit"
                                                            disabled={false}
                                                            handleClick={() => {
                                                                setEditGeneralSettingsInfo(
                                                                    true
                                                                );
                                                                setGeneralSettingsInformation(
                                                                    {
                                                                        ...generalSettingsInformation,
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </Col>

                                            <Col
                                                span={24}
                                                className="contentCardTwo__fields"
                                            >
                                                <div className="contentCardTwo__fields__details">
                                                    {PreferenceValueItems.map(
                                                        (item: any, i: any) => (
                                                            <PreferenceItem
                                                                key={i}
                                                                nameValue={
                                                                    item.nameValue
                                                                }
                                                                value={
                                                                    item.value
                                                                }
                                                                labelValue={
                                                                    item.labelValue
                                                                }
                                                                editInfo={
                                                                    item.editInfo
                                                                }
                                                                onChange={
                                                                    item.onChange
                                                                }
                                                                optionsDataVal={
                                                                    item.optionsDataVal
                                                                }
                                                                showSearchbar={
                                                                    item.showSearchbar
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </Col>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default MyPreferencesComponent;
