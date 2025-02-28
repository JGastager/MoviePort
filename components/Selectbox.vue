<template>
    <div
        class="select-box card backdrop-blur hover:bg-primary/50"
        tabindex="0"
        :style="dropdownStyle"
        @click.self="toggleDropdown"
        @blur="checkBlur"
        @keyup.enter="openDropdown"
        @keyup.esc="closeDropdown"
        @keyup.up="navigateOptions('up')"
        @keyup.down="navigateOptions('down')"
    >
        <div class="selected" :style="selectedStyle" @click="toggleDropdown">
            <span v-if="selectedValue" class="active"></span>
            {{ findActiveLabel() || placeholder }}
            <span class="caret i-ph-caret-down-bold size-5" :style="caretStyle" />
            <span v-if="deselect && selectedValue" class="i-ph-x-bold deselect mr-2" @click.stop="clearSelection" />
        </div>
        <div ref="optionsRef" class="options" :style="dropdownOpen ? optionsStyle : 'height: 0;'">
            <div
                v-for="option in options"
                :key="getValue(option)"
                class="option h-10 flex cursor-pointer items-center rounded transition-colors duration-300 -my-1.5 last:mb-0 hover:bg-primary/20"
                :style="optionStyle"
                tabindex="-1"
                @click="selectOption(option)"
                @blur="checkBlur"
                @keyup.enter="selectOption(option)"
            >
                {{ getLabel(option) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, defineComponent } from "vue";

defineComponent({
    name: "SelectBoxComponent",
});

// Define Props
const props = defineProps({
    modelValue: {
        type: [String, Number, Boolean, Object, Array, null],
        required: false,
        default: null,
    },
    options: {
        type: Array as () => Array<Record<string, unknown>>,
        required: true,
    },
    valueField: {
        type: [String, Number],
        required: false,
        default: "value",
    },
    labelField: {
        type: String,
        required: false,
        default: "label",
    },
    placeholder: {
        type: String,
        required: false,
        default: "",
    },
    height: {
        type: Number,
        required: false,
        default: 46,
    },
    maxHeight: {
        type: Number,
        required: false,
        default: 345,
    },
    deselect: {
        type: Boolean,
        required: false,
        default: false,
    },
});

// Define Emits
const emit = defineEmits(["update:modelValue"]);

// Reactive State
const dropdownOpen = ref(false);
const selectedValue = ref(props.modelValue || null);
const focusedIndex = ref(-1);
const optionsRef = ref<HTMLElement | null>(null);

// Computed Styles
const dropdownStyle = computed(() => ({
    marginBottom: dropdownOpen.value ? `-${Math.min(props.options.length * 34 + 3, props.maxHeight)}px` : "0",
}));

const selectedStyle = computed(() => ({
    height: `${props.height}px`,
    lineHeight: `${props.height}px`,
}));

const caretStyle = computed(() => (dropdownOpen.value ? { transform: "rotate(-180deg)" } : {}));

const optionsStyle = computed(() => ({
    height: dropdownOpen.value ? `${Math.min(props.options.length * 34 + 3, props.maxHeight)}px` : "0",
}));

const optionStyle = computed(() => ({
    lineHeight: `${props.height}px`,
}));

// Watch for modelValue changes
watch(
    () => props.modelValue,
    (newValue) => {
        selectedValue.value = newValue;
    },
);

// Methods
const findActiveLabel = () => {
    if (selectedValue.value !== null) {
        const option = props.options.find((o) => getValue(o) === selectedValue.value);
        return option ? getLabel(option) : null;
    }
    return null;
};

const getNestedValue = (obj: Record<string, unknown>, path: string) => {
    const parts = path.replace(/\[(\w+)\]/g, ".$1").split(".");
    return parts.reduce((o, key) => (o && key in o ? o[key] : null), obj);
};

const getLabel = (option: Record<string, unknown>) => getNestedValue(option, props.labelField) || option.label;

const getValue = (option: Record<string, unknown>) => getNestedValue(option, props.valueField) || option.value;

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
    dropdownOpen.value = false;
};

const openDropdown = () => {
    dropdownOpen.value = true;
    focusOption();
};

const clearSelection = () => {
    selectedValue.value = null;
    emit("update:modelValue", selectedValue.value);
    closeDropdown();
};

const selectOption = (option: Record<string, unknown>) => {
    selectedValue.value = getValue(option);
    emit("update:modelValue", selectedValue.value);
    closeDropdown();
};

const checkBlur = (event: FocusEvent) => {
    const target = event.relatedTarget as HTMLElement;
    if (optionsRef.value && optionsRef.value.contains(target)) {
        return;
    }
    closeDropdown();
};

const navigateOptions = (direction: "up" | "down") => {
    openDropdown();

    if (direction === "up") {
        focusedIndex.value = Math.max(0, focusedIndex.value - 1);
    } else if (direction === "down") {
        focusedIndex.value = Math.min(props.options.length - 1, focusedIndex.value + 1);
    }

    focusOption();
};

const focusOption = () => {
    nextTick(() => {
        if (optionsRef.value && optionsRef.value.children.length > 0) {
            const focusedOption = optionsRef.value.children[focusedIndex.value] as HTMLElement;
            focusedOption?.focus();
        }
    });
};
</script>

<style scoped>
.select-box {
    cursor: pointer;
    text-align: left;
    transition:
        margin-bottom 0.3s ease,
        background-color 0.3s ease;
    overflow: hidden;
    min-width: 240px;
    z-index: 1;
    font-size: 16px;
    color: #fff;
}

.select-box .selected {
    padding: 0 1rem;
    border-radius: 8px;
    color: #fff;
}

.select-box .options {
    transition: height 0.3s ease;
    overflow: auto;
}

.select-box .option {
    padding: 0 1rem;
}

.select-box .option:hover,
.select-box .option:focus {
    outline: none;
}

.select-box .deselect,
.select-box .caret {
    float: right;
    cursor: pointer;
    height: 100%;
    transition: transform 0.3s ease;
}
</style>
