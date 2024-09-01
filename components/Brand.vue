<template>
  <div id="brand" class="absolute left-22.5 top-0 h-18 w-108 transform bg-primary/30 backdrop-blur -translate-y-full" />
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
#brand {
  mask-image: url('~/assets/images/brand.svg');
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: bottom left;
}
</style>