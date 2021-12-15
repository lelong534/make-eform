function createProperty(item) {
    if (item.type == 'input') {
        let properties = []
        item.inputs.forEach(input => {
            if (input.inputWidth - input.labelWidth > 0) {
                properties.push(`"` + input.id + `": {
                    "type": "object",
                    "required": false
                }`)
            }
        })
        return properties.join(',')
    } else if (item.type == 'table') {
        let properties = []
        item.column.forEach(column => {
            properties.push(`
            "` + column.id + `":{
                "type":"object"
            }`)
        })

        return `"` + item.id +`": {
            "type": "array",
            "required": false,
            "items": {
              "type": "object",
              "properties":{`
              + properties.join(',') +
              `
              }
            }
        }`
    }
}

function createFieldOption(item) {
    if (item.type == 'input') {
        let fields = []
        item.inputs.forEach(input => {
            if (input.inputWidth - input.labelWidth > 0) {
                if (input.rows > 1) {
                    fields.push(`"` + input.id + `": {
                        "id": "` + input.id + `",
                        "name": "` + input.id + `",
                        "type": "textarea",
                        "rows": `+ input.rows +`,
                        "label": "",
                        "fieldClass": "form-input-100",
                        "rule": "maxlength1000",
                        "title": "` + input.title + `"
                    }`)  
                } else {
                    fields.push(`"` + input.id + `": {
                        "id": "` + input.id + `",
                        "name": "` + input.id + `",
                        "type": "text",
                        "label": "",
                        "fieldClass": "form-input-100",
                        "rule": "maxlength1000",
                        "title": "` + input.title + `"
                    }`)
                }
            }
        })
        return fields.join(",")
    } else if (item.type == 'table') {
        let fields = ''
        item.column.forEach(column => {
            if (column != item.column.at(-1)) {
                fields += `
                "` + column.id + `": {
                    "label": "<strong>`+ column.name +`</strong>",
                    "type": "text"
                },`
            } else {
                fields += `
                "` + column.id + `": {
                    "label": "<strong>`+ column.name +`</strong>",
                    "type": "text"
                }`
            }
        })

        return `"` +item.id+ `": {
            "id": "`+item.id+`",
            "name": "`+item.id+`",
            "type": "table",
            "items": {
                "fields": {`
                    + fields +
                    `
                }
            }
        }`
    }
}

function createBinding(item) {
    if (item.type == 'input') {
        let bindings = ''
        item.inputs.forEach(input => {
            if (input.inputWidth - input.labelWidth > 0) {
                if (input != item.inputs.at(-1)) {
                    bindings += `"` + input.id +`" : "column-`+ input.id +`",`
                } else {
                    bindings += `"` + input.id +`" : "column-`+ input.id +`"`
                }
            }
        })
        return bindings
    }
    return `"` + item.id +`" : "column-`+ item.id +`"`
}

export const script = {
    methods: {
        createScript(items, html) {
            let properties = ''
            let fieldOptions = ''
            let bindings = ''

            items.forEach(item => {
                if (item.type != 'text' && item != items.at(-1)) {
                    properties += createProperty(item) + ","
                    fieldOptions += createFieldOption(item) + ","
                    bindings += createBinding(item) + ","
                } else if (item.type != 'text') {
                    properties += createProperty(item)
                    fieldOptions += createFieldOption(item)
                    bindings += createBinding(item)
                }
            });

            return `{
                "schema": {
                    "type": "object",
                    "required": false,
                    "properties": {
            ` + properties +
            `
            }
                },
                "options": {
                    "type": "object",
                    "legendStyle": "",
                    "fields": {
            ` + fieldOptions +
            `
            }
                },
                "view": {
                    "layout": {
                        "template": "` + html + `",
                        "bindings": {
            ` + bindings + 
            `
            }     
                },
                    "parent": "bootstrap-edit",
                    "fields": {}
                }
            }`;
        }
    }
}
