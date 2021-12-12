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
                <v-btn fab class="ma-2" small @click="changeSize()" :color="size == 'h3' ? 'cyan' : ''"><v-icon>mdi-format-header-3</v-icon></v-btn>
            </v-row>
            <v-row>
                <v-col>
                    <div>Chọn chiều dài</div>
                    <v-range-slider min="0" max="12" :tick-labels="['0', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" v-model="item.width"></v-range-slider>
                </v-col>
            </v-row>
        </v-card-text>
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
            if (this.item.weight == 'normal') this.item.weight = 'bold'
            else this.item.weight = 'normal'
        },
        changeStyle() {
            if (this.item.style == 'normal') this.item.style = 'italic'
            else this.item.style = 'normal'
        },
        changeSize() {
            if (this.item.size == '') {
                this.item.size = 'h3'
            }
            else this.item.size = ''
        }
    }
};
</script>