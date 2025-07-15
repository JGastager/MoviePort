<template>
    <div id="brand" class="h-16 w-100 bg-primary/30 backdrop-blur <lg:h-10 <sm:w-12" />
</template>

<script lang="ts" setup>
defineOptions({
    name: "BrandComponent",
});
</script>

<style lang="scss">
#brand {
    mask-image: url("~/assets/images/brand.svg");
    mask-repeat: no-repeat;
    mask-size: contain;
    mask-position: bottom left;
}
</style>
