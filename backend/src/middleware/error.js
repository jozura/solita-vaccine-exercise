import { HttpException } from './HttpException.js';
 
function errorMiddleware(error,
                         _req,
                         response,
                         _next) 
{
  const status = error.status || 500;
  const message = error.status === 500 ? 'Internal server error.' :
    error.message || 'Something went wrong';

  response
    .status(status)
    .send({
      status,
      message,
    });
}
 
export default errorMiddleware;
