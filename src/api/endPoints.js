
export const CATEGORY = {
    tv: 'tv',
    movie: 'movie'
}

export const MOVIETYPE = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const TVTYPE = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const API = {
    baseApi: 'https://api.themoviedb.org/3/',
    imageApi: 'https://image.tmdb.org/t/p/',
    search: this.baseApi + 'search/',
    discover: this.baseApi + 'discover/',
    imageWeb: this.imageApi + 'w1280',
    imageMobile: this.imageApi + 'w500',

}

export default API;