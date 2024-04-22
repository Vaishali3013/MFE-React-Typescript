import { ApiService, ApiServicePort } from "types/enums";
const commonRawServiceUrl =
  "https://{service-name}.rest.api.{environment}.solulever.com/v1";

const commonRawDashboardUrl =
  "https://{service-name}.{environment}test.solulever.com";
// https://kpi.rest.api.nocil-dev.solulever.com/

function getPortForService(serviceName: string): string {
  let servicePort = "";
  switch (serviceName) {
    case ApiService.AMP_CONFIGURATOR: {
      servicePort = ApiServicePort.AMP_CONFIGURATOR;
      break;
    }
    case ApiService.USER_MANAGEMENT: {
      servicePort = ApiServicePort.USER_MANAGEMENT;
      break;
    }
    case ApiService.ASSET_API: {
      servicePort = ApiServicePort.ASSET_API;
      break;
    }
    case ApiService.KPI_ENGINE: {
      servicePort = ApiServicePort.KPI_ENGINE;
      break;
    }
    case ApiService.REPORT_CONFIGURATOR: {
      servicePort = ApiServicePort.REPORT_CONFIGURATOR;
      break;
    }
    default:
      break;
  }
  return servicePort;
}

export function getUrlForApiService(serviceName: string): string {
  const applicationUrl = window.location.hostname; // 'brabo-platform.dev.solulever.com' : Format can be used to test
  let generatedUrl = "";
  switch (applicationUrl) {
    case "localhost": {
      generatedUrl =
        "https://localhost:" + getPortForService(serviceName) + "/v1";
      break;
    }
    case "mesukcoreapp.upl-ltd.com": {
      // TO BE DECLARED FOR UPL and OTHER CUSTOM CLIENT URLs
      break;
    }

    default: {
      const environment = applicationUrl.split(".")[1]; // [1] because the element @ index 1 will denote the environment,
      // sample url: brabo-platform.dev.solulever.com

      if (serviceName === "dashboard-builder") {
        generatedUrl = commonRawDashboardUrl
          .replace("{service-name}", serviceName)
          .replace("{environment}", environment);
      } else {
        generatedUrl = commonRawServiceUrl
          .replace("{service-name}", serviceName)
          .replace("{environment}", environment);
      }
      break;
    }
  }
  return generatedUrl;
}
