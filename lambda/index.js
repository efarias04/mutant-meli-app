console.log('start-lambda', 'Iniciando lambda...');
const app = require('./build/app').default;
const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
if (isInLambda) {
    const serverlessExpress = require('aws-serverless-express');
    const server = serverlessExpress.createServer(app);
    exports.handler = (event, context) => serverlessExpress.proxy(server, event, context)
} else {
    console.error('Error executing as lambda.');
}
