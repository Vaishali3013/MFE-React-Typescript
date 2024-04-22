import './index.scss';

const BraboAssistant: React.FC<any> = () => {
    const commonRawServiceUrl =
        'https://{service-name}.ai.{environment}.solulever.com';
    const applicationUrl = window.location.hostname.split('.');
    const generatedUrl = commonRawServiceUrl
        .replace('{service-name}', 'brabo-platform')
        .replace('{environment}', applicationUrl[1]);
    return (
        <>
            <div className="braboAssistant">
                <iframe
                    className="braboAssistant__iframe"
                    src={generatedUrl}
                ></iframe>
            </div>
        </>
    );
};

export default BraboAssistant;
