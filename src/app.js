import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { ApiError } from "./utils/apiError.js";
import { HTTP_STATUS } from "./constants/httpStatus.js";
import { GENERAL_MESSAGES } from "./constants/messages.js";
import { API } from "./constants/api.js";
import { requestId } from "./middleware/requestId.js";

const app=express();

//Global middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(requestId);

//Routes
app.use(API.BASE_PATH,routes);

// 404 Handler
app.use((req,res,next)=>{
    next(
        new ApiError(
            HTTP_STATUS.NOT_FOUND,
            GENERAL_MESSAGES.ROUTE_NOT_FOUND
        )
    );
});

//Global error Handler
app.use(errorHandler);

export default app;