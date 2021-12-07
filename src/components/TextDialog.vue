<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Thêm text </v-card-title>
        <v-card-text>
            <v-text-field v-model="newItem.title" label="Nội dung"></v-text-field>
            <v-row>
                <v-btn fab class="ma-2" small @click="changeAlign('left')" :color="align == 'left' ? 'success' : ''"><v-icon>mdi-format-align-left</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeAlign('center')" :color="align == 'center' ? 'success' : ''"><v-icon>mdi-format-align-center</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeAlign('end')" :color="align == 'end' ? 'success' : ''"><v-icon>mdi-format-align-right</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeWeight('bold')" :color="weight == 'bold' ? 'yellow' : ''"><v-icon>mdi-format-bold</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeStyle('italic')" :color="style == 'italic' ? 'info' : ''"><v-icon>mdi-format-italic</v-icon></v-btn>
                <v-btn fab class="ma-2" small @click="changeFormat()"><strong>N</strong></v-btn>
                <v-btn fab class="ma-2 size" small>
                    <v-text-field rounded v-model="size"></v-text-field>
                </v-btn>    
            </v-row>
            <v-row>
                <v-col>
                    <div>Chọn chiều dài</div>
                    <v-range-slider min="0" max="12" :tick-labels="['0', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" v-model="newItem.width"></v-range-slider>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions>
        <v-btn class="mx-3 success" @click="add()">Tạo mới</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        newItem: {},
        align: 'left',
        weight: 'normal',
        style: 'normal',
        size: 14
    }),
    methods: {
        add() {
            let vm = this
            vm.newItem.type = 'text'
            vm.newItem.align = vm.align
            vm.newItem.weight = vm.weight
            vm.newItem.style = vm.style
            console.log(vm.newItem)
            if (vm.newItem.width == undefined || vm.newItem.width == '') {
                vm.newItem.width = [0, 0]
            }
            vm.$emit("add", vm.newItem)
            vm.newItem = {}
            vm.align = 'left'
            vm.weight = 'normal'
            vm.style = 'normal'
        },
        changeAlign(align) {
            this.align = align
        },
        changeWeight(weight) {
            this.weight = weight
        },
        changeStyle(style) {
            this.style = style
        },
        changeFormat() {
            this.weight = 'normal'
            this.style = 'normal'
        }
    },
};
</script>