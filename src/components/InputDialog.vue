<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Thêm input
        </v-card-title>
        <v-card-text>
            <v-text-field label="id" v-model="item.id"></v-text-field>
            <v-text-field label="Title" v-model="item.title"></v-text-field>
            <v-text-field label="Giá trị khởi tạo" v-model="item.placeholder"></v-text-field>
            <div class="d-flex flex-column">
                <div>Định dạng input</div>
                <v-switch v-model="item.fixWidth" label="Width 250" class="mr-5"></v-switch>
                <v-slider max="12" ticks="always" :tick-labels="['0', 1, 2, 3, 4, 5, 6,7 , 8, 9, 10, 11, 12]" v-model="item.inputWidth"></v-slider>
            </div>
            <h3>Định dạng label</h3>
            <div class="d-flex flex-column">
                <div>Chiều dài label</div>
                <v-slider max="12" ticks="always" :tick-labels="['0', 1, 2, 3, 4, 5, 6,7 , 8, 9, 10, 11, 12]" v-model="item.labelWidth" :disabled="item.fixWidth"></v-slider>
            </div>
            <v-btn fab class="my-2 mr-2" small @click="changeAlign('left')" :color="item.align == 'left' ? 'success' : ''"><v-icon>mdi-format-align-left</v-icon></v-btn>
            <v-btn fab class="ma-2" small @click="changeAlign('center')" :color="item.align == 'center' ? 'success' : ''"><v-icon>mdi-format-align-center</v-icon></v-btn>
            <v-btn fab class="ma-2" small @click="changeAlign('end')" :color="item.align == 'end' ? 'success' : ''"><v-icon>mdi-format-align-right</v-icon></v-btn>       
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5">
            <v-btn class="mx-3 success" @click="add()">Tạo mới</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        item: {
            labelWidth: 1,
            inputWidth: 12,
            align: 'left',
            fixWidth: false
        }
    }),
    methods: {
        add() {
            let vm = this
            vm.item.type = 'input'
            vm.$emit("add", this.item)
            vm.item = {
                labelWidth: 1,
                inputWidth: 12,
                align: 'left',
                fixWidth: false
            }
        },
        changeAlign(align) {
            this.item.align = align
        },
    },
};
</script>