<template>
    <!-- 暂时不添加人员信息，后期确认后再完善 -->
    <!-- <van-col span="22" offset="1">
        <van-row class="block margin_10_0">
            <van-col><van-image width="40" height="40" :src="props.ModelValue.CUser.Avatar"></van-image></van-col>
            <van-col offset="1"><van-row>编辑:{{ props.ModelValue.CUser.Name }}</van-row>
                <van-row>岗位:{{ props.ModelValue.CUser.UnitName }}-{{ props.ModelValue.CUser.PostName }}</van-row></van-col>
            <van-col offset="5">{{ props.ModelValue.CUser.CTime }}</van-col>
        </van-row>
    </van-col> -->
    <van-col class="padding20top" span="22" offset="1" v-html="ModelValue"></van-col>
</template>
<script setup lang='ts'>

interface Props {
    // ModelValue: {
    //     CUser: {
    //         Avatar: string,
    //         UID: number,
    //         Name: string,
    //         PostName: string,
    //         UnitName: string,
    //         CTime: string | Date
    //     },
    //     Memo: string
    // }
    ModelValue: string
}

const props = withDefaults(defineProps<Props>(), {
    // ModelValue: () => {
    //     return {
    //         CUser: {
    //             Avatar: '',
    //             UID: 0,
    //             Name: '',
    //             PostName: '',
    //             UnitName: '',
    //             CTime: ''
    //         },
    //         Memo: ''
    //     }
    // }
    ModelValue: ''
})
</script>
<style scoped lang='less'></style>