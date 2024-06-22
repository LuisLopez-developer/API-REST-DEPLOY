const z = require('zod');

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'El titulo debe ser un texto',
        required_error: 'El titulo es requerido'
    }),
    year: z.number().int().positive(),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url({
        message: 'El poster debe ser una URL'
    }),
    rate: z.number().min(0).max(10).default(0),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Sci-Fi', 'Crime']),
        {
            invalid_type_error: 'El genero debe ser una de las siguientes opciones: Action, Adventure, Comedy, Drama, Fantasy, Horror, Sci-Fi',
            required_error: 'El genero es requerido'
        }
    )

})

function validateMovie(object){
    return movieSchema.safeParse(object)
}

function validatePartialMovie(object){
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}