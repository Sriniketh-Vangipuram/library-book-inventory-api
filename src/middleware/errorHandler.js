import {errorResponse} from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const errorHandler=(err,req,res,_next)=>{
    const statusCode=err.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const message=err.message??"Something went wrong.";

    return errorResponse(
        res,
        statusCode,
        message,
        err.errors
    );
        
};

