<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Chỉnh sửa text
        </v-card-title>
        <v-card-text>
            <v-text-field v-model="item.title" label="Nội dung"></v-text-field>
            <v-row>
                <v-btn fab class="ma-2" small @click="changeAlign('left')" :color="item.align == 'left' ? 'success' : ''"><v-icon>mdi-format-align-left</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeAlign('center')" :color="item.align == 'center' ? 'success' : ''"><v-icon>mdi-format-align-center</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeAlign('end')" :color="item.align == 'end' ? 'success' : ''"><v-icon>mdi-format-align-right</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeWeight()" :color="item.weight == 'bold' ? 'yellow' : ''"><v-icon>mdi-format-bold</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeStyle()" :color="item.style == 'italic' ? 'info' : ''"><v-icon>mdi-format-italic</v-icon></v-btn>
                <!-- <v-btn fab class="ma-2 size" small>
                    <v-text-field rounded v-model="size"></v-text-field>
                </v-btn> -->
                <v-btn fab class="ma-2" small @click="changeSize()" :color="item.size == 'h3' ? 'cyan' : ''"><v-icon>mdi-format-header-3</v-icon></v-btn>
            </v-row>
            <v-row>
                <v-col>
                    <div>Chọn chiều dài</div>
                    <v-range-slider min="0" max="12" :tick-labels="['0', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" v-model="item.width"></v-range-slider>
                </v-col>
            </v-row>
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
        changeAlign(align) {
            this.item.align = align
        },
        changeWeight() {
            let vm = this
            if (vm.item.weight == 'normal') vm.item.weight = 'bold'
            else vm.item.weight = 'normal'
        },
        changeStyle() {
            let vm = this
            if (vm.item.style == 'normal') vm.item.style = 'italic'
            else vm.item.style = 'normal'
        },
        changeSize() {
            let vm = this
            if (vm.item.size == '') {
                vm.item.size = 'h3'
            }
            else vm.item.size = ''
        },
        update() {
            let vm = this
            vm.$emit("add", vm.item)
        }
    }
};
</script>