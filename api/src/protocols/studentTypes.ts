export type UpdateStudentSchemaType = {
    select: {
        student_id: number;
    };
    update: {
        name: string;
        email: string;
    };
};
