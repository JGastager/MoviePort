<template>
  <div>
    <div class="button" v-if="!accountData" @click="fetchAccountData()">Fetch Account Data</div>
    <div v-if="accountData">
      <div class="flex gap-8 items-center">
        <div>
          <h1 v-if="accountData.username">Hallo, {{ accountData.username }}</h1>
          <small v-if="accountData.id" class="italic">Account-ID: {{ accountData.id }}</small>
          <small v-if="accountData.iso_3166_1"> | {{ accountData.iso_3166_1 }}</small>
        </div>
        <img class="rounded-full" v-if="gravatarUrl" :src="gravatarUrl" />
      </div>
      <div class="lists">
        <div class="favoriteMovies">
          <h2>Favorite Movies</h2>
          <pre>{{ favoriteMovies }}</pre>
        </div>
        <div class="favoriteTVShows">
          <h2>Favorite TV Shows</h2>
          <pre>{{ favoriteTVShows }}</pre>
        </div>
        <div class="ratedMovies">
          <h2>Rated Movies</h2>
          <pre>{{ ratedMovies }}</pre>
        </div>
        <div class="ratedTVShows">
          <h2>Rated TV Shows</h2>
          <pre>{{ ratedTVShows }}</pre>
        </div>
        <div class="watchlistMovies">
          <h2>Watchlist Movies</h2>
          <pre>{{ watchlistMovies }}</pre>
        </div>
        <div class="watchlistTVShows">
          <h2>Watchlist TV Shows</h2>
          <pre>{{ watchlistTVShows }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTMDB } from "#imports";
import { ref, computed, onMounted } from "vue";

const { fetchTMDB } = useTMDB();

const accountData = ref(null);
const favoriteMovies = ref(null);
const favoriteTVShows = ref(null);
const ratedMovies = ref(null);
const ratedTVShows = ref(null);
const watchlistMovies = ref(null);
const watchlistTVShows = ref(null);

// ✅ Use computed property for Gravatar URL
const gravatarUrl = computed(() =>
  accountData.value?.avatar?.gravatar?.hash
    ? `https://www.gravatar.com/avatar/${accountData.value.avatar.gravatar.hash}`
    : null
);

function loadAccountFromStorage() {
  const storedAccount = localStorage.getItem("account");
  if (storedAccount) {
    accountData.value = JSON.parse(storedAccount);
    getAccountDetails(accountData.value.id);
  }
}

async function fetchAccountData() {
  const sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    console.error("No session found. Please log in.");
    return;
  }

  try {
    accountData.value = await fetchTMDB("/account", {}, "GET", null, "session");
    localStorage.setItem("account", JSON.stringify(accountData.value));
    getAccountDetails(accountData.value.id);
  } catch (error) {
    console.error("Failed to fetch account data:", error);
  }
}

async function getAccountDetails(userId: number) {
  try {
    favoriteMovies.value = await fetchTMDB(`/account/${userId}/favorite/movies`, {}, "GET", null, "session");
    favoriteTVShows.value = await fetchTMDB(`/account/${userId}/favorite/tv`, {}, "GET", null, "session");
    ratedMovies.value = await fetchTMDB(`/account/${userId}/rated/movies`, {}, "GET", null, "session");
    ratedTVShows.value = await fetchTMDB(`/account/${userId}/rated/tv`, {}, "GET", null, "session");
    watchlistMovies.value = await fetchTMDB(`/account/${userId}/watchlist/movies`, {}, "GET", null, "session");
    watchlistTVShows.value = await fetchTMDB(`/account/${userId}/watchlist/tv`, {}, "GET", null, "session");
  } catch (error) {
    console.error("Failed to fetch account details:", error);
  }
}

// ✅ Load data from storage on component mount
onMounted(() => {
  loadAccountFromStorage();
});
</script>

<style lang="scss"></style>
