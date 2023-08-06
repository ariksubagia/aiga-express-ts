import { z } from 'zod'

const schema = z.object({
    name: z.string(),
    gender: z.string().optional()
})

export default schema
export type SchemaType = z.infer<typeof schema>