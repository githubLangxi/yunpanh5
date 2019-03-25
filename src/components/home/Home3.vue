<template>
    <div class="home">
        <div class="content-center">
            <div id="notice">
                <notice></notice>
            </div>
            <div id="serviceList">
                <serviceList></serviceList>
            </div>
            <div id="notice">
                <notice></notice>
            </div>
            <div id="filedown">
                <fileDown></fileDown>
            </div>
        </div>
    </div>
</template>


<script>
import siteinvList from './siteinvList';
import serviceList from './serviceList';
import notice from './notice';
import fileDown from './download';

export default {
    data() {
        return {}
    },
    components: {
        'siteinvList': siteinvList,
        'serviceList': serviceList,
        'notice': notice,
        'fileDown': fileDown
    }
}
</script>

<style>
.home {
    width: 1268px;
    margin:0 auto;
}

.content-center {
    margin: 0 auto;
}

#siteinvList {
    float: left;
    height: 340px;
    width: 618px;
}

#serviceList {
    float: left;
    height: 340px;
    width: 618px;
}

#notice {
    float: left;
    height: 280px;
    width: 618px;
    margin-right: 30px;
}

#filedown {
    float: left;
    height: 280px;
    width: 618px;
}


@media screen and (min-width:1920px) {
    .home {
        width: 1818px;
    }
    .content-center {
        margin: 0 auto;
        width: 1469px;
    }
    #siteinvList {
        float: left;
        height: 400px;
        width: 718px;
    }


    #serviceList {
        float: left;
        height: 400px;
        width: 750px;
    }

    #notice {
        float: left;
        height: 400px;
        width: 718px;
        margin-right: 30px;
    }

    #filedown {
        float: left;
        height: 400px;
        width: 718px;
    }
}
</style>
