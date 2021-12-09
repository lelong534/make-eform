function createProperty(item) {
    if (item.type == 'input') {
        return `"` + item.id + `": {
            "type": "object",
            "required": false
        }`
    } else if (item.type == 'table') {
        let properties = ''
        item.column.forEach(column => {
            if (column != item.column.at(-1)) {
                properties += `
                "` + column.id + `":{
                    "type":"object"
                },`
            } else {
                properties += `
                "` + column.id + `":{
                    "type":"object"
                }`
            }
        })

        return `"` + item.id +`": {
            "type": "array",
            "required": false,
            "items": {
              "type": "object",
              "properties":{`
              + properties +
              `
              }
            }
        }`
    }
}

function createFieldOption(item) {
    if (item.type == 'input') {
        return `"` + item.id + `": {
            "id": "` + item.id + `",
            "name": "` + item.id + `",
            "type": "text",
            "label": "",
            "fieldClass": "form-input-100",
            "rule": "maxlength1000",
            "title": "` + item.title + `"
        }`;
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

function createBinding(id) {
    return `"` + id +`" : "column-`+ id +`"`
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
                    bindings += createBinding(item.id) + ","
                } else if (item.type != 'text') {
                    properties += createProperty(item)
                    fieldOptions += createFieldOption(item)
                    bindings += createBinding(item.id)
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
