<template>
    <div class="min-h-screen bg-[#000711]">
        <div id="backdrop" class="fixed top-0 h-screen w-full" >
            <!-- <img src="~/assets/images/backdrop.jpg" class="h-full w-full object-cover" alt="Backdrop" > -->
        </div>
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
    font-weight: normal;
}

p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: normal;
}

h1 {
    margin: 0;
    padding: 0;
    font-size: 40px;
    font-weight: normal;
    line-height: 40px;
}

h2 {
    margin: 0;
    padding: 0;
    font-size: 28px;
    font-weight: normal;
}

h3 {
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: normal;
}

.button:has(span:only-child){
    padding-left: 0 !important;
    padding-right: 0 !important;
}

a {
    text-decoration: none;
    color: white;
}
</style>