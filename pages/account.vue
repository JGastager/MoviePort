<template>
  <div>
    <div v-if="accountDetails">
      <div class="flex gap-8 items-center">
        <div>
          <h1 v-if="accountDetails.username">Hallo, {{ accountDetails.username }}</h1>
          <small v-if="accountDetails.id" class="italic">Account-ID: {{ accountDetails.id }}</small>
          <small v-if="accountDetails.iso_3166_1"> | {{ accountDetails.iso_3166_1 }}</small>
        </div>
        <img class="rounded-full" v-if="gravatarUrl" :src="gravatarUrl" />
      </div>
      <div class="lists">
        <div class="favoriteMovies" v-if="favoriteMovies?.results?.length">
          <MovieListings title="Favorite Movies" :movies="favoriteMovies.results" />
        </div>
        <div class="favoriteTVShows" v-if="favoriteTVShows?.results?.length">
          <ShowListings title="Favorite TV Shows" :shows="favoriteTVShows.results" />
        </div>
        <div class="ratedMovies" v-if="ratedMovies?.results?.length">
          <MovieListings title="Rated Movies" :movies="ratedMovies.results" />
        </div>
        <div class="ratedTVShows" v-if="ratedTVShows?.results?.length">
          <ShowListings title="Rated TV Shows" :shows="ratedTVShows.results" />
        </div>
        <div class="watchlistMovies" v-if="watchlistMovies?.results?.length">
          <MovieListings title="Watchlist Movies" :movies="watchlistMovies.results" />
        </div>
        <div class="watchlistTVShows" v-if="watchlistTVShows?.results?.length">
          <ShowListings title="Watchlist TV Shows" :shows="watchlistTVShows.results" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/account";

const accountStore = useAccountStore();
const {
  accountDetails,
  favoriteMovies,
  favoriteTVShows,
  ratedMovies,
  ratedTVShows,
  watchlistMovies,
  watchlistTVShows
} = storeToRefs(accountStore);

const { fetchAccountDetails, fetchFavoriteMovies, fetchFavoriteTVShows, fetchRatedMovies, fetchRatedTVShows, fetchWatchlistMovies, fetchWatchlistTVShows } = accountStore;

onMounted(async () => {
  try {
    await fetchAccountDetails();
    await fetchFavoriteMovies();
    await fetchFavoriteTVShows();
    await fetchRatedMovies();
    await fetchRatedTVShows();
    await fetchWatchlistMovies();
    await fetchWatchlistTVShows();
  } catch (error) {
    console.error("Failed to fetch account details:", error);
  }
});

const gravatarUrl = computed(() =>
  accountDetails.value?.avatar?.gravatar?.hash
    ? `https://www.gravatar.com/avatar/${accountDetails.value.avatar.gravatar.hash}`
    : null
);
</script>
