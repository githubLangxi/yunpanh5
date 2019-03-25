<template>
    <div id="appFooter">
        <span>{{copyright}}</span>
    </div>
</template>


<script>

import { copyright } from '@/config/customization'

export default {
    computed: {
        copyright(){
            return copyright;
        }
    }
}
</script>

<style>
#appFooter {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #292c31;
    text-align: center;
    color: #bbbbbb;
    font-size: 12px;
    
    /*position: absolute;
    bottom: 0;*/
}
</style>
        