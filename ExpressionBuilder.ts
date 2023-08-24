interface IExpression {
    type: 'number' | 'operator' | 'variable' | 'function';
    value: string | number;
    tokens?: IExpression[];
}

interface IScope {
    expression: string;
    variables: IExpression[];
    functions: IExpression[];
    operators: IExpression[];
}

const VarRegex = /VAR_(\d+)/;
const FuncRegex = /FUNC_(\d+)/;
const OpRegex = /OP_(\d+)/;
const OperatorsRegex = /[/*+-]/g;
const GuidRegex = /"[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"/ig;
const FunctionsRegex = /(min|max|product|count|sum|mean|median|mode|range)/g;
const data = [
    'min(1, 2) + max(3, 4, 5) / count(1, 2, "b34283cb-b17e-4ba7-a60d-20fe75bf8a06", 4444, "b34283cb-b17e-4ba7-a60d-20fe75bf8a06", 6666, 7) - "b34283cb-b17e-4ba7-a60d-20fe75bf8a06"',
    'min(1, 2, max(3, 4, "b34283cb-b17e-4ba7-a60d-20fe75bf8a06")) + 200'
];

function createTokenBoundary(token: string) {
    return `$${token}$`;
}

function parseVariables(scope: IScope) {
    const { variables } = scope;
    scope.expression = scope.expression.replace(GuidRegex, (value) => {
        variables.push({
            type: 'variable',
            value: value.replace(/"/g, '')
        });
        return createTokenBoundary(`VAR_${variables.length - 1}`);
    })
}

function parseOperators(scope: IScope) {
    const { operators } = scope;
    scope.expression = scope.expression.replace(OperatorsRegex, (value) => {
        operators.push({
            value,
            type: 'operator',
        });
        return createTokenBoundary(`OP_${operators.length - 1}`);
    })
}

function isFunctionExpression(token: string) {
    return FunctionsRegex.test(token);
}

function processFunctionArg(scope: IScope, token: string, tokens: IExpression[]) {
    if (token) {
        const index = token.split(VarRegex)[1]
        if (index) {
            tokens.push(scope.variables[parseInt(index, 10)]);
        }
        else {
            tokens.push({
                type: 'number',
                value: token
            })
        }
    }
}

function processFunctionArgs(scope: IScope, args: string[], currentFunction?: IExpression) {
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (isFunctionExpression(arg)) {
            const func: IExpression = {
                type: 'function',
                value: arg,
                tokens: []
            }
            scope.functions.push(func);
            processFunctionArgs(scope, args.slice(i + 1), func)
        }
        else if (currentFunction) {
            let previousIndex = 0;
            let unbalanced = 0;
            for (let j = 0; j < arg.length; j++) {
                const char = arg.charAt(j);
                if (char === '(') {
                    unbalanced++;
                    previousIndex = j + 1;
                }
                else if (char === ')') {
                    unbalanced--;
                    // TODOJEF: If unbalanced is not 0 here, we need to change the scope
                    processFunctionArg(scope, arg.slice(previousIndex, j), currentFunction.tokens!)
                    previousIndex = j + 1;
                }
                else if (char === ',') {
                    processFunctionArg(scope, arg.slice(previousIndex, j), currentFunction.tokens!)
                    previousIndex = j + 1;
                }
                if (!unbalanced) {
                    scope.expression = scope.expression.replace(
                        `${currentFunction.value}${arg.slice(0, previousIndex)}`,
                        createTokenBoundary(`FUNC_${scope.functions.length - 1}`)
                    )
                    break;
                }
            }
            if (!unbalanced) {
                break;
            }
        }
    }
}

function parseFunctions(scope: IScope) {
    const splits = scope.expression.split(FunctionsRegex);
    for (let i = 0; i < splits.length; i++) {
        const token = splits[i];
        if (isFunctionExpression(token)) {
            const func: IExpression = {
                type: 'function',
                value: token,
                tokens: []
            }
            scope.functions.push(func);
            processFunctionArgs(scope, splits.slice(i + 1), func)
        }
    }
}

function parseExpression(expression = '') {
    const scope: IScope = {
        // Remove any whitespace
        expression: expression.replace(/\s/g, ''),
        variables: [],
        functions: [],
        operators: []
    };
    parseVariables(scope);
    parseOperators(scope);
    parseFunctions(scope);
    const output: IExpression[] = []
    scope.expression.split('$').forEach((token) => {
        if (token) {
            const index = token.split('_')[1];
            if (VarRegex.test(token)) {
                output.push(scope.variables[parseInt(index, 10)])
            }
            else if (OpRegex.test(token)) {
                output.push(scope.operators[parseInt(index, 10)])
            }
            else if (FuncRegex.test(token)) {
                output.push(scope.functions[parseInt(index, 10)])
            }
            else {
                output.push({
                    type: 'number',
                    value: token
                })
            }
        }
    })
    return output;
}

const item = data[0];
const results = parseExpression(item)
console.log(JSON.stringify(results), item)
