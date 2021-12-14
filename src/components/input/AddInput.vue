<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Thêm input
        </v-card-title>
        <v-card-text>
            <v-text-field label="id" v-model="newItem.id"></v-text-field>
            <v-text-field label="Title" v-model="newItem.title"></v-text-field>
            <v-text-field label="Giá trị khởi tạo" v-model="newItem.placeholder"></v-text-field>
            <v-text-field label="Nội dung mở rộng" v-model="newItem.appendText"></v-text-field>
            <div class="d-flex flex-column">
                <div>Định dạng input</div>
                <v-switch v-model="newItem.fixWidth" label="Width 250" class="mr-5"></v-switch>
                <v-slider max="12" ticks="always" :tick-labels="['0', 1, 2, 3, 4, 5, 6,7 , 8, 9, 10, 11, 12]" v-model="newItem.inputWidth" :disabled="newItem.fixWidth"></v-slider>
            </div>
            <h3>Định dạng label</h3>
            <div class="d-flex flex-column">
                <div>Chiều dài label</div>
                <v-slider max="12" ticks="always" :tick-labels="['0', 1, 2, 3, 4, 5, 6,7 , 8, 9, 10, 11, 12]" v-model="newItem.labelWidth" :disabled="newItem.fixWidth"></v-slider>
            </div>
            <v-btn fab class="my-2 mr-2" small @click="changeAlign('left')" :color="newItem.align == 'left' ? 'success' : ''"><v-icon>mdi-format-align-left</v-icon></v-btn>
            <v-btn fab class="ma-2" small @click="changeAlign('center')" :color="newItem.align == 'center' ? 'success' : ''"><v-icon>mdi-format-align-center</v-icon></v-btn>
            <v-btn fab class="ma-2" small @click="changeAlign('end')" :color="newItem.align == 'end' ? 'success' : ''"><v-icon>mdi-format-align-right</v-icon></v-btn>  
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5">
            <v-btn class="mx-3 success" @click="add()">Thêm</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        newItem: {
            align: 'left',
            fixWidth: false,
            inputWidth: 12,
            labelWidth: 1,
            appendText: ''
        },
    }),
    props: ['index'],
    methods: {
        add() {
            let vm = this
            if (vm.index != undefined) {
                vm.newItem.parentIndex = vm.index
            }
            vm.$emit("add", vm.newItem)
            vm.newItem = {
                labelWidth: 1,
                inputWidth: 12,
                align: 'left',
                fixWidth: false,
                appendText: ''
            }
        },
        changeAlign(align) {
            this.item.align = align
        },
    },
};
</script>