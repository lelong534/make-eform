<template>
  <div>
    <div class="d-flex">
      <v-row>
        <v-col md="6">
          <v-container>
            <v-card class="pa-5">
              <div v-for="item in items" :key="item.id">
                <v-toolbar elevation="3" class="mb-2 pt-3" v-if="item.type=='input'">
                  <v-row>
                    <v-col :md="item.labelWidth" class="mt-3">
                      <p>{{item.title}}</p> 
                    </v-col>
                    <v-col :md="item.inputWidth">
                      <v-text-field outlined dense></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </v-toolbar>

                <div v-if="item.type=='text'">
                  <v-toolbar elevation="3" class="mb-2 pt-3">
                    <v-row>
                      <v-col :md="item.width[0]" v-if="item.width[0] != 0">
                      </v-col>
                      <v-col :md="item.width[1]-item.width[0]">
                        <p :style='"font-weight:" + item.weight  + ";font-style:" + item.style+";text-align:start"' v-if="item.align == 'left'"> {{item.title}} </p>
                        <p :style='"font-weight:" + item.weight  + ";font-style:" + item.style+";text-align:center"' v-if="item.align == 'center'"> {{item.title}} </p>
                        <p :style='"font-weight:" + item.weight  + ";font-style:" + item.style+";text-align:end"' v-if="item.align == 'end'"> {{item.title}} </p>
                      </v-col>
                    </v-row>
                  </v-toolbar>
                </div>
              </div>
              <v-toolbar elevation="3">
                <v-spacer></v-spacer>
                <v-btn class="ma-2" color="pink lighten-5" @click="showTextDialog">Text</v-btn>
                <v-btn class="ma-2" color="pink lighten-5" @click="showInputDialog">Input</v-btn>
                <v-btn class="ma-2" color="pink lighten-5" @click="showTableDialog">Table</v-btn>
                <v-btn class="ma-2" color="pink lighten-5" @click="showImageDialog">Ảnh</v-btn>
                <v-spacer></v-spacer>
              </v-toolbar>
            </v-card>
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
                    <v-btn small fab class="mr-3" @click="showEform"> Eform </v-btn>
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

    <v-dialog v-model="textDialog" width="800"> <text-dialog @add="add"></text-dialog>
    </v-dialog>
    
    <v-dialog v-model="inputDialog" width="800"> <input-dialog @add="add"></input-dialog>
    </v-dialog>
  </div>
</template>

<script>
// import { htmlstyle } from '@/files/html/style.js'
import { html } from '@/files/html.js'
import { script } from '@/files/script.js'
import { jrxml } from '@/files/jrxml.js'
import TextDialog from './TextDialog.vue'
import InputDialog from './InputDialog.vue'

export default {
  data: () => ({
    items: [],
    newItem: {},
    type: 'input',
    content: 'script',
    inputDialog: false,
    textDialog: false,
    tableDialog: false,
    imageDialog: false
  }),
  components: {TextDialog, InputDialog},
  mixins: [html, script, jrxml],
  methods: {

    add(item) {
      let vm = this
      vm.items.push(item)
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
    },

    showInputDialog() {
      let vm = this
      vm.inputDialog = true
      vm.textDialog = false
      vm.tableDialog = false
      vm.imageDialog = false
      vm.type = 'input'
    },

    showTextDialog() {
      let vm = this
      vm.inputDialog = false
      vm.textDialog = true
      vm.tableDialog = false
      vm.imageDialog = false
      vm.type = 'text'
    }
  }
};
</script>