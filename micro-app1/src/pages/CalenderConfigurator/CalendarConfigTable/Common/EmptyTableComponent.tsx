import { Button, Empty } from 'antd';
import '../index.scss';
import { CalendarConfig } from 'types/enums';

const EmptyTableComponent = ({ configType, addClick,dayConfigData }: any): any => {
    let selectedCard = '';
    switch (configType) {
        case CalendarConfig.dayConfiguration:
            selectedCard = CalendarConfig.day;
            break;
        case CalendarConfig.shiftConfiguration:
            selectedCard = CalendarConfig.shift;
            break;
        default:
            break;
    }

    return (
        <div className="emptyTableComponent">
            <Empty
                description={
                    <span>
                        No {selectedCard?.toLocaleLowerCase()} has been added
                        yet
                    </span>
                }
            >{selectedCard === CalendarConfig.shift ?
                <Button type="primary" onClick={() => addClick()} disabled={!dayConfigData.length}>
                Add New {selectedCard}
            </Button> :
              <Button type="primary" onClick={() => addClick()}>
              Add New {selectedCard}
          </Button>
            }
               
            </Empty>
        </div>
    );
};

export default EmptyTableComponent;
