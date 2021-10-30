import { Model, Types } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Movie } from './movie.schema'
import {
    FindMovieInput,
    MovieInput, MoviesPageInput,
    UpdateMovieInput,
} from './input/movie.input'

@Injectable()
export class MovieService {

    constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

    async findAll(): Promise<Movie[]> {
        return this.movieModel.find().exec()
    }

    async create(createMovie: MovieInput): Promise<Movie> {
        const createdMovie = new this.movieModel(createMovie)
        return createdMovie.save()
    }

    async findOne(movie: FindMovieInput): Promise<Movie> {
        return this.movieModel.findById(movie._id)
    }

    async update(updateMovie: UpdateMovieInput): Promise<Movie> {
        const movie = await this.movieModel.findOne(
            new Types.ObjectId(updateMovie._id),
        )
        movie.title = updateMovie.title || movie.title
        movie.description = updateMovie.description || movie.description
        movie.published = updateMovie.published || movie.published
        movie.updatedAt = new Date()
        return movie.save()
    }

    async delete(_id: string): Promise<any> {
        return await this.movieModel.deleteOne({ _id: new Types.ObjectId(_id) })
    }

    async search(searchQuery: string): Promise<any> {
        return await this.movieModel
            .find({ title: { $regex: searchQuery, $options: 'i' } })
            .exec()
    }

    async order(sortfactor: number): Promise<any> {
        //send in either -1 for desc and 1 for asc
        return await this.movieModel.find().sort({ createdAt: sortfactor })
    }

    async searchPage(moviesPageInput: MoviesPageInput): Promise<Movie[]> {
        return await this.movieModel
            .find({ title: { $regex: moviesPageInput.searchQuery, $options: 'i' } } )
            .limit(moviesPageInput.take)
            .skip(moviesPageInput.skip)
            .sort({ [moviesPageInput.orderField]: moviesPageInput.orderValue })
            .exec()
    }
}
