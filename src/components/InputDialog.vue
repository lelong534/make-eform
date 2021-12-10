<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Thêm input
        </v-card-title>
        <v-card-text>
            <v-text-field label="id" v-model="item.id"></v-text-field>
            <v-text-field label="Title" v-model="item.title"></v-text-field>
            <v-text-field label="Placeholder" v-model="item.placeholder"></v-text-field>
           <div class="d-flex flex-column">
                <div>Chiều dài label</div>
                <v-slider max="12" ticks="always" :tick-labels="['0', 1, 2, 3, 4, 5, 6,7 , 8, 9, 10, 11, 12]" v-model="item.labelWidth"></v-slider>
           </div>
            <div class="d-flex flex-column">
                <div>Chiều dài input</div>
                <v-slider max="12" ticks="always" :tick-labels="['0', 1, 2, 3, 4, 5, 6,7 , 8, 9, 10, 11, 12]" v-model="item.inputWidth"></v-slider>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn class="mx-3 success" @click="add()">Tạo mới</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        item: {}
    }),
    methods: {
        add() {
            let vm = this
            vm.item.type = 'input'
            vm.$emit("add", this.item)
            vm.item = {}
        }
    },
};
</script>