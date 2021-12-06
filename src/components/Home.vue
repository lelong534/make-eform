<template>
  <div>
    <div class="d-flex justify-center mt-3">
      <v-btn class="ma-2">Thêm text</v-btn>
      <v-btn class="ma-2">Thêm input</v-btn>
      <v-btn class="ma-2">Thêm table</v-btn>
      <v-btn class="ma-2">Thêm ảnh</v-btn>
    </div>

    <div class="d-flex">
      <v-row>
        <v-col md="6">
          <v-container>
            <v-form>
              <v-card class="pa-5">
                <v-text-field label="Id" v-model="newItem.id"></v-text-field>
                <v-text-field label="Title" v-model="newItem.title"></v-text-field>
                <v-text-field label="Placeholder" v-model="newItem.placeholder"></v-text-field>
                <v-row>
                  <v-col>
                    <div>Chọn chiều dài</div>
                    <v-range-slider min="0" max="12" :tick-labels="['0', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" v-model="newItem.width"></v-range-slider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-btn class="mx-3 success" @click="create()">Tạo mới</v-btn>
                </v-row>
              </v-card>
            </v-form>
          </v-container>
        </v-col>

        <v-col md="6">
          <v-container>
            <v-row>
              <v-col>
                <v-container class="pa-3 content" :style='content == "script" ? "display: block" : "display: none"'>
                  <v-row class="pa-3">
                    <v-btn small fab @click="copyScript">
                      <v-icon small>mdi-content-copy</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small fab class="mr-3" @click="showEform"> Eform </v-btn>
                    <v-btn small fab @click="showPDF"> PDF </v-btn>
                  </v-row>
                  <div id="script"></div>
                </v-container>

                <v-container class="pa-3 content"  :style='content == "jrxml" ? "display: block" : "display: none"'>
                  <v-row class="pa-3">
                    <v-btn small fab @click="copyJrxml">
                      <v-icon small>mdi-content-copy</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small fab class="mr-3"  @click="showEform"> Eform </v-btn>
                    <v-btn small fab  @click="showPDF"> PDF </v-btn>
                  </v-row>
                  <div id="jrxml"></div>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// import { htmlstyle } from '@/files/html/style.js'
import { html } from '@/files/html.js'
import { script } from '@/files/script.js'
import { jrxml } from '@/files/jrxml.js'

export default {
  data: () => ({
    items: [],
    newItem: {},
    content: 'script'
  }),

  mixins: [html, script, jrxml],
  methods: {
    create() {
      let vm = this
      vm.items.push(vm.newItem)
      let jrxml = document.getElementById('jrxml')
      let script = document.getElementById('script')
      let html = vm.createHtml(vm.items).replace(/\s\s+/g, " ")
      jrxml.innerText = vm.createJrxml(vm.items) 
      script.innerText = vm.createScript(vm.items, html)
    },

    copyScript() {
      let copyText = document.getElementById('script');
      navigator.clipboard.writeText(copyText.innerText)
    },

    copyJrxml() {
      let copyText = document.getElementById('jrxml');
      navigator.clipboard.writeText(copyText.innerText)
    },

    showPDF() {
      let vm = this
      vm.content = 'jrxml'
    },

    showEform() {
      let vm = this
      vm.content = 'script'   
    }
  }
};
</script>