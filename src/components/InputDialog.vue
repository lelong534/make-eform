<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Thêm input
        </v-card-title>
        <v-card-text>
            <v-text-field label="id" v-model="newItem.id"></v-text-field>
            <v-text-field label="Title" v-model="newItem.title"></v-text-field>
            <v-text-field label="Placeholder" v-model="newItem.placeholder"></v-text-field>
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
        newItem: {}
    }),
    methods: {
        add() {
            let vm = this
            vm.newItem.type = 'input'
            vm.$emit("add", this.newItem)
            vm.newItem = {}
        }
    },
};
</script>