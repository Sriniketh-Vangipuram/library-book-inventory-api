import { ApiError } from "../utils/apiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const validateRequest=(schema,property="body")=>{
    return(req,res,next)=>{
        const result=schema.safeParse(req[property]);

        if(!result.success){
            const errors=result.error.issues.map((issue)=>({
                field:issue.path.join("."),
                message:issue.message,
            }));

            return next(
                new ApiError(
                    HTTP_STATUS.BAD_REQUEST,
                    "Validation failed.",
                    errors
                )
            );
        }

        req[property]=result.data;
        next();
    };
};