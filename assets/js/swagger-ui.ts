import SwaggerUIBundle from "swagger-ui-dist/swagger-ui-bundle.js";
import SwaggerUIStandalonePreset from "swagger-ui-dist/swagger-ui-standalone-preset.js";

document.querySelectorAll<HTMLElement>(".swagger-ui-wrapper").forEach((swaggerElement) => {
  SwaggerUIBundle({
    domNode: swaggerElement,
    url: swaggerElement.dataset?.openapiUrl,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ]
  });
});
