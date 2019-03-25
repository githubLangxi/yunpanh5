<template>
    <div class="rt-content" :class="{'with-side':$slots.side}">
        <div class="rt-content__side" v-if="$slots.side" v-bind:style="sideStyle">
            <slot name="side"></slot>
        </div>
        <div id="contentMain" class="rt-content__main">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "RtContent",
    props: {
    },
    data() {
        return {
            sideStyle: null
        }
    },
    mounted() {
        if (this.$slots.side) {
        }
    }
}
</script>