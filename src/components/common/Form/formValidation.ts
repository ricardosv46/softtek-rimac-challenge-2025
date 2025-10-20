import { z } from "zod";

export const formSchema = z
  .object({
    documentType: z.string().min(1, "Selecciona un tipo de documento"),
    documentNumber: z.string().min(1, "Ingresa tu número de documento"),
    phone: z
      .string()
      .min(1, "Ingresa tu número de celular")
      .regex(/^9\d{8}$/, "El celular debe empezar con 9 y tener 9 dígitos"),
    privacyPolicy: z.boolean(),
    commercialCommunications: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.documentType === "DNI") {
      if (!/^\d{8}$/.test(data.documentNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El DNI debe tener 8 dígitos",
          path: ["documentNumber"],
        });
      }
    } else if (data.documentType === "CE") {
      if (!/^\d{9}$/.test(data.documentNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El CE debe tener 9 dígitos",
          path: ["documentNumber"],
        });
      }
    } else if (data.documentType === "PASAPORTE") {
      if (data.documentNumber.length < 6 || data.documentNumber.length > 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El documento debe tener entre 6 y 12 caracteres",
          path: ["documentNumber"],
        });
      }
    }
  });

export type FormData = z.infer<typeof formSchema>;
