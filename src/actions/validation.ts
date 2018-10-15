export const mapValidationErrors = (error: any) => {
    const recurseErrors = (err: any): any => {
        if (err.children.length === 0) {
            const constraints = err.constraints;
            return Object.keys(constraints).map(_ => constraints[_]).join(', ');
        }

        for (const child of err.children) {
            return recurseErrors(child);
        }
    };

    return error.message.reduce((acc: any, _: any) => {
        acc[_.property] = recurseErrors(_);
        return acc;
    }, {});
};
