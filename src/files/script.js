function createProperty(id) {
    return `"` + id + `": {
        "type": "object",
        "required": false
    }`;
}

function createFieldOption(id, title) {
    return `"` + id + `": {
        "id": "` + id + `",
        "name": "` + id + `",
        "type": "text",
        "label": "",
        "fieldClass": "form-input-100",
        "rule": "maxlength1000",
        "title": "` + title + `"
    }`;
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
                properties += createProperty(item.id)
                fieldOptions += createFieldOption(item.id, item.title)
                bindings += createBinding(item.id)
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
