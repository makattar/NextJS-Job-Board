import { z } from "zod";

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});
export type jobFilterSchemaType = z.infer<typeof jobFilterSchema>;

interface ValidateInterface<T> {
  data: T;
  isOk: boolean;
  errors: string[];
}

export function validateSchema(
  inputData: unknown,
  schema: z.Schema,
): ValidateInterface<z.infer<typeof schema>> {
  try {
    let parsed = schema.parse(inputData);
    return {
      errors: [],
      isOk: true,
      data: parsed,
    };
  } catch (err) {
    let errors = [];
    if (err instanceof z.ZodError) {
      errors = err.issues.map((e) => {
        return `${e.path[0]}: ${e.message}`;
      });
    } else {
      errors = ["Internal Server Error"];
    }
    return {
      isOk: false,
      data: null,
      errors: errors,
    };
  }
}
