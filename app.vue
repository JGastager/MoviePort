<template>
    <div class="min-h-screen bg-[#000711]">
        <img src="~/assets/images/wallpaper.jpg" class="fixed top-0 h-screen w-full object-cover" alt="Wallpaper" >
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
        <div id="modals" />
    </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
}

body {
    margin: unset;
    color: white;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-size: 1rem;
}
</style>