<template>
    <div class="rt-header">
        <h2>{{title}}</h2>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "RtHeader",
    props: {
        title: {
            type: String,
            default: '',
            required: true
        }
    }
}
</script>