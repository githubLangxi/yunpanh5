<template>
    <el-dropdown @command="setLanguage" v-if="locales.length > 1">
        <span class="el-dropdown-link">
            {{selectedLocale.native}}
            <!-- <i class="el-icon-caret-bottom el-icon--right"></i> -->
             <!-- <i class="el-icon-arrow-down"></i> -->
        </span>
        <el-dropdown-menu slot="dropdown" class="rt-dropdown-menu">
            <el-dropdown-item v-for='locale in locales' :key="locale.value" :command="locale.value">{{locale.native}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import {
    locales
} from '@/config/i18n-map'

export default {
    data() {
        return {

        }
    },
    computed: {
        locales() {
            return locales;
        },
        selectedLocale() {
            if (rt.isNullOrWhiteSpace(this.$i18n.locale)) {
                return this.locales[0]
            }
            for (var i = 0; i < this.locales.length; i++) {
                if (this.locales[i].value === this.$i18n.locale) {
                    return this.locales[i];
                }
            }
        }
    },
    mounted: function () {
    },
    methods: {
        //语言选择
        setLanguage(locale) {
            //this.$i18n.locale = locale;
            localStorage.i18nLocale = locale;
            
            location.reload();
        },
    }
}
</script>

