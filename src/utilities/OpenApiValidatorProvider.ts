import { OpenApiValidator } from 'express-openapi-validate';
import fs from 'fs';
import path from 'path';

export default class OpenApiValidatorProvider {
    public static getValidator() {
        const openApiSpecificationFile = path.join(__dirname,
            '../../static/mutantOpenAPI.json');
        const openApiSpecification = fs.readFileSync(openApiSpecificationFile, 'utf-8');
        const openApiDocument = JSON.parse(openApiSpecification);
        return new OpenApiValidator(openApiDocument);
    }
}
