<template>
    <li class="rt-nav-item" @click="handleItemClick" :class='{"is-active": active,"is-disabled": disabled}'>
        <slot></slot>
    </li>
</template>
<script>
export default {
    name: 'RtNavItem',
    props: {
        href: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            index: 0
        }
    },
    computed: {
        active() {
            return this.index === this.$parent.activeIndex;
        }
    },
    created() {
        this.index = this.$parent.$children.length - 1;

    },
    mounted() {
    },
    methods: {
        handleItemClick() {
            if (this.disabled) {
                return;
            }

            this.$parent.activeIndex = this.index;

            var anchor = document.getElementById(this.href.substring(1));
            var contentMains = document.getElementsByClassName("rt-content__main");
            if (contentMains != null&&anchor!=null) {
                contentMains[0].scrollTop = anchor.offsetTop - 20;
            }
        }
    }
}
</script>