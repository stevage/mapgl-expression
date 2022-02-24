import { expression } from 'maplibre-gl/dist/style-spec';
/**
 * Class for working with Mapbox style expressions.
 *
 * See https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions
 */
export class Expression {
    constructor(parsedExpression) {
        this.parsedExpression = parsedExpression;
    }
    /**
     * Parse a Mapbox style expression.
     *
     * Pass an expected type to get tigher error checking and more precise types.
     */
    static parse(expr, expectedType) {
        // For details on use of this private API and plans to publicize it, see
        // https://github.com/mapbox/mapbox-gl-js/issues/7670
        let parseResult;
        if (expectedType) {
            parseResult = expression.createExpression(expr, {
                type: expectedType,
            });
            if (parseResult.result === 'success') {
                return new Expression(parseResult.value);
            }
        } else {
            parseResult = expression.createExpression(expr);
            if (parseResult.result === 'success') {
                return new Expression(parseResult.value);
            }
        }
        throw parseResult.value[0];
    }
    evaluate(feature, context = { zoom: 14 }) {
        return this.parsedExpression.evaluate(context, feature);
    }
}
