<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Thêm text </v-card-title>
        <v-card-text>
            <v-text-field v-model="newItem.title" label="Nội dung"></v-text-field>
            <v-row>
                <v-btn fab class="ma-2" small @click="changeAlign('left')" :color="align == 'left' ? 'success' : ''"><v-icon>mdi-format-align-left</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeAlign('center')" :color="align == 'center' ? 'success' : ''"><v-icon>mdi-format-align-center</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeAlign('end')" :color="align == 'end' ? 'success' : ''"><v-icon>mdi-format-align-right</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeWeight()" :color="weight == 'bold' ? 'yellow' : ''"><v-icon>mdi-format-bold</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeStyle()" :color="style == 'italic' ? 'info' : ''"><v-icon>mdi-format-italic</v-icon></v-btn>
                <!-- <v-btn fab class="ma-2 size" small>
                    <v-text-field rounded v-model="size"></v-text-field>
                </v-btn> -->
                <v-btn fab class="ma-2" small @click="changeSize()" :color="size == 'h3' ? 'cyan' : ''"><v-icon>mdi-format-header-3</v-icon></v-btn>
            </v-row>
            <v-row>
                <v-col>
                    <div>Chọn chiều dài</div>
                    <v-range-slider min="0" max="12" :tick-labels="['0', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" v-model="newItem.width"></v-range-slider>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions class="d-flex justify-center pb-5">
        <v-btn class="mx-3 success" @click="add()">Tạo mới</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        newItem: {
            width: [0,12]
        },
        align: 'left',
        weight: 'normal',
        style: 'normal',
        size: ''
        // size: 12
    }),
    methods: {
        add() {
            let vm = this
            vm.newItem.type = 'text'
            vm.newItem.align = vm.align
            vm.newItem.weight = vm.weight
            vm.newItem.style = vm.style
            vm.newItem.size =  vm.size
            vm.$emit("add", vm.newItem)
            vm.newItem = {
                width: [0,12]
            }
            vm.align = 'left'
            vm.weight = 'normal'
            vm.style = 'normal'
            vm.size = ''
        },
        changeAlign(align) {
            this.align = align
        },
        changeWeight() {
            if (this.weight == 'normal') this.weight = 'bold'
            else this.weight = 'normal'
        },
        changeStyle() {
            if (this.style == 'normal') this.style = 'italic'
            else this.style = 'normal'
        },
        changeSize() {
            if (this.size == '') {
                this.size = 'h3'
            }
            else this.size = ''
        }, 
        changeFormat() {
            this.weight = 'normal'
            this.style = 'normal'
        }
    },
};
</script>