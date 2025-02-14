import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('moviesStore', {
  state: () => ({
    popularMovies: [],
    trendingMovies: [],
  }),
  actions: {
    async fetchPopularMovies() {
      const response = await $fetch('/api/movie/popular')
      this.popularMovies = response.results
    },
    async fetchTrendingMovies(timeWindow: string = 'day') {
      const response = await $fetch(`/api/trending/movie/${timeWindow}`)
      this.trendingMovies = response.results
    },
  },
})
