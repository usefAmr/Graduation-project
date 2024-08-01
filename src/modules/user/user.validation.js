import joi from 'joi';

export const updateUser={
    body:joi.object({
        id:joi.string(),
        name:joi.string().alphanum(),
        email : joi.string().email(),
        role:joi.string().valid('student','admin'),
        level:joi.number().valid(1,2,3,4),
        student_status : joi.string().valid('archived','active'),
    }).required(),
}
