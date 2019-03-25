<template>
    <div class="rt-section" :class="{'is-collapsed':isCollapsed}">
        <div class="rt-section__header">
            <span @click="handleClick">
                <i class="rt-section__header__arrow el-icon-arrow-down"></i>
                {{title}}
            </span>
            <rt-toolbar v-if="!isCollapsed">
                <slot name="toolbar"></slot>
            </rt-toolbar>
        </div>
        <el-collapse-transition>
            <div class="rt-section__content" v-show="!isCollapsed">
                <slot></slot>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
export default {
    name: "RtSection",
    props: {
        title: {
            type: String,
            default: '',
            required: true
        },
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isCollapsed:this.collapsed
        }
    },
    computed: {
        iconClass() {
            return this.isCollapsed ? "el-icon-arrow-down" : "el-icon-arrow-right";
        }
    },
    methods: {
        handleClick() {
            this.isCollapsed = !this.isCollapsed;
        }
    }
}
</script>