
<template>
    <div>
        <a href="/">
             <img src="/gxchain.svg" style="width: 100px; margin: 20px;">
        </a>
        <div class="ta-c"> 
            <a href="/" v-if="errCode == 404">
                <img :src="errImg" style="max-width: 360px;">
            </a>
            <div class="gray">
                {{ errMsg }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'error-layout',
    props: {
        error: Object,
    },
    computed: {
        errCode() {
            return this.error.statusCode
        },
        errImg() {
            if(this.errCode == 404) return 'https://gxchain.oss-cn-shanghai.aliyuncs.com/org/img/404.svg'
            return 'https://gxchain.oss-cn-shanghai.aliyuncs.com/org/img/server-error.svg'
        },
    },
    data() {
        return {
            errMsg: '',
        }
    },
    mounted() {
        this.errMsg = this.error.message
        if(this.errCode == 404) {
            let sec = 3
            let timing = setInterval(() => {
                this.errMsg = `back home in ${sec} seconds`
                if(sec == 0) {
                    clearInterval(timing)
                    location =  '/'
                }
                sec--
            }, 1e3)
        }
    }
}
</script>