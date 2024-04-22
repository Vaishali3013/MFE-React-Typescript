import './index.scss';
import BraboFooterLogo from 'assets/icons/homePage-BraboIcon.svg';
import { ReactComponent as HomeBox } from 'assets/icons/homeBox.svg';

const Home: React.FC<any> = () => {
    return (
        <>
            <div className="home">
                <div className="home__content">
                    <div className="header">
                        <div className="header__title fw-400 fs-54">
                            Welcome to{' '}
                        </div>
                        <img src={BraboFooterLogo} alt="icon" />
                    </div>
                    <div className="subtitle fw-500 fs-18">
                        Manufacturing Connectivity and Intelligence Platform
                    </div>
                    <HomeBox />
                    <div className="footer__text  fs-18 fw-400">
                        Use the main menu to get started
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
