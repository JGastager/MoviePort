<template>
    <div id="brand" class="pointer-events-none absolute left-22.5 top-12 h-16 w-100 bg-primary/30 backdrop-blur" />
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
