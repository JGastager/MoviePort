<template>
    <div>
        <div class="tabs pointers-none w-max flex cursor-default items-center card">
            <span v-for="(tab, index) in tabs" :key="index" class="cursor-pointer px-4 transition-all duration-300" tabindex="0" :class="{ button: activeTab === index }" @click="$emit('update:activeTab', index)">
                {{ tab }}
            </span>
        </div>
        <div class="tabs-content mt-8">
            <div v-for="(tab, index) in tabs" v-show="activeTab === index" :key="index">
                <slot :name="'content-' + index" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

defineComponent({
    name: "TabsComponent",
});

defineProps({
    tabs: {
        type: Array,
        required: true,
    },
    activeTab: {
        type: Number,
        required: false,
        default: 0,
    },
});

defineEmits(["update:activeTab"]);
</script>
