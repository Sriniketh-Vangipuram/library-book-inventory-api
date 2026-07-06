import xss from "xss";

const sanitize=(value)=>{
    if(typeof value==="string"){
        return xss(value.trim());
    }
    if(Array.isArray(value)){
        return value.map(sanitize);
    }
    
    if(value && typeof value==="object"){
        return Object.fromEntries(
            Object.entries(value).map(([key,value])=>[
                key,
                sanitize(value),
            ])
        );
    }
    return value;
};

export const sanitizeInput=(
    req,res,next
)=>{
    req.body=sanitize(req.body);

    next();
};