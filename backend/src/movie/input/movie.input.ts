import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class MovieInput {
    @Field()
    readonly title: string

    @Field()
    readonly description: string

    @Field((type) => Int)
    readonly published: number
}

@InputType()
export class MoviesPageInput {
    @Field()
    readonly searchQuery: string

    @Field()
    readonly take: number

    @Field()
    readonly skip: number

    @Field()
    readonly orderField: string

    @Field()
    readonly orderValue: string
}

@InputType()
export class UpdateMovieInput {
    @Field()
    readonly _id: string

    @Field({ nullable: true })
    readonly title?: string

    @Field({ nullable: true })
    readonly description?: string

    @Field((type) => Int, { nullable: true })
    readonly published?: number
}

@InputType()
export class FindMovieInput {
    @Field()
    readonly _id: string
}

@InputType()
export class SearchSortInput{
    @Field()
    readonly searchword: string
    
    @Field((type) => Int, { nullable: false })
    readonly sortfactor: number
}
