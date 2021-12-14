<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Chỉnh sửa input
        </v-card-title>
        <v-card-text>
            <div v-for="input in item.inputs" :key="input.index">
                <div class="headline"><b><u><i>Input {{input.title}} </i></u></b></div>
                <v-text-field label="id" v-model="input.id"></v-text-field>
                <v-text-field label="Title" v-model="input.title"></v-text-field>
                <v-text-field label="Giá trị khởi tạo" v-model="input.placeholder"></v-text-field> 
                <div class="d-flex flex-column">
                    <div>Định dạng input</div>
                    <v-switch v-model="input.fixWidth" label="Width 250" class="mr-5"></v-switch>
                    <v-slider max="12" ticks="always" :tick-labels="['0', 1, 2, 3, 4, 5, 6,7 , 8, 9, 10, 11, 12]" v-model="input.inputWidth"></v-slider>
                </div>
                <h3>Định dạng label</h3>
                <div class="d-flex flex-column">
                    <div>Chiều dài label</div>
                    <v-slider max="12" ticks="always" :tick-labels="['0', 1, 2, 3, 4, 5, 6,7 , 8, 9, 10, 11, 12]" v-model="input.labelWidth" :disabled="input.fixWidth"></v-slider>
                </div>
                <v-btn fab class="my-2 mr-2" small @click="changeAlign('left')" :color="input.align == 'left' ? 'success' : ''"><v-icon>mdi-format-align-left</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeAlign('center')" :color="input.align == 'center' ? 'success' : ''"><v-icon>mdi-format-align-center</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeAlign('end')" :color="input.align == 'end' ? 'success' : ''"><v-icon>mdi-format-align-right</v-icon></v-btn> 
            </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5">
            <v-btn class="mx-3 success" @click="update()">Cập nhật</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: ['item'],
    methods: {
        update() {
            let vm = this
            vm.$emit("add", vm.item)
        },
        changeAlign(align) {
            this.item.align = align
        },
    }
};
</script>