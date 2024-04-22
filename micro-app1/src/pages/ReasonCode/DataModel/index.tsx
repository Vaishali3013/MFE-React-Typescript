import { useEffect } from 'react';
import './index.scss';
import { ReactComponent as WasherDataModel } from 'assets/icons/washer.svg';
import { reasonCodeLanguage } from 'types/enums';
import { reasonCodeMarathiLanguage } from 'types/enums/reasonCodeMarathiLanguage';

const DataModel: React.FC<any> = ({
    dataModel,
    setAssetId,
    assetId,
    languageState,
}) => {
    const onModelClick = (item: any): any => {
        setAssetId(item.id);
    };
    useEffect(() => {
        if (dataModel && dataModel.length > 0 && !assetId) {
            setAssetId(dataModel[0].id); // by default first category(model) should be selected
        }
    }, [dataModel, assetId, setAssetId]);

    const translatedReasonCode = (item: any, languageState: string): any => {
        if (languageState === reasonCodeLanguage.MARATHI) {
            return (
                reasonCodeMarathiLanguage[item.name]?.marathiName || item?.name
            );
        } else {
            return reasonCodeMarathiLanguage[item.name]?.name || item?.name;
        }
    };

    return (
        <>
            <div className="dataModel">
                {dataModel?.map((item: any) => (
                    <div
                        className={`dataModel__card ${
                            assetId === item.id ? 'active' : ''
                        }`}
                        onClick={() => onModelClick(item)}
                        key={item.id}
                    >
                        <div className="dataModel__content">
                            <WasherDataModel />
                            <span>
                                {translatedReasonCode(item, languageState)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default DataModel;
