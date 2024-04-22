import {
    LoadingOutlined
  } from '@ant-design/icons';
import './index.scss';


const Loader: React.FC = () => {
  return (
    <div className='container'>
     <LoadingOutlined />
    </div>
  );
};

export default Loader;
