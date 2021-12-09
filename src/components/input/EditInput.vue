<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Thêm input
        </v-card-title>
        <v-card-text>
            <div v-for="input in item.inputs" :key="input.id">
                <v-text-field label="id" v-model="input.id"></v-text-field>
                <v-text-field label="Title" v-model="input.title"></v-text-field>
                <v-text-field label="Placeholder" v-model="input.placeholder"></v-text-field>
                <div class="d-flex flex-column">
                    <div>Chiều dài label</div>
                    <v-slider max="12" ticks="always" :tick-labels="['0', 1, 2, 3, 4, 5, 6,7 , 8, 9, 10, 11, 12]" v-model="input.labelWidth"></v-slider>
                </div>
                <div class="d-flex flex-column">
                    <div>Chiều dài input</div>
                    <v-slider max="12" ticks="always" :tick-labels="['0', 1, 2, 3, 4, 5, 6,7 , 8, 9, 10, 11, 12]" v-model="input.inputWidth"></v-slider>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['item']
};
</script>